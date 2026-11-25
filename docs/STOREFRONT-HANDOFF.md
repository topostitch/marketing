# Storefront development handoff — 2026-11-24

## Git reconciliation

The existing marketing-stripe worktree on stripe-pilot-quantity started clean at 418aaea.
The site worktree on commerce-validation contained a header formatting/width edit and public/hero_graphic-og.png.
Those original working files are left intact; a separate preservation commit captures both.
All four local branches and both registered worktrees were inspected. Main and staging remain unchanged.
Fetched GitHub refs and fast-forwarded the clean implementation to 88c6ed6 (codex/approved-order-payment), which contains the latest developed storefront and approved-order payment safeguards.
Reviewed 816d58c (codex/storefront-pages): its single new Services page was based on 418aaea and would conflict with the richer services implementation. Preserved the newer copy, assets, shared navigation and footer; adapted destination links and implemented its missing /compare destination instead of replacing the page.

## Current behavior

- Approved starting prices remain Basic $149/product and E-commerce Ready $299/product. Existing package descriptions and deliverables remain the source of truth.
- Package cards lead to scope review, quantities 1–99, estimated USD totals, refresh-safe quantity URLs, and a request form prefilled with the selected service and quantity.
- Multi-product checkout is deliberately unavailable until Stripe quantity/amount matching is implemented and verified. Existing test Payment Links are single-product walkthroughs only; the quantity control cannot silently send a larger selection to a one-product payment.
- Only Stripe test links are exposed; live keys, live links and production environments are rejected by storefront payment gates. Existing signature, paid-state, approved-order, amount, email and duplicate-event checks remain in place.
- No Airtable configuration, reconciliation, email delivery, real payments, or production deployment was performed. Airtable work is deferred to November 25 as requested.
- Services, Compare, Packages and the shared navigation/footer use the existing cream/ink branding. Responsive navigation includes current-page indication, Escape focus restoration, close-on-click, and close-on-breakpoint-change.
- Sitemap includes Compare and no longer advertises redirected legacy pages.

## Validation commands

`npm test` — mocked inquiry/payment paths and strict quantity/total checks; no external writes.
`npm run build` — Next.js production build with TypeScript validation; no deployment.
`npm run test:responsive` — Chromium at 320/390/768/1280px; route health, images, overflow, quantity boundaries/totals/reload/request handoff, sandbox link gating and mobile keyboard/resize behavior. External browser requests are blocked; test checkout links are fake fixtures and never followed.

## Next integration work

Verify sandbox Payment Link line items and quantities or introduce server-created sandbox Checkout Sessions before enabling multi-product payment. Keep prices and final approved scope authoritative on the server. Do not infer payment from browser navigation. Resume Airtable configuration/reconciliation only on the deferred date and test against isolated sandbox records.

## Completed validation

Next.js 16.4.6 production build and all mocked regression checks passed. All six Playwright tests passed, covering eight routes at four widths plus quantity handoff and navigation. Mobile and desktop Compare/checkout screenshots were visually inspected. npm audit was reduced from 18 findings (including one critical) to four moderate findings in the shadcn/ts-morph/minimatch tooling chain; no forced major upgrade was applied. Screenshots remain in ignored test-results directories.
