// All new purchases must pass per-item qualification and the cart API.
import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json(
    {
      error: "Please qualify each product at /order and use the cart checkout.",
    },
    { status: 409 },
  );
}
