const fs = require('fs');
const vm = require('vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = require('path').resolve(__dirname, '..');
function compile(file, deps, env, fetch) {
  const mod = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(root + '/' + file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports: mod.exports, module: mod, require: name => deps[name], process: { env }, fetch, URL, AbortSignal, crypto: require('node:crypto').webcrypto, console: { error() {} } }, { filename: file });
  return mod.exports;
}
const env = { AIRTABLE_TOKEN: 'test-only', AIRTABLE_BASE_ID: 'appTest', AIRTABLE_CUSTOMERS_TABLE_ID: 'tblCustomers', AIRTABLE_INQUIRIES_TABLE_ID: 'tblInquiries', RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'test@example.com', CONTACT_TO_EMAIL: 'test@example.com' };
let calls, emailFails, storageFails, existingCustomer;
const apiFetch = async (url, options) => {
  calls.push({ url: String(url), options });
  if (storageFails) return { ok: false, status: 503 };
  if (options.method === 'POST') return { ok: true, json: async () => ({ records: [{ id: 'recCustomer' }] }) };
  if (options.method === 'PATCH') return { ok: true, json: async () => ({ records: [{ id: 'recInquiry' }] }) };
  return { ok: true, json: async () => ({ records: existingCustomer ? [{ id: 'recCustomer' }] : [] }) };
};
const { saveInquiry } = compile('lib/inquiries.ts', {}, env, apiFetch);
const { POST } = compile('app/api/contact/route.ts', {
  'next/server': { NextResponse: { json: (data, options = {}) => ({ status: options.status || 200, data }) } },
  '@/lib/inquiries': { saveInquiry },
  resend: { Resend: class { emails = { send: async () => { calls.push({ email: true }); if (emailFails) throw new Error('email failed'); return {}; } } } },
}, env, apiFetch);
const body = { inquiryId: '12345678-1234-1234-1234-123456789abc', name: 'Test Merchant', email: 'merchant@example.com', message: 'Prepare my model', organization: 'Example', interest: 'basic', platform: 'Shopify', product: 'One chair', assets: 'Existing 3D models', consent: 'yes', storeUrl: 'https://example.com', attribution: { utm_source: 'google' } };
async function run(input) { calls = []; return POST({ text: async () => typeof input === 'string' ? input : JSON.stringify(input) }); }
(async () => {
  assert.equal((await run('invalid')).status, 400); assert.equal(calls.length, 0);
  assert.equal((await run({ ...body, consent: '' })).status, 400); assert.equal(calls.length, 0);
  assert.equal((await run({ ...body, storeUrl: 'javascript:alert(1)' })).status, 400); assert.equal(calls.length, 0);
  assert.equal((await run({ ...body, website: 'spam' })).status, 200); assert.equal(calls.length, 0);
  let result = await run(body); assert.equal(result.status, 200); assert.equal(calls.at(-1).email, true); assert.equal(calls.at(-2).options.method, 'PATCH');
  const saved = JSON.parse(calls.at(-2).options.body); assert.equal(saved.records[0].fields['Inquiry ID'], body.inquiryId); assert(saved.records[0].fields['Project Description'].includes('utm_source: google'));
  const shortRequest = { inquiryId: body.inquiryId, name: body.name, email: body.email, message: body.message, interest: 'custom', consent: 'yes', intake: 'short' };
  assert.equal((await run(shortRequest)).status, 200);
  assert(JSON.parse(calls.at(-2).options.body).records[0].fields['Project Description'].includes('Destination: To be discussed'));
  const partnership = { ...shortRequest, interest: 'partnership', partnerType: 'agency', skuVolume: '6-25', timeline: 'quarter', organization: 'Partner Studio', storeUrl: 'https://partner.example' };
  assert.equal((await run(partnership)).status, 200);
  const partnerFields = JSON.parse(calls.at(-2).options.body).records[0].fields;
  assert(partnerFields['Project Description'].includes('Partnership type: Agency or studio'));
  assert(partnerFields['Project Description'].includes('Approximate product volume: 6–25 products'));
  assert.equal(partnerFields.Source, 'Website · partnership inquiry');
  assert.equal((await run({ ...partnership, partnerType: 'unapproved' })).status, 400);
  assert.equal((await run({ ...shortRequest, intake: undefined })).status, 400);
  assert.equal((await run({ ...shortRequest, consent: '' })).status, 400);
  assert.equal((await run({ ...shortRequest, interest: 'unknown' })).status, 400);
  existingCustomer = true; await run(body); assert(!calls.some(c => c.options?.method === 'POST'));
  storageFails = true; assert.equal((await run(body)).status, 503); assert(!calls.some(c => c.email)); storageFails = false;
  emailFails = true; assert.equal((await run(body)).status, 200); assert(calls.some(c => c.options?.method === 'PATCH'));
  console.log('Inquiry checks passed: short intake, legacy intake, validation, spam, persistence order, attribution, customer reuse, storage failure, notification failure. No external calls.');
})().catch(e => { console.error(e); process.exit(1); });
