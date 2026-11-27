"use client";
import { useState, type FormEvent } from "react";
import { pilotPolicy } from "@/lib/fulfillment-policy";
import s from "@/app/marketing-layout.module.css";
export default function OrderIntake({ session }: { session: string }) {
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/order/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          session,
          acknowledged: fields.acknowledged === "on",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus(
        "Saved. This is a sandbox order: do not ship a product. Production shipping instructions require a confirmed receiving address and operational approval.",
      );
      sessionStorage.removeItem("topostitch-pilot-cart-v1");
    } catch {
      setStatus("Intake could not be saved. Please retry.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className={s.form} onSubmit={submit}>
      <h2>Tell us about the products</h2>
      <p>
        Standard pilot limits remain {pilotPolicy.maxDimensionIn} ×{" "}
        {pilotPolicy.maxDimensionIn} × {pilotPolicy.maxDimensionIn} inches,{" "}
        {pilotPolicy.maxWeightLb} lbs and ${pilotPolicy.maxValueUsd} per
        product; {pilotPolicy.maxProducts} products total. Tell us before
        shipping if anything differs from the qualified cart.
      </p>
      {[
        [
          "productDetails",
          "Product names, materials, dimensions and desired details, matched to each cart item",
        ],
        [
          "destination",
          "Intended storefront or experience and desired file formats",
        ],
        [
          "returnAddress",
          "Return address in the contiguous United States (use test details in this sandbox)",
        ],
        [
          "handling",
          "Handling instructions, packaging and return insurance plan",
        ],
      ].map(([name, label]) => (
        <label key={name}>
          {label}
          <textarea name={name} required minLength={3} maxLength={2000} />
        </label>
      ))}
      <label className={s.consent}>
        <input name="acknowledged" type="checkbox" required />
        <span>
          I confirm the product details and have reviewed the pilot fulfillment
          terms below. No marketing consent is required for order
          communications.
        </span>
      </label>
      <button className={s.button} disabled={busy}>
        {busy ? "Saving…" : "Save order intake"}
      </button>
      {status && <p role="status">{status}</p>}
    </form>
  );
}
