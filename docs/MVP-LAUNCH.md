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

Stripe account creation/connection, business verification, and payment testing remain unfinished. Checkout support is implemented but payment collection remains inactive until configured and tested. Confirm fixed package eligibility and written deliverables before publishing a Payment Link. Signed payment events can create Orders through the implementation below. Do not mark a payment as received from a browser redirect alone.

## Validation

Run `npm test` for mocked inquiry path checks and `npm run build` for full TypeScript/build validation. Tests make no external requests and send no email. Check deployed home, about, privacy, sitemap, robots, mobile/zoom, keyboard, form errors, and an explicitly authorized end-to-end inquiry before launch. Verify whether customer email delivery and CRM follow-up work in production.

## Later

Organic LinkedIn inbound path and a small paid-search experiment are candidates. Research actual merchant terminology, search intent and unit economics before spending; do not enable ads or tracking pixels as part of this MVP.

## Stripe integration

Hosted Stripe Payment Links are supported at `/checkout/basic` and `/checkout/ecommerce`. They remain unavailable until configured. No amount, account, or payment link is invented. Current “from” pricing remains an inquiry offer until a genuinely fixed package is defined.

Configuration (matching test or live mode throughout):
- STRIPE_SECRET_KEY: server-only API key for retrieving Checkout Sessions.
- STRIPE_WEBHOOK_SECRET: signing secret for `/api/stripe/webhook`.
- STRIPE_PAYMENT_LINK_BASIC / STRIPE_PAYMENT_LINK_ECOMMERCE: optional HTTPS buy.stripe.com links.
- STRIPE_PAYMENT_LINK_BASIC_ID / STRIPE_PAYMENT_LINK_ECOMMERCE_ID: the matching plink_ IDs allowed for payment reconciliation.
- AIRTABLE_ORDERS_TABLE_ID: Commercial Operations Orders table.

In Stripe, define the fixed deliverable, eligibility, revision boundary, timing, refund/cancellation terms, and USD price before activating a link. Set up business verification and payout details in the account. Do not paste secrets into chat or commit them. No additional subscription is needed by this code; Stripe payment-processing fees apply.

Subscribe the webhook to checkout.session.completed and checkout.session.async_payment_succeeded. Verify signed raw request bodies with a five-minute tolerance; retrieve the session from Stripe, require paid status and an allowlisted Payment Link, then upsert Orders by Checkout Session ID. Browser redirects never mark an order paid. Return an error on persistence failure so Stripe can retry. Existing orders are left intact on retries. Payment states after refunds/disputes require manual reconciliation in this MVP; do not interpret this as automated accounting or fulfillment.

Before exposing checkout publicly: complete Stripe sandbox checkout and webhook delivery, duplicate-event, unpaid-event, invalid-signature, and Airtable-outage checks; inspect the paid order; test a refund and reconcile it manually. Public checkout buttons are intentionally not substituted for inquiry links before this setup and fixed scope exist. HubSpot remains unconnected; Vercel analytics is the implemented website measurement path.
