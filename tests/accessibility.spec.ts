import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("WCAG A/AA automated checks on core commercial and learning pages", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/services",
    "/about",
    "/learn",
    "/compare",
    "/order",
    "/cart",
    "/learn/product-suitability",
    "/developers",
    "/updates",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, route).toEqual([]);
  }
});
