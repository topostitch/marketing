const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm"),
  ts = require("typescript");
const env = {
  VERCEL_ENV: "preview",
  STRIPE_SECRET_KEY: "sk_test_mock",
  STRIPE_WEBHOOK_SECRET: "whsec_mock",
  AIRTABLE_TOKEN: "mock",
  AIRTABLE_BASE_ID: "appMock",
  AIRTABLE_ORDERS_TABLE_ID: "tblOrders",
  AIRTABLE_CUSTOMERS_TABLE_ID: "tblCustomers",
  AIRTABLE_INQUIRIES_TABLE_ID: "tblInquiries",
};
let behavior = () => {
    throw Error("Unexpected network call");
  },
  calls = [];
const cache = {};
function load(file) {
  file = path.resolve(__dirname, "..", file);
  if (cache[file]) return cache[file];
  const exports = {};
  cache[file] = exports;
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    {
      exports,
      process: { env },
      Buffer,
      URL,
      URLSearchParams,
      AbortSignal,
      console,
      require: (n) =>
        n.startsWith(".")
          ? load(
              path.relative(
                path.resolve(__dirname, ".."),
                path.resolve(path.dirname(file), n + ".ts"),
              ),
            )
          : require(n),
      fetch: async (url, options = {}) => {
        calls.push({ url: String(url), ...options });
        return behavior(String(url), options);
      },
    },
  );
  return exports;
}
const policy = load("lib/fulfillment-policy.ts"),
  checkout = load("lib/pilot-checkout.ts"),
  interests = load("lib/interests.ts");
