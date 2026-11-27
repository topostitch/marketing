import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { capabilities, consentVersion } from "./capabilities";
import { findRecord, upsertRecord, airtable } from "./pilot-storage";
type InterestRecord = {
  kind: "interest-v1";
  email: string;
  organization: string;
  interests: string[];
  source: string;
  consent: true;
  consentTimestamp: string;
  consentVersion: string;
  unsubscribed: boolean;
  unsubscribeToken: string;
  unsubscribedAt?: string;
};
export function validateInterest(body: Record<string, unknown>) {
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const organization =
    typeof body.organization === "string" ? body.organization.trim() : "";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    organization.length > 160 ||
    body.consent !== true ||
    body.website
  )
    throw new Error("Enter a valid email and explicit marketing consent.");
  if (
    !Array.isArray(body.interests) ||
    !body.interests.length ||
    body.interests.length > capabilities.length ||
    body.interests.some((id) => !capabilities.some((c) => c.id === id))
  )
    throw new Error("Choose at least one supported interest.");
  const source =
    typeof body.source === "string" &&
    ["footer", "updates", "developers", "captures"].includes(body.source)
      ? body.source
      : "updates";
  return {
    email,
    organization,
    interests: [...new Set(body.interests as string[])],
    source,
  };
}
export async function registerInterest(body: Record<string, unknown>) {
  const input = validateInterest(body),
    table = process.env.AIRTABLE_INQUIRIES_TABLE_ID;
  if (!table || !process.env.AIRTABLE_CUSTOMERS_TABLE_ID)
    throw new Error("Interest storage is not configured.");
  const id = `interest_${createHash("sha256").update(input.email).digest("hex")}`;
  const prior = await findRecord(table, "Inquiry ID", id);
  let old: InterestRecord | undefined;
  if (prior) {
    old = JSON.parse(String(prior.fields["Project Description"]));
    if (old?.kind !== "interest-v1")
      throw new Error("Interest record requires review.");
  }
  const record: InterestRecord = {
    ...input,
    kind: "interest-v1",
    interests: [...new Set([...(old?.interests || []), ...input.interests])],
    consent: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion,
    unsubscribed: false,
    unsubscribeToken: old?.unsubscribeToken || randomBytes(32).toString("hex"),
  };
  const customer = await upsertRecord(
    process.env.AIRTABLE_CUSTOMERS_TABLE_ID,
    "Email",
    {
      Email: input.email,
      ...(input.organization ? { Organization: input.organization } : {}),
    },
  );
  await upsertRecord(table, "Inquiry ID", {
    "Inquiry ID": id,
    Service: "Other",
    Status: "New",
    Source: "Website · product interests",
    "Project Description": JSON.stringify(record),
    Customer: [customer.id],
  });
  return { id, record };
}
export async function unsubscribeInterest(id: string, token: string) {
  if (!/^interest_[a-f0-9]{64}$/.test(id) || !/^[a-f0-9]{64}$/.test(token))
    throw new Error("Invalid unsubscribe link.");
  const table = process.env.AIRTABLE_INQUIRIES_TABLE_ID!;
  const row = await findRecord(table, "Inquiry ID", id);
  if (!row) throw new Error("Registration not found.");
  const record: InterestRecord = JSON.parse(
    String(row.fields["Project Description"]),
  );
  if (
    record.kind !== "interest-v1" ||
    !/^[a-f0-9]{64}$/.test(record.unsubscribeToken) ||
    !timingSafeEqual(
      Buffer.from(token, "hex"),
      Buffer.from(record.unsubscribeToken, "hex"),
    )
  )
    throw new Error("Invalid unsubscribe link.");
  await airtable(`${table}/${row.id}`, "PATCH", {
    fields: {
      "Project Description": JSON.stringify({
        ...record,
        unsubscribed: true,
        unsubscribedAt: new Date().toISOString(),
      }),
    },
  });
}
