"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import styles from "@/app/marketing-layout.module.css";

const offers = [
  { id: "basic", name: "Basic", price: "From $149 per product", description: "We optimize an existing 3D model for your storefront." },
  { id: "ecommerce", name: "E-commerce Ready", price: "From $299 per product", description: "We create a 3D model for one product and prepare it for your storefront." },
  { id: "custom", name: "Done with You", price: "Custom quote", description: "Get help planning capture, preparing files, or handing off 3D to your team." },
  { id: "partnership", name: "Agency or integration partnership", price: "Custom quote", description: "Discuss delivery standards, storefront integration, or a catalog rollout." },
] as const;

function record(event: string, offer: string) {
  try { track(event, { offer, price_version: "commerce-pilot-2026-11-20" }); } catch { /* Analytics must never block an inquiry. */ }
}

export default function MvpLeadForm({ defaultPlatform = "", defaultOffer = "" }: { defaultPlatform?: string; defaultOffer?: string }) {
  const [selected, setSelected] = useState(() => offers.find(offer => offer.id === defaultOffer));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const submitting = useRef(false);
  const inquiryId = useRef<string | null>(null);

  const complete = status === "success";

  useEffect(() => {
    if (interacted.current) heading.current?.focus();
  }, [selected, complete]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || submitting.current) return;
    submitting.current = true;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const params = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map(key => [key, (params.get(key) || "").slice(0, 200)]));
    inquiryId.current ??= crypto.randomUUID();
    setStatus("submitting");
    setError("");
    record("inquiry_submitted", selected.id);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, interest: selected.id, platform: defaultPlatform, attribution, inquiryId: inquiryId.current, intake: "short" }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.error || "We couldn’t send your request. Please try again.");
      interacted.current = true;
      setStatus("success");
      record("inquiry_received", selected.id);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again or email hello@topostitch.dev.");
      record("inquiry_error", selected.id);
    } finally {
      submitting.current = false;
    }
  }

  if (complete) return <div className={styles.card}>
    <h2 ref={heading} tabIndex={-1}>Request received</h2>
    <p>We’ll email you to confirm fit, scope, and pricing. If the project is a fit, we’ll send a secure payment link after you approve the scope.</p>
  </div>;

  if (!selected) return <div className={styles.offerPicker}>
    <h2 ref={heading} tabIndex={-1}>Choose a service</h2>
    <h3>Done for You</h3>
    {offers.map((offer, index) => (
      <div className={styles.offerChoice} key={offer.id}>
        {index === 2 && <h3>Done with You</h3>}
        <button type="button" className={styles.card} onClick={() => {
          interacted.current = true;
          setSelected(offer);
          record("inquiry_started", offer.id);
        }}>
          <strong>{offer.id === "custom" ? "3D workflow consulting" : offer.name}</strong>
          <span className={styles.note}>{offer.price}</span>
          <span>{offer.description}</span>
        </button>
      </div>
    ))}
  </div>;

  return (
    <form className={styles.form} onSubmit={submit} aria-busy={status === "submitting"}>
      <div className={styles.selection}>
        <h2 ref={heading} tabIndex={-1}>{selected.name}</h2>
        <button type="button" disabled={status === "submitting"} onClick={() => {
          interacted.current = true;
          inquiryId.current = null;
          setStatus("idle");
          setSelected(undefined);
        }}>Change service</button>
      </div>
      <p>{selected.price}. No payment is due now.</p>
      <div hidden><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label>Your name<input name="name" autoComplete="name" maxLength={120} required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label>{selected.id === "basic" || selected.id === "ecommerce" ? "What product or model should we review?" : "What would you like help with?"}
        <textarea name="message" rows={3} maxLength={5000} required />
      </label>
      <label className={styles.consent}><input name="consent" type="checkbox" value="yes" required />
        <span>TopoStitch may email me about this request. <a href="/privacy">Privacy notice</a></span>
      </label>
      <button className={styles.button} disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending…" : "Request a review"}
      </button>
      {status === "error" && <p role="alert">{error}</p>}
    </form>
  );
}
