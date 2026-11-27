import { NextResponse } from "next/server";
import { Resend } from "resend";
import { guardedBody } from "@/lib/submission-guard";
import { registerInterest, validateInterest } from "@/lib/interests";
export async function POST(request: Request) {
  let body;
  try {
    body = await guardedBody(request);
    validateInterest(body);
  } catch {
    return NextResponse.json(
      {
        error:
          "Check your email, selected interests and consent. Please wait before retrying repeated submissions.",
      },
      { status: 400 },
    );
  }
  try {
    const { id, record } = await registerInterest(body);
    // Only send confirmation after durable consent persistence. Never block saved registration on email delivery.
    if (process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL) {
      try {
        const url = new URL("/unsubscribe", new URL(request.url).origin);
        url.searchParams.set("id", id);
        url.searchParams.set("token", record.unsubscribeToken);
        await new Resend(process.env.RESEND_API_KEY).emails.send({
          from: process.env.CONTACT_FROM_EMAIL,
          to: record.email,
          subject: "Your TopoStitch interests",
          text: `Your interests are saved: ${record.interests.join(", ")}. Future software availability is not guaranteed. Unsubscribe: ${url.href}`,
        });
      } catch {
        console.error("Interest saved; confirmation email failed.");
      }
    }
    return NextResponse.json(
      { saved: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "We could not save your interests. Please try again later." },
      { status: 503 },
    );
  }
}
