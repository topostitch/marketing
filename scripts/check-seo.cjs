const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  ts = require("typescript");
const env = { VERCEL_ENV: "preview" };
function load(file, dependencies = {}) {
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    {
      exports,
      URL,
      process: { env },
      require: (n) => dependencies[n] || require(n),
    },
  );
  return exports;
}
const seo = load("lib/seo.ts");
const robots = load("app/robots.ts", { "@/lib/seo": seo }).default;
const meta = () =>
  seo.pageMetadata({
    title: "About",
    description: "A description",
    path: "/about",
  });
assert.equal(meta().robots.index, false);
assert.equal(robots().rules[0].disallow, "/");
assert.equal(meta().alternates.canonical, "https://www.topostitch.dev/about");
assert.equal(meta().openGraph.url, meta().alternates.canonical);
assert.equal(meta().twitter.title, meta().openGraph.title);
const dangerous = { text: "</script><script>alert(1)</script>" };
const encoded = seo.jsonLd(dangerous);
assert.equal(encoded.includes("<"), false);
assert.deepEqual(JSON.parse(encoded), dangerous);
env.VERCEL_ENV = "production";
assert.equal(meta().robots.index, true);
assert.equal(robots().rules[0].allow, "/");
assert.deepEqual([...robots().rules[0].disallow], ["/api/"]);
assert.equal(
  seo.pageMetadata({
    title: "Order",
    description: "Order",
    path: "/order",
    noindex: true,
  }).robots.index,
  false,
);
delete env.VERCEL_ENV;
assert.equal(meta().robots.index, false);
console.log(
  "SEO checks passed: fail-closed preview/local indexing, production crawler rules, canonical/social consistency, explicit noindex and safe JSON-LD round-trip.",
);
