const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const calls = [];
const exportsObject = {};
const env = { NEXT_PUBLIC_POSTHOG_KEY: 'phc_test_project', NEXT_PUBLIC_POSTHOG_HOST: 'https://eu.i.posthog.com' };
const code = ts.transpileModule(fs.readFileSync(path.join(root, 'lib/posthog-events.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
vm.runInNewContext(code, {
  exports: exportsObject,
  process: { env },
  window: { location: { pathname: '/insights/article', search: '?email=private@example.com' } },
  crypto: require('node:crypto').webcrypto,
  URL,
  fetch: async (url, options) => { calls.push({ url, ...options }); return { ok: true }; },
}, { filename: 'lib/posthog-events.ts' });
const { capturePostHogEvent } = exportsObject;
(async () => {
  capturePostHogEvent('insight_article_viewed', { article_slug: 'article' });
  await Promise.resolve();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://eu.i.posthog.com/i/v1/analytics/events');
  assert.equal(calls[0].headers.Authorization, 'Bearer phc_test_project');
  const payload = JSON.parse(calls[0].body);
  assert.equal(payload.batch[0].event, 'insight_article_viewed');
  assert.equal(payload.batch[0].options.process_person_profile, false);
  assert.equal(payload.batch[0].distinct_id.length, 36);
  assert.match(payload.batch[0].uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.equal(payload.batch[0].properties.page_path, '/insights/article');
  assert.doesNotMatch(calls[0].body, /private@example\.com|email=private/);
  delete env.NEXT_PUBLIC_POSTHOG_KEY;
  capturePostHogEvent('partnership_inquiry_submitted', { partner_type: 'agency' });
  await Promise.resolve();
  assert.equal(calls.length, 1);
  env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test_project';
  env.NEXT_PUBLIC_POSTHOG_HOST = 'http://insecure.example';
  capturePostHogEvent('service_cta_clicked', { label: 'guide' });
  await Promise.resolve();
  assert.equal(calls.length, 1);
  console.log('PostHog checks passed: v1 capture, anonymous profile handling, UUIDv7 events, privacy-safe properties, and fail-closed missing or insecure configuration. No external calls.');
})().catch(error => { console.error(error); process.exitCode = 1; });
