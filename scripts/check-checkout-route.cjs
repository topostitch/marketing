const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  ts = require("typescript");
const exportsObject = {};
vm.runInNewContext(
  ts.transpileModule(
    fs.readFileSync("app/api/stripe/checkout/route.ts", "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText,
  {
    exports: exportsObject,
    require: () => ({
      NextResponse: { json: (body, opts) => ({ body, ...opts }) },
    }),
  },
);
(async () => {
  assert.equal((await exportsObject.POST()).status, 409);
  console.log(
    "Legacy unqualified checkout rejects purchases; qualified cart required.",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
