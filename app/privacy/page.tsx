import type { Metadata } from "next";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How TopoStitch handles project inquiries, package checkout, payment records, and website analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className={styles.page}>
      <article className={styles.editorial}>
        <header className={styles.editorialHeader}>
          <h1>Privacy notice</h1>
          <p>
            Updated <time dateTime="2026-11-26">November 26, 2026</time>
          </p>
          <nav aria-label="In this notice">
            <a href="#inquiries">Inquiries</a>
            <a href="#data-handling">Data handling</a>
            <a href="#analytics">Analytics and updates</a>
            <a href="#choices">Your choices</a>
            <a href="#external-links">External links</a>
          </nav>
        </header>
        <section id="inquiries">
          <h2>Project inquiries</h2>
          <p>
            TopoStitch LLC uses the name, email address, company, store link,
            project details, and preferences you submit to respond to your
            request, assess your project, and prepare a proposal. For a direct
            purchase, Stripe collects the information needed to take payment and
            send a receipt. Please do not submit sensitive personal information
            or confidential files through project forms.
          </p>
        </section>
        <section id="data-handling">
          <h2>How information is handled</h2>
          <p>
            The website is hosted by Vercel. Inquiry details are saved in
            TopoStitch’s Airtable customer and inquiry records. Email
            notifications are handled through Resend. Fixed-scope package
            payments are collected through Stripe-hosted checkout. Stripe
            processes card details and may send a receipt; TopoStitch receives
            the contact, package, quantity, and payment status needed to record
            the order and follow up about project intake. Campaign labels
            included in the page URL may be attached to your inquiry to help us
            understand how you found us. We do not include your name, email,
            store URL, or message in our custom analytics events.
          </p>
        </section>
        <section id="analytics">
          <h2>Analytics and updates</h2>
          <p>
            We use Vercel Web Analytics to understand website visits. If
            configured for this site, PostHog receives anonymous events about
            article views and reading, service-link clicks, and completed
            partnership inquiries. Those events contain the page path and
            content or partner category, not names, email addresses, project
            messages, store URLs, or form values. PostHog processes them without
            creating person profiles. Event and session identifiers stay in
            memory for the current browser session; automatic interaction
            capture and session recording are not enabled. Requesting project
            help does not subscribe you to marketing. The separate updates form
            records your consent to receive pilot openings, product 3D examples,
            and service news. To stop receiving updates, email us at the address
            below.
          </p>
        </section>
        <section id="choices">
          <h2>Your choices</h2>
          <p>
            To ask about the information you submitted, request a correction or
            deletion, or stop updates, email{" "}
            <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>. We
            retain inquiry correspondence while handling your request and
            related business follow-up. Order and payment records may be
            retained for accounting and business operations.
          </p>
        </section>
        <section id="external-links">
          <h2>External links</h2>
          <p>
            Linked case studies and platform guides are operated by their
            respective publishers and have their own privacy practices.
          </p>
        </section>
        <section>
          <h2>Product interests and consent</h2>
          <p>
            Interest registration stores your email, optional organization,
            selected interests, acquisition source, consent timestamp and
            version, and unsubscribe status in Airtable. Resend may send
            confirmation and updates. Marketing consent is separate from
            transactional order communications. You can unsubscribe using the
            link in an update or contact hello@topostitch.dev. We retain this
            record to manage your choices and honor suppression requests.
          </p>
          <p>
            Our PostHog events exclude names, emails, form contents, query
            strings, payment references and order intake. We use temporary
            anonymous identifiers, disable person profiles, and honor supported
            Do Not Track and Global Privacy Control signals. Order details are
            used for fulfillment, not analytics.
          </p>
        </section>
      </article>
    </main>
  );
}
