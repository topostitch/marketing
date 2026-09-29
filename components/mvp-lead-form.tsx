"use client";

import { FormEvent, useState } from "react";
import styles from "@/app/commerce-validation.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function MvpLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const interest = String(data.get("interest") ?? "");

    const message = [
      `Interest: ${interest}`,
      `What they make: ${String(data.get("product") ?? "")}`,
      "",
      String(data.get("message") ?? ""),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organization: data.get("organization"),
          website: data.get("website"),
          message,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Unable to send your request.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form className={styles.leadForm} onSubmit={handleSubmit}>
      <input
        className={styles.honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <label>
        Your name
        <input name="name" type="text" required />
      </label>

      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Brand or shop
        <input
          name="organization"
          type="text"
          placeholder="Optional"
        />
      </label>

      <label>
        I&apos;m interested in
        <select name="interest" defaultValue="Early access">
          <option>Early access</option>
          <option>TopoStitch Studio pilot</option>
          <option>Both</option>
        </select>
      </label>

      <label>
        What do you make?
        <input
          name="product"
          type="text"
          placeholder="Ceramics, furniture, jewelry, collectibles..."
          required
        />
      </label>

      <label>
        What would you like to create from it?
        <textarea
          name="message"
          rows={4}
          placeholder="Product photos, lifestyle images, 3D, AR, social content..."
        />
      </label>

      <button
        className={styles.formButton}
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Join early access"}
      </button>

      {status === "success" && (
        <p className={styles.formSuccess}>
          Thanks — we&apos;ll be in touch.
        </p>
      )}

      {status === "error" && (
        <p className={styles.formError}>{error}</p>
      )}
    </form>
  );
}
