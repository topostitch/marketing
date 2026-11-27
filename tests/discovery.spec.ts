import { test, expect } from "@playwright/test";
const origin = "https://www.topostitch.dev";
test("all sitemap pages are readable without JavaScript and have unique consistent discovery metadata", async ({
  request,
  page,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(urls.length).toBe(27);
  expect(new Set(urls).size).toBe(urls.length);
  const titles = new Set<string>(),
    descriptions = new Set<string>();
  const links = new Set<string>();
  for (const url of urls) {
    expect(new URL(url).origin).toBe(origin);
    expect(url).not.toMatch(
      /\/(cart|checkout|order|request|updates|unsubscribe)(?:\/|$)/,
    );
    const response = await request.get(new URL(url).pathname, {
      headers: { "User-Agent": "OAI-SearchBot" },
    });
    expect(response.status(), url).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
    const html = await response.text();
    expect(html).toMatch(/<h1[ >]/);
    expect(html.length).toBeGreaterThan(2000);
    // Parse raw response into a detached DOM. Scripts never run.
    const data = await page.evaluate((html) => {
      const d = new DOMParser().parseFromString(html, "text/html");
      return {
        title: d.title,
        description: d
          .querySelector('meta[name="description"]')
          ?.getAttribute("content"),
        canonical: d
          .querySelector('link[rel="canonical"]')
          ?.getAttribute("href"),
        og: d.querySelector('meta[property="og:url"]')?.getAttribute("content"),
        ogTitle: d
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content"),
        twitter: d
          .querySelector('meta[name="twitter:title"]')
          ?.getAttribute("content"),
        robots: d.querySelector('meta[name="robots"]')?.getAttribute("content"),
        h1: d.querySelectorAll("h1").length,
        schemas: [
          ...d.querySelectorAll('script[type="application/ld+json"]'),
        ].map((s) => JSON.parse(s.textContent || "")),
        links: [...d.querySelectorAll("a[href]")].map(
          (a) => a.getAttribute("href") || "",
        ),
      };
    }, html);
    expect(data.h1, url).toBe(1);
    expect(new URL(data.canonical!).href, url).toBe(new URL(url).href);
    expect(new URL(data.og!).href, url).toBe(new URL(url).href);
    expect(data.ogTitle).toBe(data.title);
    expect(data.twitter).toBe(data.title);
    expect(data.robots).toContain("noindex");
    expect(data.description?.length).toBeGreaterThan(40);
    expect(titles.has(data.title), url).toBe(false);
    titles.add(data.title);
    expect(descriptions.has(data.description!), url).toBe(false);
    descriptions.add(data.description!);
    expect(data.schemas.length).toBeGreaterThan(0);
    const serialized = JSON.stringify(data.schemas);
    expect(serialized).not.toMatch(/"@type":"(?:Product|SoftwareApplication)"/);
    if (url.endsWith("/about")) {
      expect(serialized).toContain("Jacob Galito");
      expect(serialized).toContain("AboutPage");
    }
    for (const href of data.links)
      if (href.startsWith("/") && !href.startsWith("//"))
        links.add(new URL(href, origin).pathname);
  }
  for (const path of links) {
    const res = await request.get(path);
    expect(res.status(), `Internal link ${path}`).toBeLessThan(400);
  }
});
test("preview robots, plain text discovery, noindex purchase flow and optimized images", async ({
  request,
}) => {
  for (const [oldPath, newPath] of [
    ["/platform", "/developers"],
    ["/stories", "/insights"],
  ]) {
    const redirect = await request.get(oldPath, { maxRedirects: 0 });
    expect(redirect.status()).toBe(308);
    expect(redirect.headers().location).toBe(newPath);
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const index = await request.get("/llms.txt");
  expect(index.status()).toBe(200);
  expect(index.headers()["content-type"]).toContain("text/plain");
  expect(await index.text()).toContain("not currently purchasable software");
  for (const path of [
    "/order",
    "/cart",
    "/request",
    "/updates",
    "/unsubscribe",
  ]) {
    const res = await request.get(path);
    expect(res.headers()["x-robots-tag"]).toContain("noindex");
  }
  const image = await request.get(
    "/_next/image?url=%2Fhero_graphic.webp&w=640&q=75",
    { headers: { Accept: "image/webp" } },
  );
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/webp");
  const optimizedBytes = (await image.body()).byteLength;
  expect(optimizedBytes).toBeLessThan(100000);
  console.log(`Optimized 640px hero: ${optimizedBytes} bytes`);
  const missing = await request.get("/learn/not-a-real-guide");
  expect(missing.status()).toBe(404);
});
