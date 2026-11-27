import { NextResponse } from "next/server";
import { guardedBody } from "@/lib/submission-guard";
import { validateCart } from "@/lib/fulfillment-policy";
import { createPilotCheckout } from "@/lib/pilot-checkout";
export const runtime = "nodejs";
export async function POST(request: Request) {
  let body;
  try {
    body = await guardedBody(request);
    validateCart(body.items);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid cart." },
      { status: 400 },
    );
  }
  const origin = new URL(request.url).origin;
  const expected =
    process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : null;
  if (
    origin !== expected &&
    !(
      process.env.NODE_ENV === "development" &&
      ["localhost", "127.0.0.1"].includes(new URL(origin).hostname)
    )
  )
    return NextResponse.json(
      { error: "Checkout is unavailable on this host." },
      { status: 503 },
    );
  try {
    return NextResponse.json(
      { url: await createPilotCheckout(body.items, body.attempt, origin) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Sandbox checkout could not start. Configuration or durable order storage needs attention. Your cart is saved; please retry or request a project review.",
      },
      { status: 503 },
    );
  }
}
