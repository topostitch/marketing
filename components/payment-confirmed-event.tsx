"use client";
import { useEffect } from "react";
import { capturePostHogEvent } from "@/lib/posthog-events";
export default function PaymentConfirmedEvent() {
  useEffect(() => {
    capturePostHogEvent("sandbox_payment_verified", {});
  }, []);
  return null;
}
