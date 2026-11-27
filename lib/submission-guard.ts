import { createHash } from "node:crypto";
// Burst protection per runtime. A distributed edge rate limit remains a production release requirement.
const buckets = new Map<string, { count: number; until: number }>();
export async function guardedBody(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    throw new Error("Please submit from this website.");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new Error("JSON is required.");
  const now = Date.now();
  for (const [k, v] of buckets) if (v.until < now) buckets.delete(k);
  if (buckets.size > 5000) throw new Error("Please try again later.");
  const key = createHash("sha256")
    .update(request.headers.get("x-forwarded-for")?.split(",")[0] || "local")
    .digest("hex");
  const b = buckets.get(key) || { count: 0, until: now + 60000 };
  b.count++;
  buckets.set(key, b);
  if (b.count > 20)
    throw new Error("Please wait a minute before trying again.");
  if (Number(request.headers.get("content-length") || 0) > 20000)
    throw new Error("Submission is too large.");
  const text = await request.text();
  if (text.length > 20000) throw new Error("Submission is too large.");
  const body = JSON.parse(text);
  if (!body || typeof body !== "object" || Array.isArray(body))
    throw new Error("Invalid submission.");
  return body;
}
