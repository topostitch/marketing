import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});
const routes = ['/services/amazon-3d-modeling', '/services/shopify-3d-models', '/services/3d-product-modeling', '/', '/services', '/compare', '/checkout', '/checkout/basic', '/checkout/ecommerce', '/checkout/success', '/request', '/about', '/privacy', '/insights', '/insights/3d-product-model-cost', '/insights/shopify-3d-product-models', '/insights/amazon-3d-product-models', '/insights/3d-commerce-sales', '/insights/agency-3d-production', '/partnerships'];
for (const width of [320, 390, 768, 1280]) {
  test(`responsive routes at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      }
    }
    if (width === 390 || width === 1280) {
      for (const route of ['/services', '/services/amazon-3d-modeling', '/', '/insights', '/partnerships']) {
        await page.goto(route);
        await page.screenshot({ path: testInfo.outputPath(route.replaceAll('/', '-') + '.png'), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}
test('quantity totals, boundaries, reload, and request handoff', async ({ page }) => {
  await page.goto('/checkout/basic');
  const input = page.getByLabel('Number of products');
  await expect(page.getByRole('button', { name: 'Continue to secure checkout · $149' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.getByText('Estimated starting total: $298 USD')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue to secure checkout · $298' })).toBeVisible();
  await page.reload(); await expect(input).toHaveValue('2');
  await input.fill('99'); await expect(page.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
  await input.fill('0'); await expect(page.getByText('Enter a whole number from 1 to 99.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Continue to secure checkout/ })).toHaveCount(0);
  await input.fill('3');
  await page.getByRole('link', { name: 'Ask a question before buying' }).click();
  await expect(page.getByRole('combobox', { name: 'Service' })).toHaveValue('basic');
  await expect(page.getByLabel('Project details')).toHaveValue('Number of products: 3\n\n');
  await page.goto('/checkout/ecommerce?quantity=2');
  await expect(page.getByText('Estimated starting total: $598 USD')).toBeVisible();
  await page.goto('/checkout/invalid'); await expect(page.getByText('404', { exact: true })).toBeVisible();
});
test('mobile navigation keyboard dismissal, routing, and resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click(); await page.keyboard.press('Escape'); await expect(toggle).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  await toggle.click(); await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Insights' }).click();
  await expect(page).toHaveURL(/insights$/); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click(); await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 }); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
test('insights sources and partnership inquiry interaction', async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }));
  await page.goto('/insights');
  await expect(page.getByRole('heading', { name: 'Practical answers for product 3D.' })).toBeVisible();
  await page.getByRole('link', { name: /How to Add 3D Product Models to Shopify/ }).first().click();
  await expect(page.getByRole('heading', { name: 'How to Add 3D Product Models to Shopify' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Product media types' })).toHaveAttribute('href', 'https://help.shopify.com/en/manual/products/product-media/product-media-types');
  await page.goto('/partnerships');
  await page.getByLabel('Your name').fill('Test Partner');
  await page.getByLabel('Work email').fill('partner@example.com');
  await page.getByLabel('Organization', { exact: true }).fill('Example Studio');
  await page.getByLabel('What kind of support are you exploring?').fill('We need overflow product model production.');
  await page.getByLabel(/TopoStitch may email me/).check();
  await page.getByRole('button', { name: 'Send partnership inquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Inquiry received' })).toBeVisible();
});
