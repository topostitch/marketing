import { NextResponse } from "next/server";
import { recordStripePayment, verifyStripeSignature } from "@/lib/payments";
import { reconcilePilotPayment } from "@/lib/pilot-checkout";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret)
    return NextResponse.json(
      { error: "Payments are not configured." },
      { status: 503 },
    );
  const raw = await request.text();
  if (raw.length > 1000000)
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  if (
    !verifyStripeSignature(
      raw,
      request.headers.get("stripe-signature") || "",
      secret,
    )
  )
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }
  if (
    [
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
    ].includes(event.type)
  ) {
    const id = event.data?.object?.id;
    if (typeof id !== "string" || !/^cs_[a-zA-Z0-9_]+$/.test(id))
      return NextResponse.json({ error: "Invalid session." }, { status: 400 });
    try {
      if (event.data.object.metadata?.topostitch_checkout === "pilot-v1")
        await reconcilePilotPayment(id);
      else await recordStripePayment(id);
    } catch {
      console.error("Stripe payment could not be reconciled.");
      return NextResponse.json(
        { error: "Please retry delivery." },
        { status: 503 },
      );
    }
  }
  return NextResponse.json({ received: true });
}
