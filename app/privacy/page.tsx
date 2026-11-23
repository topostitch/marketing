import type { Metadata } from 'next'
import styles from '../marketing-layout.module.css'

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How TopoStitch uses details submitted through its project inquiry form.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return <main id="main-content" className={styles.page}>
    <article className={styles.editorial}>
      <header className={styles.editorialHeader}>
        <h1>Privacy notice</h1>
        <p>Updated <time dateTime="2026-11-20">November 20, 2026</time></p>
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
        <p>TopoStitch LLC uses the name, email address, company, store link, project details, and preferences you submit to respond to your request, assess your project, and prepare a proposal. Please do not submit payment information, sensitive personal information, or confidential files.</p>
      </section>
      <section id="data-handling">
        <h2>How information is handled</h2>
        <p>The website is hosted by Vercel. Inquiry details are saved in TopoStitch’s Airtable customer and inquiry records. Email notifications are handled through Resend. Approved pilot payments are collected through Stripe-hosted checkout. Stripe processes card details, and TopoStitch uses the resulting payment status and order reference to reconcile the approved order. Campaign labels included in the page URL may be attached to your inquiry to help us understand how you found us. We do not include your name, email, store URL, or message in our custom analytics events.</p>
      </section>
      <section id="analytics">
        <h2>Analytics and updates</h2>
        <p>We use Vercel Web Analytics to understand website visits and interactions with the inquiry form. Requesting project help does not subscribe you to marketing. The separate updates form records your consent to receive pilot openings, product 3D examples, and service news. To stop receiving updates, email us at the address below.</p>
      </section>
      <section id="choices">
        <h2>Your choices</h2>
        <p>To ask about the information you submitted, request a correction or deletion, or stop updates, email <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>. We retain inquiry correspondence while handling your request and related business follow-up. Accepted projects and payment records may need to be retained separately.</p>
      </section>
      <section id="external-links">
        <h2>External links</h2>
        <p>Linked case studies and platform guides are operated by their respective publishers and have their own privacy practices.</p>
      </section>
    </article>
  </main>
}
