import { createHmac, timingSafeEqual } from 'node:crypto';

export const paymentOffers = {
  basic: { name: 'Existing-model preparation', price: '$149', setting: 'STRIPE_PAYMENT_LINK_BASIC' },
  ecommerce: { name: 'Product model creation', price: '$299', setting: 'STRIPE_PAYMENT_LINK_ECOMMERCE' },
} as const;
export type PaymentOffer = keyof typeof paymentOffers;
export function paymentLink(offer: PaymentOffer) {
  // Live collection remains disabled during sandbox storefront development.
  if (process.env.VERCEL_ENV === 'production' || !/^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY || '')) return null;
  if (process.env.TOPOSTITCH_APPROVED_ORDER_CHECKOUT === 'true') return null;
  const value = process.env[paymentOffers[offer].setting];
  const id = process.env[`${paymentOffers[offer].setting}_ID`];
  if (!value || !id?.startsWith('plink_') || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_CUSTOMERS_TABLE_ID || !process.env.AIRTABLE_ORDERS_TABLE_ID) return null;
  const url = stripePaymentUrl(value);
  if (!url || !/^\/test_[a-zA-Z0-9_]+$/.test(url.pathname)) return null;
  const sandboxLink = url.pathname.startsWith('/test_');
  if (process.env.VERCEL_ENV === 'preview' && (!sandboxLink || !/^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY))) return null;
  return url.href;
}

function stripePaymentUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'buy.stripe.com' && !url.username && !url.password && !url.port ? url : null;
  } catch {
    return null;
  }
}

export function sandboxCheckoutLink(offer: PaymentOffer) {
  if (process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV !== 'development') return null;
  if (process.env.VERCEL_ENV === 'production') return null;
  if (process.env.STRIPE_SECRET_KEY && !/^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY)) return null;
  const url = stripePaymentUrl(process.env[paymentOffers[offer].setting]);
  // A storefront walkthrough reaches Stripe without submitting a preapproved order reference.
  return url && /^\/test_[a-zA-Z0-9]+$/.test(url.pathname) ? url.origin + url.pathname : null;
}

