import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 2,
  use: { baseURL: 'http://127.0.0.1:3100', browserName: 'chromium', screenshot: 'only-on-failure' },
  webServer: { command: 'npm run start -- --hostname 127.0.0.1 --port 3100', url: 'http://127.0.0.1:3100', reuseExistingServer: false, env: { VERCEL_ENV: 'preview', STRIPE_PAYMENT_LINK_BASIC: 'https://buy.stripe.com/test_example123', STRIPE_PAYMENT_LINK_ECOMMERCE: 'https://buy.stripe.com/test_example456' } },
});
