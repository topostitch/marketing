"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import styles from "@/app/commerce-validation.module.css";

const offers = [
  ["basic", "Basic · from $149 / product"],
  ["ecommerce", "E-commerce Ready · from $299 / product"],
  ["custom", "Guided capture / consulting / custom project"],
  ["partnership", "Agency or integration partnership"],
  ["early-access", "Future platform updates"],
] as const;

type Status = "idle" | "submitting" | "success" | "error";
function record(event: string, interest: string) {
  try { track(event, { offer: interest, price_version: "commerce-pilot-2026-11-20" }); } catch { /* Analytics must never block an inquiry. */ }
}

export default function MvpLeadForm({ defaultPlatform = "" }: { defaultPlatform?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [interest, setInterest] = useState("ecommerce");
  const statusRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const inquiryId = useRef<string | null>(null);

  useEffect(() => {
    const offer = new URLSearchParams(window.location.search).get("offer");
    if (offers.some(([value]) => value === offer)) setInterest(offer!);
    function chooseOffer(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-offer]");
      const selected = link?.dataset.offer;
      if (!selected || !offers.some(([value]) => value === selected)) return;
      event.preventDefault();
      setInterest(selected);
      const url = new URL(window.location.href);
      url.searchParams.set("offer", selected);
      url.hash = "early-access";
      window.history.replaceState(null, "", url);
      document.getElementById("early-access")?.scrollIntoView({ behavior: "instant" });
      document.getElementById("lead-interest")?.focus({ preventScroll: true });
      record("offer_selected", selected);
    }
    document.addEventListener("click", chooseOffer);
    return () => document.removeEventListener("click", chooseOffer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    inquiryId.current ??= crypto.randomUUID();
    const params = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map(key => [key, (params.get(key) || "").slice(0, 200)]));
    setStatus("submitting");
    setError("");
    record("inquiry_submitted", interest);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), attribution, inquiryId: inquiryId.current }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.error || "Unable to send your request. Please try again or email hello@topostitch.dev.");
      form.reset();
      inquiryId.current = null;
      setStatus("success");
      record("inquiry_received", interest);
      statusRef.current?.focus();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again or email hello@topostitch.dev.");
      record("inquiry_error", interest);
      statusRef.current?.focus();
    }
  }

  return (
    <form className={styles.leadForm} onSubmit={handleSubmit} aria-busy={status === "submitting"} onFocus={() => { if (!started.current) { started.current = true; record("inquiry_started", interest); } }}>
      <p>Fields marked * are required.</p>
      <div hidden aria-hidden="true"><label htmlFor="website-trap">Leave this field empty</label><input id="website-trap" type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label htmlFor="lead-name">Your name *<input id="lead-name" name="name" type="text" autoComplete="name" maxLength={120} required /></label>
      <label htmlFor="lead-email">Email *<input id="lead-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label htmlFor="lead-organization">Brand or company<input id="lead-organization" name="organization" type="text" autoComplete="organization" maxLength={200} /></label>
      <label htmlFor="lead-interest">I need help with *<select id="lead-interest" name="interest" value={interest} onChange={e => setInterest(e.target.value)} required>{offers.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label htmlFor="lead-store">Store or product listing URL<input id="lead-store" name="storeUrl" type="url" placeholder="https://" autoComplete="url" maxLength={1000} /></label>
      <label htmlFor="lead-platform">Intended destination *<select id="lead-platform" name="platform" defaultValue={defaultPlatform} required><option value="" disabled>Select a destination</option><option>Amazon</option><option>Shopify</option><option>Amazon and Shopify</option><option>Other / not sure yet</option></select></label>
      <label htmlFor="lead-product">Product type and approximate quantity *<input id="lead-product" name="product" placeholder="For example, 3 wooden chairs" maxLength={500} required /></label>
      <label htmlFor="lead-assets">What do you already have? *<select id="lead-assets" name="assets" defaultValue="" required><option value="" disabled>Select your starting point</option><option>Existing 3D models</option><option>Product photos</option><option>A physical product needing capture</option><option>Not sure / discussing a partnership</option></select></label>
      <label htmlFor="lead-message">What would you like to achieve? *<textarea id="lead-message" name="message" rows={4} maxLength={5000} placeholder="Tell us your goal, timeline, and any known requirements." required /></label>
      <label className={styles.consent} htmlFor="lead-consent"><input id="lead-consent" name="consent" type="checkbox" value="yes" required /><span>I agree that TopoStitch may use these details to respond to my request. * <a href="/privacy">Privacy notice</a></span></label>
      <button className={styles.formButton} type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : interest === "early-access" ? "Request platform updates" : "Send project request"}</button>
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true">
        {status === "success" && <p className={styles.formSuccess}>Thanks. Your request was received. We will reply by email with the next step. No payment has been taken.</p>}
        {status === "error" && <p className={styles.formError}>{error}</p>}
      </div>
      <p className={styles.evidenceNote}>We use your details to handle your inquiry. Selecting platform updates requests those updates; other inquiries do not subscribe you to marketing. Do not include payment details or confidential files.</p>
    </form>
  );
}
