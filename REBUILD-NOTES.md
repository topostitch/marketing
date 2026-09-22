# TopoStitch marketing scaffold — incubator-ready pass

This version is based on the v0-exported Next.js scaffold and intentionally prioritizes a truthful early-stage company story for an incubator application.

## Changes in this pass

- Clarified the homepage hero with a plain-language product category and workflow.
- Replaced dead CTA buttons with working internal links or direct email contact.
- Added a functional accessible mobile navigation menu.
- Added a skip-to-content link and main-content targets.
- Replaced fabricated enterprise security/compliance claims with transparent early-stage language.
- Removed invented uptime, latency, unlimited-record, SOC 2, HIPAA, ISO, RTO/RPO, immutable-ledger, and bug-bounty claims.
- Reframed platform capabilities around the actual TopoStitch product direction: capture, object/place records, spatial context, provenance, versions, search, and publishing.
- Replaced speculative named integrations with an honest interoperability roadmap.
- Replaced fictional Stories cards/case studies with clearly labeled use cases under exploration.
- Removed a nonfunctional story-category filter.
- Reworked Learn around concrete capture/preservation search questions and labeled unpublished material as planned.
- Replaced fake-success email/forms with a working email-based pilot contact path.
- Improved root metadata/Open Graph copy and page-specific descriptions.
- Simplified the footer to only working destinations.

## Intentionally not finished yet

- Real photography, 3D embeds, and published-object examples still need to replace remaining visual placeholders.
- The contact path currently opens email; connect Resend/Supabase once the application is submitted.
- Privacy/terms/accessibility pages are not included in this fast pass.
- Real case studies should replace use-case placeholders as pilots are completed.
- A formal accessibility audit and performance pass should be completed before a broad public launch.

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Deployment

Import the project into Vercel, set `topostitch.dev` as the production domain, and deploy. No environment variables are required for this current static marketing pass.
