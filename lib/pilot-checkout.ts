import { createHash } from "node:crypto";
import {
  deliverables,
  pilotPolicy,
  validateCart,
  type CartItem,
} from "./fulfillment-policy";
import {
  airtable,
  findRecord,
  storageConfigured,
  upsertRecord,
} from "./pilot-storage";
export function sandboxReady() {
  return (
    process.env.VERCEL_ENV !== "production" &&
    (process.env.VERCEL_ENV === "preview" ||
      process.env.NODE_ENV === "development") &&
    /^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY || "") &&
    Boolean(process.env.STRIPE_WEBHOOK_SECRET) &&
    storageConfigured()
  );
}
async function stripe(
  path: string,
  form?: URLSearchParams,
  idempotency?: string,
) {
  if (!sandboxReady()) throw new Error("Sandbox checkout is not configured.");
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: form ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(idempotency ? { "Idempotency-Key": idempotency } : {}),
    },
    ...(form ? { body: form } : {}),
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("Stripe could not complete this request.");
  return response.json();
}
export async function createPilotCheckout(
  input: unknown,
  attempt: unknown,
  origin: string,
) {
  if (!sandboxReady())
    throw new Error(
      "Sandbox checkout is still being configured. Please request a project review.",
    );
  const cart = validateCart(input);
  if (typeof attempt !== "string" || !/^[a-f0-9-]{36}$/.test(attempt))
    throw new Error("Invalid checkout attempt.");
  const digest = createHash("sha256")
    .update(JSON.stringify(cart.items))
    .digest("hex");
  const orderId = `pilot_${attempt}_${digest.slice(0, 16)}`;
  const table = process.env.AIRTABLE_ORDERS_TABLE_ID!;
  let order = await findRecord(table, "Order ID", orderId);
  if (order?.fields["Payment Status"])
    throw new Error(
      "This order has already entered payment processing. Return to your confirmation page.",
    );
  if (!order)
    order = await upsertRecord(table, "Order ID", {
      "Order ID": orderId,
      "Final Quoted Total": cart.total / 100,
      "Fulfillment Notes": JSON.stringify({
        kind: "pilot-v1",
        policy: pilotPolicy.version,
        items: cart.items,
        digest,
      }),
    });
  const existingNotes = JSON.parse(
    String(order.fields["Fulfillment Notes"] || "{}"),
  );
  if (existingNotes.checkoutSession) {
    const existing = await stripe(
      `checkout/sessions/${encodeURIComponent(existingNotes.checkoutSession)}`,
    );
    if (
      existing.status === "open" &&
      existing.livemode === false &&
      typeof existing.url === "string" &&
      new URL(existing.url).origin === "https://checkout.stripe.com"
    )
      return existing.url as string;
    throw new Error(
      "This checkout has completed or expired. Return to the cart and begin a fresh attempt.",
    );
  }
  const form = new URLSearchParams({
    mode: "payment",
    client_reference_id: orderId,
    success_url: `${origin}/order/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    "metadata[topostitch_checkout]": "pilot-v1",
    "metadata[order_id]": orderId,
    "metadata[cart_digest]": digest,
    "custom_text[submit][message]":
      "Sandbox pilot only. Customer pays inbound and insured return shipping separately. No real shipment. Provisional fulfillment terms apply.",
  });
  cart.items.forEach((item, n) => {
    const prefix = `line_items[${n}]`;
    form.set(`${prefix}[quantity]`, String(item.quantity));
    form.set(`${prefix}[price_data][currency]`, "usd");
    form.set(
      `${prefix}[price_data][unit_amount]`,
      String(deliverables[item.deliverable].cents),
    );
    form.set(
      `${prefix}[price_data][product_data][name]`,
      `${deliverables[item.deliverable].name} — physical product pilot`,
    );
  });
  const session = await stripe("checkout/sessions", form, orderId);
  if (
    session.livemode !== false ||
    typeof session.url !== "string" ||
    new URL(session.url).origin !== "https://checkout.stripe.com"
  )
    throw new Error("Invalid sandbox checkout response.");
  if (
    typeof session.id !== "string" ||
    !/^cs_test_[a-zA-Z0-9]+$/.test(session.id)
  )
    throw new Error("Invalid sandbox session.");
  await airtable(`${table}/${order.id}`, "PATCH", {
    fields: {
      "Fulfillment Notes": JSON.stringify({
        ...existingNotes,
        checkoutSession: session.id,
      }),
    },
  });
  return session.url as string;
}
type PilotNotes = {
  kind: string;
  policy: string;
  items: CartItem[];
  digest: string;
  checkoutSession?: string;
  intake?: Record<string, string>;
};
export async function verifyPilotPayment(id: string) {
  if (!/^cs_test_[a-zA-Z0-9]+$/.test(id))
    throw new Error("Invalid sandbox session.");
  const session = await stripe(`checkout/sessions/${encodeURIComponent(id)}`);
  if (session.metadata?.topostitch_checkout !== "pilot-v1") return null;
  if (
    session.id !== id ||
    session.livemode !== false ||
    session.mode !== "payment" ||
    session.payment_status !== "paid" ||
    session.currency !== "usd"
  )
    throw new Error("Payment is not verified.");
  const orderId = session.metadata.order_id;
  if (
    typeof orderId !== "string" ||
    !/^pilot_[a-f0-9-]{36}_[a-f0-9]{16}$/.test(orderId) ||
    session.client_reference_id !== orderId
  )
    throw new Error("Payment order reference is invalid.");
  const order = await findRecord(
    process.env.AIRTABLE_ORDERS_TABLE_ID!,
    "Order ID",
    orderId,
  );
  if (!order) throw new Error("Order is not available.");
  const notes: PilotNotes = JSON.parse(
    String(order.fields["Fulfillment Notes"] || ""),
  );
  if (notes.checkoutSession && notes.checkoutSession !== id)
    throw new Error("Payment session does not match the stored order.");
  const cart = validateCart(notes.items);
  const digest = createHash("sha256")
    .update(JSON.stringify(cart.items))
    .digest("hex");
  if (
    notes.kind !== "pilot-v1" ||
    notes.digest !== digest ||
    session.metadata.cart_digest !== digest ||
    session.amount_total !== cart.total ||
    order.fields["Final Quoted Total"] !== cart.total / 100
  )
    throw new Error("Payment does not match the qualified order.");
  if (
    order.fields["Stripe Checkout Session ID"] &&
    order.fields["Stripe Checkout Session ID"] !== id
  )
    throw new Error("Order already has another payment.");
  if (
    order.fields["Payment Status"] &&
    order.fields["Payment Status"] !== "Paid"
  )
    throw new Error("Order is no longer awaiting fulfillment.");
  return { session, order, notes, cart };
}
export async function reconcilePilotPayment(id: string) {
  const verified = await verifyPilotPayment(id);
  if (!verified) return false;
  const { session, order } = verified;
  if (
    order.fields["Payment Status"] === "Paid" &&
    order.fields["Stripe Checkout Session ID"] === id
  )
    return true;
  const email = session.customer_details?.email?.trim().toLowerCase();
  if (!email) throw new Error("Paid session has no contact email.");
  const customer = await upsertRecord(
    process.env.AIRTABLE_CUSTOMERS_TABLE_ID!,
    "Email",
    { Email: email, "Customer Name": session.customer_details?.name || email },
  );
  await airtable(
    `${process.env.AIRTABLE_ORDERS_TABLE_ID}/${order.id}`,
    "PATCH",
    {
      fields: {
        "Payment Status": "Paid",
        "Stripe Checkout Session ID": id,
        Customer: [customer.id],
      },
    },
  );
  return true;
}
export async function savePilotIntake(
  id: string,
  intake: Record<string, string>,
) {
  const verified = await verifyPilotPayment(id);
  if (!verified) throw new Error("This is not a pilot order.");
  await reconcilePilotPayment(id);
  // Intake never changes payment or refund fields; duplicate submissions replace the same intake.
  await airtable(
    `${process.env.AIRTABLE_ORDERS_TABLE_ID}/${verified.order.id}`,
    "PATCH",
    {
      fields: {
        "Fulfillment Notes": JSON.stringify({ ...verified.notes, intake }),
      },
    },
  );
}
