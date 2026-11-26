'use client'

let anonymousId: string | undefined

/** Send anonymous, event-only PostHog events. No form values, query strings, or page titles are sent. */
export function capturePostHogEvent(event: string, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!apiKey) return

  const configuredHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
  let host: string
  try {
    const parsed = new URL(configuredHost)
    if (parsed.protocol !== 'https:') return
    host = parsed.origin
  } catch { return }

  anonymousId ??= typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const payload = {
    api_key: apiKey,
    event,
    distinct_id: anonymousId,
    properties: { ...properties, page_path: window.location.pathname, $lib: 'topostitch-marketing' },
  }
  void fetch(`${host}/capture/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
    mode: 'cors',
    credentials: 'omit',
  }).catch(() => undefined)
}
