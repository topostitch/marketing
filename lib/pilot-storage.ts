// Reuses the existing Airtable order/customer contract; no schema mutation.
type Fields = Record<string, unknown>;
export type StoredRecord = { id: string; fields: Fields };
export function storageConfigured() {
  return [
    "AIRTABLE_TOKEN",
    "AIRTABLE_BASE_ID",
    "AIRTABLE_ORDERS_TABLE_ID",
    "AIRTABLE_CUSTOMERS_TABLE_ID",
  ].every((k) => Boolean(process.env[k]));
}
export async function airtable(
  table: string,
  method = "GET",
  body?: unknown,
  query = "",
) {
  const base = process.env.AIRTABLE_BASE_ID,
    token = process.env.AIRTABLE_TOKEN;
  if (!base || !token || !table) throw new Error("Storage is not configured.");
  const response = await fetch(
    `https://api.airtable.com/v0/${encodeURIComponent(base)}/${table}${query}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    },
  );
  if (!response.ok) throw new Error("Durable storage failed.");
  return response.json();
}
export async function findRecord(
  table: string,
  field: string,
  value: string,
): Promise<StoredRecord | undefined> {
  const q = new URLSearchParams({
    filterByFormula: `{${field}}=${JSON.stringify(value)}`,
    maxRecords: "1",
  });
  return (await airtable(table, "GET", undefined, `?${q}`)).records?.[0];
}
export async function upsertRecord(
  table: string,
  field: string,
  fields: Fields,
): Promise<StoredRecord> {
  const result = await airtable(table, "PATCH", {
    performUpsert: { fieldsToMergeOn: [field] },
    records: [{ fields }],
  });
  if (!result.records?.[0]?.id)
    throw new Error("Storage did not confirm persistence.");
  return result.records[0];
}
