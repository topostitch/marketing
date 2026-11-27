"use client";
import { useState, type FormEvent } from "react";
import { capabilities } from "@/lib/capabilities";
import { capturePostHogEvent } from "@/lib/posthog-events";
import s from "@/app/marketing-layout.module.css";
export default function InterestForm({
  source = "updates",
  initial = "production",
}: {
  source?: string;
  initial?: string;
}) {
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: f.get("email"),
          organization: f.get("organization"),
          website: f.get("website"),
          interests: f.getAll("interests"),
          consent: f.get("consent") === "on",
          source,
        }),
      });
      if (!response.ok) throw new Error();
      setStatus("Your interests are saved.");
      capturePostHogEvent(
        source === "developers"
          ? "developer_preview_registration"
          : "future_capability_interest",
        { source, interest_count: f.getAll("interests").length },
      );
    } catch {
      setStatus("We could not save your interests. Please try again later.");
    } finally {
      setBusy(false);
    }
  }
  if (status === "Your interests are saved.")
    return (
      <p role="status">
        {status} You can unsubscribe from an update email or contact
        hello@topostitch.dev. Registration does not grant software access.
      </p>
    );
  return (
    <form className={s.form} onSubmit={submit}>
      <label>
        Email address
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
        />
      </label>
      <label>
        Organization (optional)
        <input
          name="organization"
          maxLength={160}
          autoComplete="organization"
        />
      </label>
      <fieldset>
        <legend>What would you like to hear about?</legend>
        {capabilities.map((c) => (
          <label className={s.consent} key={c.id}>
            <input
              type="checkbox"
              name="interests"
              value={c.id}
              defaultChecked={c.id === initial}
            />
            <span>{c.name}</span>
          </label>
        ))}
      </fieldset>
      <div hidden>
        <label>
          Leave empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className={s.consent}>
        <input type="checkbox" name="consent" required />
        <span>
          I agree to receive marketing emails about my selected interests. I can
          unsubscribe at any time. Order communications are separate.{" "}
          <a href="/privacy">Privacy notice</a>
        </span>
      </label>
      <button className={s.button} disabled={busy}>
        {busy ? "Saving…" : "Save my interests"}
      </button>
      {status && <p role="alert">{status}</p>}
    </form>
  );
}
