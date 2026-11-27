import { NextResponse } from "next/server";
import { guardedBody } from "@/lib/submission-guard";
import { unsubscribeInterest } from "@/lib/interests";
export async function POST(request: Request) {
  try {
    const body = await guardedBody(request);
    await unsubscribeInterest(body.id, body.token);
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unsubscribe was not saved. Check the link or contact hello@topostitch.dev.",
      },
      { status: 400 },
    );
  }
}