export function verifyStripeSignature(raw: string, header: string, secret: string, now = Date.now()) {
  const parts = header.split(',').map(part => part.trim().split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  if (!timestamp || !/^\d+$/.test(timestamp) || Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest();
  return parts.some(([key, value]) => {
    if (key !== 'v1' || !/^[a-f0-9]{64}$/i.test(value || '')) return false;
    return timingSafeEqual(expected, Buffer.from(value, 'hex'));
  });
}

type PaidSession = {
  id: string; payment_status: string; currency: string; amount_total: number;
  payment_link: string | null; invoice: string | null;
  client_reference_id?: string | null;
  customer_details: { email?: string; name?: string } | null;
};
export async function recordStripePayment(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe is not configured');
  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${key}` }, cache: 'no-store', signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('Stripe session lookup failed');
  const session: PaidSession = await response.json();
  const allowed = [process.env.STRIPE_PAYMENT_LINK_BASIC_ID, process.env.STRIPE_PAYMENT_LINK_ECOMMERCE_ID].filter(Boolean);
  if (!allowed.length) throw new Error('No payment links configured for reconciliation');
  // Ignore unrelated payments made through the same Stripe account.
  if (!session.payment_link || !allowed.includes(session.payment_link)) return;
  if (session.payment_status !== 'paid') return;
  if (session.currency !== 'usd' || !Number.isSafeInteger(session.amount_total) || session.amount_total <= 0) throw new Error('Unsupported payment amount or currency');
  const email = session.customer_details?.email?.trim().toLowerCase();
  if (!email) throw new Error('Paid checkout has no customer email');
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID;
  const customers = process.env.AIRTABLE_CUSTOMERS_TABLE_ID;
  const orders = process.env.AIRTABLE_ORDERS_TABLE_ID;
  if (!token || !base || !customers || !orders) throw new Error('Payment storage is not configured');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const endpoint = (table: string) => `https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(table)}`;
  async function lookup(table: string, field: string, value: string) {
    const url = new URL(endpoint(table));
    url.searchParams.set('filterByFormula', `{${field}}=${JSON.stringify(value)}`);
    url.searchParams.set('maxRecords', '1');
    const result = await fetch(url, { headers, cache: 'no-store', signal: AbortSignal.timeout(12000) });
    if (!result.ok) throw new Error('Payment record lookup failed');
    return (await result.json()).records?.[0];
  }
  if (process.env.TOPOSTITCH_APPROVED_ORDER_CHECKOUT === 'true') {
    // Only paid sessions for an approved Ship-to-3D order may advance fulfillment.
    const orderId = session.client_reference_id;
    if (!orderId || !/^[A-Za-z0-9_-]{1,200}$/.test(orderId)) throw new Error('Paid checkout is missing a valid order reference');
    const order = await lookup(orders, 'Order ID', orderId);
    if (!order?.id) throw new Error('Referenced order does not exist');
    if (order.fields?.['Stripe Checkout Session ID'] === session.id) return;
    if (order.fields?.Status !== 'Approved / Awaiting Payment' || order.fields?.['Stripe Checkout Session ID'] || ['Paid', 'Refunded', 'Partially Refunded'].includes(order.fields?.['Payment Status'])) {
      throw new Error('Referenced order is not awaiting payment');
    }
    const quotedTotal = order.fields?.['Final Quoted Total'];
    if (typeof quotedTotal !== 'number' || Math.round(quotedTotal * 100) !== session.amount_total) throw new Error('Checkout amount does not match approved order');
    const customerId = order.fields?.Customer?.[0];
    if (typeof customerId !== 'string' || !/^rec[A-Za-z0-9]+$/.test(customerId)) throw new Error('Approved order is missing a linked customer');
    const customerResult = await fetch(`${endpoint(customers)}/${encodeURIComponent(customerId)}`, { headers, cache: 'no-store', signal: AbortSignal.timeout(12000) });
    if (!customerResult.ok) throw new Error('Linked customer lookup failed');
    const customerRecord = await customerResult.json();
    if (customerRecord.fields?.Email?.trim().toLowerCase() !== email) throw new Error('Checkout email does not match approved order');
    const saved = await fetch(`${endpoint(orders)}/${encodeURIComponent(order.id)}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ fields: {
        'Stripe Checkout Session ID': session.id,
        'Payment Status': 'Paid',
        Status: 'Paid / Awaiting Shipment',
        'Waiting on': 'TopoStitch',
        'Next action': 'Send shipping instructions',
        ...(session.invoice ? { 'Stripe Invoice ID': session.invoice } : {}),
      } }),
      signal: AbortSignal.timeout(12000),
    });
    if (!saved.ok) throw new Error('Approved order payment persistence failed');
    return;
  }

  // Do not reset fulfillment or refund information on duplicate deliveries.
  if (await lookup(orders, 'Order ID', session.id)) return;
  let customer = await lookup(customers, 'Email', email);
  if (!customer) {
    const created = await fetch(endpoint(customers), { method: 'POST', headers,
      body: JSON.stringify({ records: [{ fields: { 'Customer Name': session.customer_details?.name || email, Email: email } }] }),
      signal: AbortSignal.timeout(12000),
    });
    if (!created.ok) throw new Error('Payment customer creation failed');
    customer = (await created.json()).records?.[0];
  }
  if (!customer?.id) throw new Error('Payment customer is missing');
  const fields: Record<string, unknown> = {
    'Order ID': session.id, 'Payment Status': 'Paid', Customer: [customer.id],
    'Final Quoted Total': session.amount_total / 100,
    'Fulfillment Notes': `Stripe-verified USD payment. Payment Link: ${session.payment_link}. Confirm purchased scope and arrange onboarding. Payment does not mean production or delivery is complete.`,
  };
  if (session.invoice) fields['Stripe Invoice ID'] = session.invoice;
  const saved = await fetch(endpoint(orders), { method: 'PATCH', headers,
    body: JSON.stringify({ performUpsert: { fieldsToMergeOn: ['Order ID'] }, records: [{ fields }] }),
    signal: AbortSignal.timeout(12000),
  });
  if (!saved.ok) throw new Error('Payment order persistence failed');
}
