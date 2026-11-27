"use client";

let anonymousId: string | undefined;
let sessionId: string | undefined;

function uuidV7() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const timestamp = Date.now();
  for (let index = 5; index >= 0; index--) {
    bytes[index] = (timestamp / 2 ** (8 * (5 - index))) & 0xff;
  }
  bytes[6] = 0x70 | (bytes[6] & 0x0f);
  bytes[8] = 0x80 | (bytes[8] & 0x3f);
  const hex = [...bytes]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Send anonymous, event-only PostHog events. No form values, query strings, or page titles are sent. */
export function capturePostHogEvent(
  event: string,
  properties: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  if (
    typeof navigator !== "undefined" &&
    (navigator.doNotTrack === "1" ||
      (navigator as Navigator & { globalPrivacyControl?: boolean })
        .globalPrivacyControl)
  )
    return;
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) return;

  const configuredHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  let host: string;
  try {
    const parsed = new URL(configuredHost);
    if (parsed.protocol !== "https:") return;
    host = parsed.origin;
  } catch {
    return;
  }

  anonymousId ??= crypto.randomUUID();
  sessionId ??= crypto.randomUUID();
  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) =>
        [
          "article_slug",
          "engaged_seconds",
          "scroll_depth_percent",
          "label",
          "target_path",
          "partner_type",
          "capture",
          "deliverable",
          "outcome",
          "quantity",
          "source",
          "interest_count",
          "guide_slug",
        ].includes(key) &&
        (typeof value === "number"
          ? Number.isFinite(value)
          : typeof value === "boolean" ||
            /^[a-zA-Z0-9_:/-]{1,120}$/.test(value)),
    ),
  );
  const timestamp = new Date().toISOString();
  const payload = {
    created_at: timestamp,
    batch: [
      {
        event,
        uuid: uuidV7(),
        distinct_id: anonymousId,
        session_id: sessionId,
        timestamp,
        options: { process_person_profile: false },
        properties: {
          ...safeProperties,
          page_path:
            /^\/(?:services|insights|learn)\/[a-z0-9-]+$/.test(
              window.location.pathname,
            ) ||
            [
              "/",
              "/services",
              "/compare",
              "/learn",
              "/insights",
              "/partnerships",
              "/developers",
              "/order",
              "/cart",
              "/updates",
            ].includes(window.location.pathname)
              ? window.location.pathname
              : "/other",
          $lib: "topostitch-marketing",
        },
      },
    ],
  };
  void fetch(`${host}/i/v1/analytics/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
    keepalive: true,
    mode: "cors",
    credentials: "omit",
  }).catch(() => undefined);
}
