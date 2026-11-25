const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const env = {
  NODE_ENV: 'production', VERCEL_ENV: 'preview', STRIPE_SECRET_KEY: 'rk_test_mock', STRIPE_WEBHOOK_SECRET: 'whsec_mock',
  VERCEL_URL: 'marketing-git-checkout-preview-topostitch.vercel.app',
  STRIPE_PRICE_BASIC_ID: 'price_basic', STRIPE_PRICE_ECOMMERCE_ID: 'price_ecommerce', AIRTABLE_TOKEN: 'airtable_mock',
  AIRTABLE_BASE_ID: 'app_mock', AIRTABLE_CUSTOMERS_TABLE_ID: 'tbl_customers', AIRTABLE_ORDERS_TABLE_ID: 'tbl_orders',
};
const calls = [];
let stripeResponse = { ok: true, json: async () => ({ url: 'https://checkout.stripe.com/c/pay/cs_test_mock' }) };
const mod = { exports: {} };
const code = ts.transpileModule(fs.readFileSync(path.join(root, 'app/api/stripe/checkout/route.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const paymentOffers = {
  basic: { name: 'Existing-model preparation', amount: 14900, priceIdSetting: 'STRIPE_PRICE_BASIC_ID' },
  ecommerce: { name: 'Product model creation', amount: 29900, priceIdSetting: 'STRIPE_PRICE_ECOMMERCE_ID' },
};
vm.runInNewContext(code, {
  exports: mod.exports,
  module: mod,
  process: { env },
  fetch: async (url, options) => { calls.push({ url, options }); return stripeResponse; },
  require: name => name === 'node:crypto' ? require('node:crypto') : name === 'next/server' ? { NextResponse: { json: (data, options = {}) => ({ status: options.status || 200, data, headers: options.headers }) } } : name === '@/lib/package-quantity' ? { parseQuantity: value => typeof value === 'string' && /^[1-9][0-9]?$/.test(value) && Number(value) <= 99 ? Number(value) : null } : name === '@/lib/payments' ? { paymentOffers } : require(name),
  URL, URLSearchParams, AbortSignal, console: { error() {} },
}, { filename: 'app/api/stripe/checkout/route.ts' });
const { POST } = mod.exports;
async function request(body, url = 'https://preview.topostitch.dev/api/stripe/checkout') {
  return POST({ url, json: async () => body });
}
(async () => {
  let result = await request({ offer: 'basic', quantity: 2 });
  assert.equal(result.status, 200);
  assert.equal(result.data.url, 'https://checkout.stripe.com/c/pay/cs_test_mock');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.stripe.com/v1/checkout/sessions');
  assert.equal(calls[0].options.headers.Authorization, 'Bearer rk_test_mock');
  assert.equal(calls[0].options.headers['Stripe-Version'], '2026-11-18.endive');
  const form = new URLSearchParams(calls[0].options.body);
  assert.equal(form.get('mode'), 'payment');
  assert.equal(form.get('line_items[0][price]'), 'price_basic');
  assert.equal(form.get('line_items[0][quantity]'), '2');
  assert.equal(form.get('success_url'), 'https://marketing-git-checkout-preview-topostitch.vercel.app/checkout/success?session_id={CHECKOUT_SESSION_ID}');
  assert.equal(form.get('cancel_url'), 'https://marketing-git-checkout-preview-topostitch.vercel.app/checkout/basic?quantity=2');
  assert.match(form.get('integration_identifier'), /^topostitch_[a-z]{8}$/);
  assert.equal(form.has('payment_method_types'), false);

  calls.length = 0;
  result = await request({ offer: 'ecommerce', quantity: 99 });
  assert.equal(result.status, 200);
  assert.equal(new URLSearchParams(calls[0].options.body).get('line_items[0][quantity]'), '99');
  for (const invalid of [{ offer: 'unknown', quantity: 1 }, { offer: 'basic', quantity: 0 }, { offer: 'basic', quantity: 100 }, { offer: 'basic', quantity: '2' }]) {
    assert.equal((await request(invalid)).status, 400);
  }
  env.VERCEL_ENV = 'production';
  assert.equal((await request({ offer: 'basic', quantity: 1 })).status, 503);
  env.VERCEL_ENV = 'preview';
  delete env.STRIPE_WEBHOOK_SECRET;
  assert.equal((await request({ offer: 'basic', quantity: 1 })).status, 503);
  env.STRIPE_WEBHOOK_SECRET = 'whsec_mock';
  stripeResponse = { ok: false, json: async () => ({ error: { message: 'do not echo Stripe details' } }) };
  result = await request({ offer: 'basic', quantity: 1 });
  assert.equal(result.status, 502);
  assert.doesNotMatch(JSON.stringify(result.data), /do not echo/);
  console.log('Checkout route checks passed: preview-only sandbox gate, product and quantity validation, hosted session creation, correct redirect URLs, API-version tagging, and safe error handling. No external requests or charges.');
})().catch(error => { console.error(error); process.exitCode = 1; });
