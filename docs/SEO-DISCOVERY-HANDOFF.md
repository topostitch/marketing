# SEO, GEO and AEO implementation

## Scope

Changes made in the existing `apps/marketing` worktree on `codex/site-storefront-20261125`. Preserve approved hero, founder story, ownership identity, pricing and sandbox payment restrictions. No production deployment or paid SEO service.

## Technical changes

- `lib/seo.ts`: shared canonical URLs, page-specific title/description/Open Graph/Twitter metadata, safe JSON-LD serialization, stable Organization/WebSite/founder IDs and environment-specific indexing. Public pages are indexable only in an explicitly production Vercel build. Local and preview builds default to noindex.
- `app/layout.tsx`: current service positioning replaces stale metadata; optional GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION values can be supplied through environment configuration. No verification token invented or exposed.
- Public landing pages, Services detail pages, Insights and Learn articles have matching canonical/social URLs and unique metadata. Shared social artwork retained; no stock founder image or invented profile added.
- AboutPage and Person schema connect Jacob Galito with TopoStitch and the visible founder story. No certifications, awards, affiliations or sameAs profiles invented.
- Visible breadcrumbs and matching structured data added where absent; service details now include their Services parent. Organization data is no longer redundantly redefined on the homepage. Existing Article and FAQ markup retained with safe serialization. Markup is not a promise of rich-result eligibility.
- `app/robots.ts`: production wildcard permits search crawlers including Googlebot, Bingbot and OAI-SearchBot, except APIs. Preview blocks crawling. No separate AI-training policy change made.
- `next.config.mjs`: preview-wide HTTP X-Robots-Tag noindex; transactional routes remain noindex even in production. Existing authentication protection stays enabled. `/platform` redirects to `/developers`; `/stories` to `/insights`.
- Sitemap includes 27 canonical public pages; excludes transactional routes, redirects and error pages. Content modification dates come from editorial records rather than build time. Cost article date reflects its November 27 scope amendment.
- Optional `/llms.txt` is a generated navigation index sharing content data with the site, not a claimed ranking requirement. It explicitly distinguishes service offerings, sandbox preview, inquiry-only captures and unavailable future software.
- Services includes concise, visible answers about production, starting prices, customer captures and turnaround, reusing approved offer/policy configuration.
- Native Next.js responsive image optimization enabled with WebP and bounded quality configuration; no added dependency. Original image files and design retained.

## Validation

- Build/TypeScript, lint and existing mocked commercial regression suites.
- SEO unit checks: production versus preview/local rules, explicit noindex, canonical/social consistency and malicious-text JSON-LD round trip.
- Raw-HTML crawler pass over all 27 sitemap URLs using an OAI-SearchBot user agent, without executing page JavaScript: successful responses, one h1, unique titles/descriptions, matching canonical/social URLs, parseable schema and no Product/SoftwareApplication markup for future capabilities. Internal page links also checked.
- Preview robots and HTTP noindex, optional text index, old URL redirects, unknown-guide 404 and image endpoint checks.
- Responsive QA at 320/390/768/1280 pixels; automated axe checks include About and Learn as well as core commercial pages.
- The 640px WebP hero response measured 35,512 bytes versus the 198,344-byte original: approximately 82% smaller for that variant. This is a local transfer-size measurement, not a field Core Web Vitals score.

## Remaining external validation

Production remains unchanged and these preview pages are intentionally not discoverable by public search indexing. After the founder authorizes a production release:

1. Verify the production domain in Google Search Console and Bing Webmaster Tools using owner access or the supported verification environment values; submit `https://www.topostitch.dev/sitemap.xml`. No connected search-console tool or verification values were available for this task. Submission/ownership/indexing has not been claimed.
2. Inspect live production robots, HTTP headers and rendered metadata with the services' URL inspection tools; confirm Googlebot, Bingbot and published OAI-SearchBot IP ranges are not challenged by the CDN/WAF. A simulated user agent does not prove access from those real crawler networks.
3. Validate representative URLs using Google's Rich Results Test and Schema.org validator. JSON parse/entity checks have run locally; those external validators have not certified the site.
4. Measure PageSpeed/CrUX and Search Console Core Web Vitals with production traffic. No field LCP, INP or CLS result is asserted.
5. Track search queries, impressions, indexed pages and relevant referral/conversion patterns. Search inclusion, ranking, AI citations and rich results are not guaranteed.

No production indexing request, verification-account change, robots access-policy relaxation or live payment configuration was made.

## Primary guidance reviewed

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- OpenAI search crawler controls: https://developers.openai.com/api/docs/bots
- Next.js image optimization: https://nextjs.org/docs/app/api-reference/components/image

Google says conventional SEO and accessible text remain foundational for AI features; no special AI text file or schema is required. The optional plain-text index supplements ordinary HTML and internal links. OpenAI distinguishes search access from training permissions; the existing wildcard permissions are preserved for production.
