import { createHmac, timingSafeEqual } from 'node:crypto';

function verifyStripeSignature(raw, header, secret, now = Date.now()) {
  const parts = header.split(',').map(part => part.trim().split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  if (!timestamp || !/^\d+$/.test(timestamp) || Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest();
  return parts.some(([key, value]) => {
    if (key !== 'v1' || !/^[a-f0-9]{64}$/i.test(value || '')) return false;
    return timingSafeEqual(expected, Buffer.from(value, 'hex'));
  });
}

const supportedEvents = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded']);

async function reconcile(session) {
  const allowedLinks = [process.env.STRIPE_PAYMENT_LINK_BASIC_ID, process.env.STRIPE_PAYMENT_LINK_ECOMMERCE_ID].filter(Boolean);
  if (!allowedLinks.length) throw new Error('Payment link allowlist missing');
  if (session.livemode !== false || !allowedLinks.includes(session.payment_link) || session.payment_status !== 'paid') return 'ignored';
  if (!/^cs_test_[a-zA-Z0-9_]+$/.test(session.id ?? '') || session.currency !== 'usd' || !Number.isSafeInteger(session.amount_total) || session.amount_total <= 0) return 'invalid_session';
  const orderId = session.client_reference_id;
  if (typeof orderId !== 'string' || !/^sbx_[A-Za-z0-9_-]{1,196}$/.test(orderId)) return 'ignored';
  const email = session.customer_details?.email?.trim().toLowerCase();
  if (!email) return 'invalid_session';

  const { AIRTABLE_TOKEN: token, AIRTABLE_BASE_ID: base, AIRTABLE_CUSTOMERS_TABLE_ID: customers, AIRTABLE_ORDERS_TABLE_ID: orders } = process.env;
  if (!token || !base || !customers || !orders) throw new Error('Airtable is not configured');
  const endpoint = (table) => 'https://api.airtable.com/v0/' + encodeURIComponent(base) + '/' + encodeURIComponent(table);
  const request = async (url, init = {}) => {
    const response = await fetch(url, { ...init, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Airtable request failed');
    return response.json();
  };
  const query = new URL(endpoint(orders));
  query.searchParams.set('filterByFormula', '{Order ID}=' + JSON.stringify(orderId));
  query.searchParams.set('maxRecords', '2');
  const { records } = await request(query);
  if (records?.length !== 1) throw new Error('Order reference must match exactly one order');
  const { id, fields } = records[0];
  if (fields['Stripe Checkout Session ID'] === session.id) return 'duplicate';
  if (fields.Status !== 'Approved / Awaiting Payment' || fields['Stripe Checkout Session ID'] || ['Paid', 'Refunded', 'Partially Refunded'].includes(fields['Payment Status'])) return 'order_not_payable';
  if (typeof fields['Final Quoted Total'] !== 'number' || Math.round(fields['Final Quoted Total'] * 100) !== session.amount_total) return 'amount_mismatch';
  const customerId = fields.Customer?.[0];
  if (typeof customerId !== 'string' || !/^rec[A-Za-z0-9]+$/.test(customerId)) throw new Error('Linked customer missing');
  const customer = await request(endpoint(customers) + '/' + encodeURIComponent(customerId));
  if (customer.fields?.Email?.trim().toLowerCase() !== email) return 'email_mismatch';
  await request(endpoint(orders) + '/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify({ fields: {
      'Stripe Checkout Session ID': session.id,
      'Payment Status': 'Paid',
      Status: 'Paid / Awaiting Shipment',
      'Waiting on': 'TopoStitch',
      'Next action': 'Sandbox test only',
    } }),
  });
  return 'paid';
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return Response.json({ error: 'Webhook not configured' }, { status: 503 });
    const raw = await request.text();
    if (raw.length > 1000000) return Response.json({ error: 'Payload too large' }, { status: 413 });
    if (!verifyStripeSignature(raw, request.headers.get('stripe-signature') || '', secret)) return Response.json({ error: 'Invalid signature' }, { status: 400 });
    try {
      const event = JSON.parse(raw);
      if (event.livemode !== false || !supportedEvents.has(event.type)) return Response.json({ result: 'ignored' });
      const result = await reconcile(event.data?.object ?? {});
      return Response.json({ result });
    } catch {
      return Response.json({ error: 'Could not process sandbox event' }, { status: 503 });
    }
  },
};
