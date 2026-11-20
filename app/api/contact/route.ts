import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveInquiry } from "@/lib/inquiries";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 16000) return NextResponse.json({ error: "Your request is too long. Please shorten it." }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const organization = String(body.organization ?? "").trim();
    let message = String(body.message ?? "").trim();
    const website = String(body.website ?? "").trim();

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete your name, email, and message." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 120 || email.length > 254 || organization.length > 200 || message.length > 5000) return NextResponse.json({ error: "Please shorten your name, company, or message." }, { status: 400 });
    if (body.interest !== undefined) {
      const interests: Record<string, string> = { basic: "Basic · from $149 / product", ecommerce: "E-commerce Ready · from $299 / product", custom: "Guided / consulting / custom", partnership: "Agency / integration partnership", "early-access": "Future platform updates" };
      const interest = interests[String(body.interest)];
      const product = String(body.product ?? "").trim();
      const platform = String(body.platform ?? "").trim();
      const assets = String(body.assets ?? "").trim();
      const storeUrl = String(body.storeUrl ?? "").trim();
      if (!interest || !product || !platform || !assets || body.consent !== "yes") return NextResponse.json({ error: "Please complete the required project details and consent checkbox." }, { status: 400 });
      if (product.length > 500 || platform.length > 100 || assets.length > 150 || storeUrl.length > 1000) return NextResponse.json({ error: "One of your project details is too long." }, { status: 400 });
      if (storeUrl) {
        try { const url = new URL(storeUrl); if (!["https:", "http:"].includes(url.protocol)) throw new Error(); }
        catch { return NextResponse.json({ error: "Please enter a valid http or https store URL." }, { status: 400 }); }
      }
      const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map(key => `${key}: ${String(body.attribution?.[key] ?? "").slice(0, 200).replace(/[\r\n]/g, " ")}`).join("\n");
      message = [`Offer: ${interest}`, "Price version: commerce-pilot-2026-11-20; starting price only, subject to eligibility and agreed scope.", `Destination: ${platform}`, `Store: ${storeUrl || "Not provided"}`, `Products: ${product}`, `Existing assets: ${assets}`, "Consent: respond to this request", `Platform updates requested: ${body.interest === "early-access" ? "Yes" : "No"}`, attribution, "", message].join("\n");
    }

    const inquiryId = String(body.inquiryId ?? crypto.randomUUID());
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(inquiryId)) return NextResponse.json({ error: "Invalid inquiry reference. Please reload and try again." }, { status: 400 });
    try {
      await saveInquiry({ id: inquiryId, name, email, organization, storeUrl: String(body.storeUrl ?? "").trim(), interest: String(body.interest ?? "custom"), message });
    } catch {
      console.error("Unable to save inquiry.");
      return NextResponse.json({ error: "We could not save your request. Please try again or email hello@topostitch.dev." }, { status: 503 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error("Contact email is not configured.", {
        hasResendApiKey: Boolean(apiKey),
        hasContactToEmail: Boolean(to),
        hasContactFromEmail: Boolean(from),
      });

      return NextResponse.json({ success: true, inquiryId });
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeOrganization = escapeHtml(organization || "Not provided");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `TopoStitch inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization || "Not provided"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New TopoStitch inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Organization:</strong> ${safeOrganization}</p>
          <hr />
          <p>${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend failed to send contact email.");

      // The inquiry is already durable; do not invite duplicate submissions.
      return NextResponse.json({ success: true, inquiryId });
    }

    } catch { console.error("Inquiry saved; email notification failed."); }
    return NextResponse.json({ success: true, inquiryId });
  } catch (error) {
    console.error("Contact form request failed.");

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

