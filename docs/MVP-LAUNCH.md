# Commerce inbound MVP

Audience: Amazon and Shopify merchants already using or exploring 3D. Research practitioners and agencies inform the workflow; they do not replace the merchant buyer.

## Implemented

- Pilot starting prices: Basic $149/product for eligible existing-model preparation; E-commerce Ready $299/product for eligible production from suitable imagery. Final scope is reviewed before payment. Capture, shipping, variants, complex modeling and implementation are separately quoted.
- Merchant inquiry, consulting/custom work, partnership, and future-platform interest through one form.
- Linked Shopify Rebecca Minkoff and Amazon 2024 selling-partner guide observations, with context and no promised TopoStitch uplift.
- Airtable Customers lookup/create and Inquiry upsert before Resend notification. A storage failure returns an error; notification failure after storage does not tell customers to resubmit.
- UTM fields stored with the inquiry and non-PII custom event names. Vercel custom-event reporting depends on the account plan and analytics configuration; no plan upgrade is enabled.
- SSR-visible content, canonical metadata, Organization/Service JSON-LD, sitemap, robots, and redirects from obsolete platform/stories/learn pages.
- Labels, native disclosures, visible focus, reduced-motion support, darker accent, and status/error feedback. This is not a certification or complete WCAG audit.

## Required deployment configuration

Use only the Commercial Operations base. Research remains in DSCVRY.

- AIRTABLE_TOKEN (records read/write for the commercial base only)
- AIRTABLE_BASE_ID
- AIRTABLE_CUSTOMERS_TABLE_ID
- AIRTABLE_INQUIRIES_TABLE_ID
- RESEND_API_KEY
- CONTACT_FROM_EMAIL
- CONTACT_TO_EMAIL

Never commit environment values. Production credential scope must be authorized. Creating/updating a Vercel preview does not prove production credentials are configured.

## Payment launch gate

Stripe account creation/connection, business verification, and payment testing remain unfinished. No checkout or payment collection is represented as active. First confirm eligibility and written deliverables; then request payment through the connected account. Create Orders and associate payment status only when implementing that verified payment workflow. Do not mark a payment as received from a browser redirect alone.

## Validation

Run `npm test` for mocked inquiry path checks and `npm run build` for full TypeScript/build validation. Tests make no external requests and send no email. Check deployed home, about, privacy, sitemap, robots, mobile/zoom, keyboard, form errors, and an explicitly authorized end-to-end inquiry before launch. Verify whether customer email delivery and CRM follow-up work in production.

## Later

Organic LinkedIn inbound path and a small paid-search experiment are candidates. Research actual merchant terminology, search intent and unit economics before spending; do not enable ads or tracking pixels as part of this MVP.
