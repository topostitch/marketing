"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { capturePostHogEvent } from "@/lib/posthog-events";
import styles from "@/app/marketing-layout.module.css";
import { commerceOffers } from "@/lib/commerce-offers";

function record(event: string, offer: string) {
  try {
    track(event, { offer, price_version: "pilot-2026-11-27" });
  } catch {
    /* Analytics must never block an inquiry. */
  }
}

export default function MvpLeadForm({
  defaultPlatform = "",
  defaultOffer = "",
  defaultQuantity,
}: {
  defaultPlatform?: string;
  defaultOffer?: string;
  defaultQuantity?: number;
}) {
  const [selected, setSelected] = useState(() =>
    commerceOffers.find((offer) => offer.id === defaultOffer),
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const submitting = useRef(false);
  const inquiryId = useRef<string | null>(null);

  const complete = status === "success";

  useEffect(() => {
    if (complete) heading.current?.focus();
  }, [complete]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || submitting.current) return;
    submitting.current = true;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const params = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(
      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ].map((key) => [key, (params.get(key) || "").slice(0, 200)]),
    );
    inquiryId.current ??= crypto.randomUUID();
    setStatus("submitting");
    setError("");
    record("inquiry_submitted", selected.id);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          interest: selected.id,
          platform: defaultPlatform,
          attribution,
          inquiryId: inquiryId.current,
          intake: "short",
        }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(
          body?.error || "We couldn’t send your request. Please try again.",
        );
      setStatus("success");
      record("inquiry_received", selected.id);
      capturePostHogEvent(
        selected.id === "custom"
          ? "specialized_inquiry_submitted"
          : "service_inquiry_submitted",
        { deliverable: selected.id },
      );
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Please try again or email hello@topostitch.dev.",
      );
      record("inquiry_error", selected.id);
    } finally {
      submitting.current = false;
    }
  }

  if (complete)
    return (
      <div className={`${styles.card} ${styles.requestSuccess}`}>
        <h2 ref={heading} tabIndex={-1}>
          Request received
        </h2>
        <p>
          We’ll email you to confirm fit, scope, and pricing. Once you approve
          the scope, we’ll send a secure payment link or invoice.
        </p>
      </div>
    );

  return (
    <form
      className={`${styles.form} ${styles.requestForm}`}
      onSubmit={submit}
      aria-busy={status === "submitting"}
    >
      <fieldset disabled={status === "submitting"}>
        <div>
          <label>
            Service
            <select
              value={selected?.id ?? ""}
              required
              onChange={(event) => {
                const offer = commerceOffers.find(
                  (item) => item.id === event.target.value,
                );
                setSelected(offer);
                inquiryId.current = null;
                setError("");
                setStatus("idle");
                if (offer) record("inquiry_started", offer.id);
              }}
              aria-describedby={selected ? "request-price" : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {commerceOffers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.name}
                </option>
              ))}
            </select>
          </label>
          {selected && (
            <p className={styles.note} id="request-price">
              {selected.price}
            </p>
          )}
        </div>
        <div className={styles.requestContact}>
          <label>
            Your name
            <input name="name" autoComplete="name" maxLength={120} required />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
        </div>
        <label>
          Project details
          <textarea
            name="message"
            rows={3}
            maxLength={5000}
            defaultValue={
              defaultQuantity
                ? `Number of products: ${defaultQuantity}\n\n`
                : ""
            }
            placeholder="What are you working on, and what would you like help with?"
            required
          />
        </label>
        <div hidden>
          <label>
            Leave blank
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className={styles.consent}>
          <input name="consent" type="checkbox" value="yes" required />
          <span>
            TopoStitch may email me about this request.{" "}
            <a href="/privacy">Privacy notice</a>
          </span>
        </label>
      </fieldset>
      {status === "error" && <p role="alert">{error}</p>}
      <div className={styles.requestActions}>
        <button
          className={styles.button}
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Sending…" : "Send request"}
        </button>
        <p className={styles.note}>No payment due now.</p>
      </div>
    </form>
  );
}
