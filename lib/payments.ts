import { createHmac, timingSafeEqual } from 'node:crypto';

export const paymentOffers = {
  basic: { name: 'Existing-model preparation', setting: 'STRIPE_PAYMENT_LINK_BASIC' },
  ecommerce: { name: 'Product model creation', setting: 'STRIPE_PAYMENT_LINK_ECOMMERCE' },
} as const;
export type PaymentOffer = keyof typeof paymentOffers;
export function paymentLink(offer: PaymentOffer) {
  const value = process.env[paymentOffers[offer].setting];
  const id = process.env[`${paymentOffers[offer].setting}_ID`];
  if (!value || !id?.startsWith('plink_') || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_CUSTOMERS_TABLE_ID || !process.env.AIRTABLE_ORDERS_TABLE_ID) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'buy.stripe.com' || url.username || url.password || url.port) return null;
    return url.href;
  } catch { return null; }
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
