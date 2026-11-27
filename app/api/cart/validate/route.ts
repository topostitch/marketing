import { NextResponse } from "next/server";
import { guardedBody } from "@/lib/submission-guard";
import { validateCart } from "@/lib/fulfillment-policy";
export async function POST(request: Request) {
  try {
    const body = await guardedBody(request);
    return NextResponse.json(validateCart(body.items), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid cart." },
      { status: 400 },
    );
  }
}
