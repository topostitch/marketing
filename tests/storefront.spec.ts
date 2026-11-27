import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});
const routes = ['/services/amazon-3d-modeling', '/services/shopify-3d-models', '/services/3d-product-modeling', '/', '/services', '/compare', '/checkout', '/checkout/basic', '/checkout/ecommerce', '/request', '/about'];
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
      for (const route of ['/services', '/services/amazon-3d-modeling', '/']) {
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
  await expect(page.getByRole('link', { name: 'Continue to Stripe test checkout' })).toHaveAttribute('href', 'https://buy.stripe.com/test_example123');
  await expect(page.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.getByText('Estimated starting total: $298 USD')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Continue to Stripe test checkout' })).toHaveCount(0);
  await page.reload(); await expect(input).toHaveValue('2');
  await input.fill('99'); await expect(page.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
  await input.fill('0'); await expect(page.getByText('Enter a whole number from 1 to 99.', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request review for/ })).toHaveCount(0);
  await input.fill('3');
  await page.getByRole('link', { name: 'Request review for 3 products' }).click();
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
  await toggle.click(); await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Compare' }).click();
  await expect(page).toHaveURL(/compare$/); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click(); await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 }); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