const item = {
  id: "product-1",
  capture: "ship",
  deliverable: "basic",
  quantity: 1,
  surface: "good",
  dimensions: [12, 12, 12],
  weight: 10,
  value: 250,
  contiguousUS: true,
  safe: true,
  acknowledged: true,
  policyVersion: policy.pilotPolicy.version,
};
const response = (body) => ({ ok: true, json: async () => body });
(async () => {
  assert.equal(policy.qualify(item).eligible, true);
  for (const patch of [
    { dimensions: [12.01, 1, 1] },
    { weight: 10.01 },
    { value: 250.01 },
    { quantity: 6 },
    { quantity: 1.2 },
    { capture: "captures" },
    { surface: "challenging" },
    { surface: "specialized" },
    { surface: "uncertain" },
    { safe: false },
    { contiguousUS: false },
    { acknowledged: false },
    { policyVersion: "old" },
    { deliverable: "__proto__" },
    { weight: "1" },
    { dimensions: [NaN, 1, 1] },
  ])
    assert.equal(
      policy.qualify({ ...item, ...patch }).eligible,
      false,
      JSON.stringify(patch),
    );
  assert.equal(
    policy.validateCart([
      { ...item, quantity: 2 },
      {
        ...item,
        id: "product-2",
        deliverable: "ecommerce",
        quantity: 3,
        price: 1,
      },
    ]).total,
    119500,
  );
  assert.throws(
    () =>
      policy.validateCart([
        { ...item, quantity: 3 },
        { ...item, id: "two", quantity: 3 },
      ]),
    /five/,
  );
  assert.throws(() => policy.validateCart([item, item]), /duplicate/);
  assert.throws(() => policy.validateCart([]));
  const attempt = "12345678-1234-1234-1234-123456789abc";
  let notes, orderId;
  behavior = (url, o) => {
    if (url.includes("stripe.com"))
      return response({
        id: "cs_test_mock",
        livemode: false,
        url: "https://checkout.stripe.com/c/pay/mock",
      });
    if (!o.method || o.method === "GET") return response({ records: [] });
    if (url.endsWith("/recOrder")) return response({ id: "recOrder" });
    const fields = JSON.parse(o.body).records[0].fields;
    notes = JSON.parse(fields["Fulfillment Notes"]);
    orderId = fields["Order ID"];
    return response({ records: [{ id: "recOrder", fields }] });
  };
  await checkout.createPilotCheckout(
    [item],
    attempt,
    "https://preview.example",
  );
  const stripeCall = calls.find((c) => c.url.includes("stripe.com"));
  const form = new URLSearchParams(stripeCall.body);
  assert.equal(form.get("line_items[0][price_data][unit_amount]"), "14900");
  assert.equal(form.get("metadata[topostitch_checkout]"), "pilot-v1");
  assert.equal(stripeCall.headers["Idempotency-Key"], orderId);
  assert.equal(calls[0].url.includes("airtable.com"), true);
  for (const patch of [
    { VERCEL_ENV: "production" },
    { STRIPE_SECRET_KEY: "sk_live_mock" },
    { STRIPE_WEBHOOK_SECRET: "" },
  ]) {
    const old = { ...env };
    Object.assign(env, patch);
    await assert.rejects(
      checkout.createPilotCheckout([item], attempt, "https://preview.example"),
    );
    Object.assign(env, old);
  }
  let paid = {
    id: "cs_test_mock",
    livemode: false,
    mode: "payment",
    payment_status: "paid",
    currency: "usd",
    amount_total: 14900,
    client_reference_id: orderId,
    metadata: {
      topostitch_checkout: "pilot-v1",
      order_id: orderId,
      cart_digest: notes.digest,
    },
    customer_details: { email: "buyer@example.com" },
  };
  let order = {
    id: "recOrder",
    fields: {
      "Order ID": orderId,
      "Final Quoted Total": 149,
      "Fulfillment Notes": JSON.stringify(notes),
    },
  };
  behavior = (url, o) => {
    if (url.includes("stripe.com")) return response(paid);
    if (o.method === "GET") return response({ records: [order] });
    if (url.endsWith("tblCustomers"))
      return response({ records: [{ id: "recCustomer" }] });
    if (o.method === "PATCH") {
      Object.assign(order.fields, JSON.parse(o.body).fields);
      return response(order);
    }
    throw Error("Unexpected storage");
  };
  assert.equal(await checkout.reconcilePilotPayment(paid.id), true);
  assert.equal(order.fields["Payment Status"], "Paid");
  calls = [];
  assert.equal(await checkout.reconcilePilotPayment(paid.id), true);
  assert.equal(
    calls.some((c) => c.method === "PATCH"),
    false,
  );
  paid.amount_total = 1;
  await assert.rejects(checkout.reconcilePilotPayment(paid.id), /match/);
  paid.amount_total = 14900;
  paid.livemode = true;
  await assert.rejects(checkout.reconcilePilotPayment(paid.id));
  paid.livemode = false;
  paid.payment_status = "unpaid";
  await assert.rejects(checkout.reconcilePilotPayment(paid.id));
  paid.payment_status = "paid";
  await checkout.savePilotIntake(paid.id, {
    productDetails: "Test mug",
    destination: "Test viewer",
    returnAddress: "Test address",
    handling: "Test padding",
  });
  assert.equal(
    JSON.parse(order.fields["Fulfillment Notes"]).intake.productDetails,
    "Test mug",
  );
  assert.throws(() =>
    interests.validateInterest({
      email: "a@example.com",
      interests: ["cli"],
      consent: false,
    }),
  );
  assert.throws(() =>
    interests.validateInterest({
      email: "a@example.com",
      interests: ["unknown"],
      consent: true,
    }),
  );
  assert.throws(() =>
    interests.validateInterest({
      email: "a@example.com",
      interests: ["cli"],
      consent: true,
      website: "bot",
    }),
  );
  let interestRow;
  behavior = (url, o) => {
    if (o.method === "GET")
      return response({ records: interestRow ? [interestRow] : [] });
    if (url.endsWith("tblCustomers"))
      return response({ records: [{ id: "recCustomer" }] });
    if (url.endsWith("/recInterest")) {
      interestRow.fields = JSON.parse(o.body).fields;
      return response(interestRow);
    }
    interestRow = {
      id: "recInterest",
      fields: JSON.parse(o.body).records[0].fields,
    };
    return response({ records: [interestRow] });
  };
  const registered = await interests.registerInterest({
    email: " A@EXAMPLE.COM ",
    interests: ["cli"],
    consent: true,
    source: "developers",
  });
  const again = await interests.registerInterest({
    email: "a@example.com",
    interests: ["captures"],
    consent: true,
  });
  assert.equal(registered.id, again.id);
  assert.deepEqual([...again.record.interests], ["cli", "captures"]);
  assert.ok(again.record.consentTimestamp);
  assert.equal(again.record.unsubscribed, false);
  await assert.rejects(interests.unsubscribeInterest(again.id, "0".repeat(64)));
  await interests.unsubscribeInterest(again.id, again.record.unsubscribeToken);
  assert.equal(
    JSON.parse(interestRow.fields["Project Description"]).unsubscribed,
    true,
  );
  behavior = () => ({ ok: false, json: async () => ({}) });
  await assert.rejects(
    interests.registerInterest({
      email: "a@example.com",
      interests: ["cli"],
      consent: true,
    }),
  );
  console.log(
    "Pilot checks passed: eligibility boundaries, mixed cart/server prices, sandbox gates, durable order before Stripe, verified amount/mode, idempotent reconciliation, intake, normalized interest upsert, consent, unsubscribe and storage failure. Mocked providers; no external writes.",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
