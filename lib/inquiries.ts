type Inquiry = {
  id: string;
  name: string;
  email: string;
  organization: string;
  storeUrl: string;
  interest: string;
  message: string;
};

export async function saveInquiry(inquiry: Inquiry) {
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID;
  const customers = process.env.AIRTABLE_CUSTOMERS_TABLE_ID;
  const inquiries = process.env.AIRTABLE_INQUIRIES_TABLE_ID;
  if (!token || !base || !customers || !inquiries) throw new Error('Inquiry storage is not configured');

  async function upsert(table: string, field: string, fields: Record<string, unknown>) {
    const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base!)}/${encodeURIComponent(table)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ performUpsert: { fieldsToMergeOn: [field] }, records: [{ fields }] }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error(`Inquiry storage rejected request: ${response.status}`);
    const result = await response.json();
    const id = result.records?.[0]?.id;
    if (typeof id !== 'string') throw new Error('Inquiry storage returned no record');
    return id;
  }

  const customerFields: Record<string, unknown> = { 'Customer Name': inquiry.name, Email: inquiry.email.toLowerCase() };
  if (inquiry.organization) customerFields.Organization = inquiry.organization;
  if (inquiry.storeUrl) customerFields.Website = inquiry.storeUrl;
  const lookup = new URL(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(customers)}`);
  const emailLiteral = inquiry.email.toLowerCase().replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  lookup.searchParams.set('filterByFormula', `LOWER({Email})="${emailLiteral}"`);
  lookup.searchParams.set('maxRecords', '1');
  const existing = await fetch(lookup, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(12000), cache: 'no-store' });
  if (!existing.ok) throw new Error('Customer lookup failed');
  const found = await existing.json();
  let customerId = found.records?.[0]?.id;
  if (!customerId) {
    const created = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(customers)}`, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields: customerFields }] }), signal: AbortSignal.timeout(12000),
    });
    if (!created.ok) throw new Error('Customer creation failed');
    const result = await created.json();
    customerId = result.records?.[0]?.id;
    if (typeof customerId !== 'string') throw new Error('No customer record returned');
  }
  const service = inquiry.interest === 'basic' ? 'Optimization' : inquiry.interest === 'ecommerce' ? '3D Production' : inquiry.interest === 'custom' ? 'Consultation' : 'Other';
  await upsert(inquiries, 'Inquiry ID', {
    'Inquiry ID': inquiry.id,
    Service: service,
    Status: 'New',
    'Project Description': inquiry.message,
    Source: inquiry.interest === 'partnership' ? 'Website · partnership inquiry' : 'Website · commerce MVP',
    Customer: [customerId],
  });
}
