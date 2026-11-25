"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "@/app/marketing-layout.module.css";

export default function UpdatesForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const inquiryId = useRef<string | null>(null);
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "done") return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    inquiryId.current ??= crypto.randomUUID();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, inquiryId: inquiryId.current, interest: "early-access" }),
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") return <p role="status">You’re on the updates list.</p>;
  return <form className={`${styles.form} ${styles.footerForm}`} onSubmit={subscribe}>
    <div className={styles.signupFields}>
      <label><span className="sr-only">Email address</span><input name="email" type="email" autoComplete="email" placeholder="Email address" maxLength={254} required /></label>
      <button type="submit" className={styles.button} disabled={status === "sending"}>{status === "sending" ? "Signing up…" : "Subscribe"}</button>
    </div>
    <div hidden><label>Leave this field empty <input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className={styles.consent}><input name="optIn" type="checkbox" value="yes" required /> <span>Send me TopoStitch email updates. <a href="/privacy">Privacy notice</a></span></label>
    {status === "error" && <p role="alert">We couldn’t save your signup. Please try again.</p>}
  </form>;
}
