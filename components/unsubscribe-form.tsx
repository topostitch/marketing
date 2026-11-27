"use client";
import { useState } from "react";
import s from "@/app/marketing-layout.module.css";
export default function UnsubscribeForm({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <div className={s.form}>
      <p>
        Unsubscribe from marketing updates. Transactional order communications
        remain separate.
      </p>
      <button
        className={s.button}
        disabled={busy || message === "You are unsubscribed."}
        onClick={async () => {
          setBusy(true);
          try {
            const res = await fetch("/api/interests/unsubscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id, token }),
            });
            setMessage(
              res.ok
                ? "You are unsubscribed."
                : "Could not save. Check the link or contact hello@topostitch.dev.",
            );
          } catch {
            setMessage("Could not save. Please retry.");
          } finally {
            setBusy(false);
          }
        }}
      >
        Confirm unsubscribe
      </button>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
