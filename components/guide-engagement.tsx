"use client";
import { useEffect } from "react";
import { capturePostHogEvent as track } from "@/lib/posthog-events";
export default function GuideEngagement({ slug }: { slug: string }) {
  useEffect(() => {
    track("learning_guide_viewed", { guide_slug: slug });
    const handler = (event: MouseEvent) => {
      const target =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (
        target &&
        ["/order", "/services"].includes(new URL(target.href).pathname)
      )
        track("guide_to_service", {
          guide_slug: slug,
          target_path: new URL(target.href).pathname,
        });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [slug]);
  return null;
}
