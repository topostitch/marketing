import { NextResponse } from "next/server";
import { guardedBody } from "@/lib/submission-guard";
import { savePilotIntake } from "@/lib/pilot-checkout";
export async function POST(request: Request) {
  try {
    const body = await guardedBody(request);
    const intake: Record<string, string> = {};
    for (const field of [
      "productDetails",
      "destination",
      "returnAddress",
      "handling",
    ]) {
      if (
        typeof body[field] !== "string" ||
        body[field].trim().length < 3 ||
        body[field].length > 2000
      )
        throw new Error("Complete the intake fields.");
      intake[field] = body[field].trim();
    }
    if (body.acknowledged !== true || typeof body.session !== "string")
      throw new Error("Confirm the fulfillment terms.");
    await savePilotIntake(body.session, intake);
    return NextResponse.json(
      { saved: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Intake was not saved. Verify payment and complete all fields, then retry.",
      },
      { status: 400 },
    );
  }
}
