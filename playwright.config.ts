import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 2,
  use: { baseURL: 'http://127.0.0.1:3100', browserName: 'chromium', screenshot: 'only-on-failure' },
  webServer: { command: 'npm run start -- --hostname 127.0.0.1 --port 3100', url: 'http://127.0.0.1:3100', reuseExistingServer: false, env: {
    STRIPE_SECRET_KEY: 'rk_test_mock', STRIPE_WEBHOOK_SECRET: 'whsec_mock', VERCEL_ENV: 'preview', VERCEL_URL: 'marketing-git-test-topostitch.vercel.app',
    STRIPE_PRICE_BASIC_ID: 'price_basic_mock', STRIPE_PRICE_ECOMMERCE_ID: 'price_ecommerce_mock',
    AIRTABLE_TOKEN: 'airtable_mock', AIRTABLE_BASE_ID: 'app_mock', AIRTABLE_CUSTOMERS_TABLE_ID: 'tbl_customers', AIRTABLE_ORDERS_TABLE_ID: 'tbl_orders',
  } },
});
