import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { parseQuantity } from '@/lib/package-quantity';
import { paymentOffers, type PaymentOffer } from '@/lib/payments';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function checkoutOrigin(request: Request) {
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === 'development' && process.env.VERCEL_ENV !== 'production') {
    const origin = new URL(request.url).origin;
    const hostname = new URL(origin).hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return origin;
  }
  return null;
}

export async function POST(request: Request) {
  const previewOnly = process.env.VERCEL_ENV !== 'production' &&
    (process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development');
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!previewOnly || !/^(sk|rk)_test_/.test(secret || '')) {
    return NextResponse.json({ error: 'Sandbox checkout is not available here.' }, { status: 503 });
  }

  let body: { offer?: unknown; quantity?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Choose a valid package and quantity.' }, { status: 400 });
  }

  const offer = typeof body.offer === 'string' && Object.hasOwn(paymentOffers, body.offer)
    ? body.offer as PaymentOffer
    : undefined;
  const details = offer ? paymentOffers[offer] : undefined;
  const quantity = typeof body.quantity === 'number' && Number.isSafeInteger(body.quantity)
    ? parseQuantity(String(body.quantity))
    : null;
  const priceId = details && process.env[details.priceIdSetting];
  if (!offer || !details || !quantity || !priceId?.startsWith('price_')) {
    return NextResponse.json({ error: 'Choose a valid package and a quantity from 1 to 99.' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID ||
    !process.env.AIRTABLE_CUSTOMERS_TABLE_ID || !process.env.AIRTABLE_ORDERS_TABLE_ID) {
    return NextResponse.json({ error: 'Sandbox checkout is still being configured.' }, { status: 503 });
  }

  const origin = checkoutOrigin(request);
  if (!origin) return NextResponse.json({ error: 'Sandbox checkout is not available here.' }, { status: 503 });
  const form = new URLSearchParams({
    mode: 'payment',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': String(quantity),
    billing_address_collection: 'auto',
    integration_identifier: `topostitch_${Array.from(randomBytes(8), byte => String.fromCharCode(97 + byte % 26)).join('')}`,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/${offer}?quantity=${quantity}`,
    'metadata[topostitch_checkout]': 'direct',
    'metadata[offer]': offer,
    'metadata[quantity]': String(quantity),
    'metadata[price_id]': priceId,
  });

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2026-11-18.endive',
      },
      body: form,
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.url !== 'string' || !result.url.startsWith('https://checkout.stripe.com/')) {
      console.error('Stripe sandbox checkout session could not be created.');
      return NextResponse.json({ error: 'Secure checkout could not start. Try again or request a project review.' }, { status: 502 });
    }
    return NextResponse.json({ url: result.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Secure checkout could not start. Try again or request a project review.' }, { status: 502 });
  }
}
