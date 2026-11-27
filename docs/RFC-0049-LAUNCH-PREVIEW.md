# RFC-0049 November 27 launch preview

## Preserved source and scope

Canonical worktree: `/Users/jacob.galito/Documents/TopoStitch/apps/marketing`.
Branch: `codex/site-storefront-20261125`.
Local page-ending improvements preserved in `cd5f9c7`. Existing November 26 direct-checkout, PostHog, Insights and Partnerships work from `origin/codex/stripe-direct-purchase-20261125` merged in `01d2af0`. The older `origin/codex/storefront-pages` commit `816d58c` was reviewed: its service taxonomy informed the scope, but its standalone layout and old links were not allowed to replace newer local work. Other worktrees, main and staging remain unchanged.

Read RFC-0049 and its November 27 amendment, editorial working drafts, and RFC-0050. Only marketing and service commerce implemented; no public CLI, MCP, API, workflow editor or enterprise deployment infrastructure.

## Implementation

- Exact approved homepage hero; supporting future direction without software availability claims.
- Capture pathways separate from deliverables. Approved $149 Basic digitization / $299 E-commerce Ready starting prices; specialized and integration quotations. Existing asset optimization separated from new-product digitization. No $99/$249 hypothesis published or priced in Stripe.
- Shared `lib/fulfillment-policy.ts`: founder-provided provisional 12-inch, 10-lb, $250, five-product, contiguous-US limits, shipping, timing, recapture and refund terms. Production approval false; customer-capture paid readiness false.
- Shared suitability and fulfillment components on Services, Compare, Learn and purchase. Unsupported/uncertain items route to quotation. Per-item material/physical eligibility and acknowledgment; no blanket waiver or standard manual approval gate.
- Session-scoped cart with quantities/removal. Server validates every item, total quantity, policy version and approved prices. Browser prices are never accepted. Old unqualified checkout API returns 409 and old package URLs route to qualification; historical payment reconciliation remains intact.
- New Stripe test-mode Checkout Sessions preserve an Airtable order before collecting payment, carry a server-side cart digest, use idempotency keys and retain the session reference. Payment is retrieved server-side and matched against the stored eligible cart before Airtable payment status or intake. Signed webhooks retain timestamp tolerance and constant-time verification.
- Detailed intake after verified sandbox payment. No prepayment dataset uploads. No physical shipping instructions/address invented; preview explicitly forbids real shipment.
- Repository-managed typed Learning Center (equivalent to MDX without an extra rendering dependency): ten starter guides, original SVG coverage schematic, primary-source links, contextual service links and shared policy content. Learn, Insights and future software documentation distinguished.
- Existing five Insights articles, reusable template/categories/related articles, Partnerships, source-attributed Walmart/Shopify/Kohler evidence retained. Price-related content aligned with the amendment.
- Developers page: CLI in development based on local source; Stitches and API planned per RFC; other unverified capabilities exploring. No support/compliance/availability claims.
- Unified interests use existing Airtable Customers/Inquiries tables and Resend. Normalized email-based upsert, multiple interests, optional organization, acquisition source, explicit consent/timestamp/version and unsubscribe state stored as a versioned structured payload in Project Description. This avoids inventing Airtable fields or mutating the schema. Signed-in CRM users can inspect the payload; column-level reporting can be added later.
- Unsubscribe uses an opaque stored token and explicit POST, not a state-changing GET. Legacy email signup bypass disabled. Success follows storage only. Resend confirmation failure cannot erase a saved consent record.
- PostHog event-only integration retained and extended; free-text properties, query strings and order/customer identifiers excluded. GPC/DNT honored. No session replay/person profiles.

## Validation

`npm test`: inquiry, historical payment/signature, quantity, legacy checkout gate, PostHog privacy and new pilot regression suites. Provider calls are mocked. Pilot cases include boundary eligibility, unsupported/capture routing, mixed cart/server pricing, five-product total, no live keys/production, durable storage before Stripe, payment tampering, unpaid/live-mode rejection, duplicate reconciliation, intake, consent, normalized registration, unsubscribe and storage failure.

`npm run typecheck`, `npm run lint`, `npm run build` passed after final formatting and the stored-session retry change. `npm run test:responsive`: 9 tests passed, including 30 routes at 320/390/768/1280, navigation, qualification/cart quantities, interest error/success, partnerships and automated axe WCAG A/AA checks on eight core pages. Mobile order and desktop developer screenshots visually reviewed. Automated accessibility checks are not a complete WCAG certification.

## Integration and release blockers

- Local `.env.local` has Resend settings but no Stripe/Airtable settings. Vercel preview lists Stripe and Airtable credentials; it does not list STRIPE_WEBHOOK_SECRET or NEXT_PUBLIC_POSTHOG_KEY. Presence is not proof of valid permissions. Real sandbox payment, deployed webhook delivery, Airtable reconciliation/intake and real interest persistence/email delivery are not yet end-to-end verified.
- Connected Stripe sandbox has an existing isolated webhook endpoint on another project. It is preserved. Do not copy its secret into this project or claim it delivers the new cart events here. Configure and verify a dedicated marketing-preview endpoint before enabling the new checkout.
- Confirm receiving/return operations, secure capture submission, insurance coverage, shipping-cost treatment when TopoStitch is at fault, detailed post-start cancellation calculations and tax treatment before production approval. Confirm Basic output formats and acceptance criteria operationally.
- Customer-capture paid fulfillment remains disabled until capture validation, operational delivery and approved pricing are verified.
- API abuse controls include same-origin JSON validation, body limits, honeypot rejection and runtime burst limiting. Distributed edge rate limiting, concurrent update behavior in Airtable, and email verification/double-opt-in should be reviewed before public marketing sends. No bulk marketing campaign was sent.
- Four pre-existing moderate dependency advisories remain in the shadcn/ts-morph/minimatch tool chain; no forced major change.

## Decisions without additional guidance

Use typed repository content instead of installing MDX; retain the current visual system; use approved amounts in new sandbox line-item price data rather than relabel old optimization Price IDs; migrate old checkout links to qualification; use a versioned payload in existing Airtable fields; conservatively label unverified software exploring. The founder's new five-product limit supersedes the historical 99-item quantity control for all new purchases; historical reconciliation logic remains preserved.

## Production prohibition

No production deployment. No live Stripe charge. No new unapproved pricing. Production release requires final founder approval of fulfillment policies, insurance, checkout and operational readiness. This preview is for review, not physical fulfillment.
