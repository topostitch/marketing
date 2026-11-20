import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../commerce-validation.module.css'

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How TopoStitch uses details submitted through its project inquiry form.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return <main id="main-content" className={styles.page}>
    <div className={styles.commerceSection}>
      <Link href="/">TopoStitch home</Link>
      <h1>Privacy notice</h1>
      <p>Updated November 20, 2026.</p>
      <h2>Project inquiries</h2>
      <p>TopoStitch LLC uses the name, email address, company, store link, project details, and preferences you submit to respond to your request, assess your project, and prepare a proposal. Please do not submit payment information, sensitive personal information, or confidential files.</p>
      <h2>How information is handled</h2>
      <p>The website is hosted by Vercel. Inquiry details are saved in TopoStitch’s Airtable customer and inquiry records. Email notifications are handled through Resend. Campaign labels included in the page URL may be attached to your inquiry to help us understand how you found us. We do not include your name, email, store URL, or message in our custom analytics events.</p>
      <h2>Analytics and updates</h2>
      <p>We use Vercel Web Analytics to understand website visits and interactions with the inquiry form. Requesting project help does not subscribe you to marketing. Selecting future platform updates asks us to contact you about that launch; you can ask us to stop at any time.</p>
      <h2>Your choices</h2>
      <p>To ask about the information you submitted, request a correction or deletion, or stop updates, email <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>. We retain inquiry correspondence while handling your request and related business follow-up. Accepted projects and payment records may need to be retained separately.</p>
      <h2>External links</h2>
      <p>Linked case studies and platform guides are operated by their respective publishers and have their own privacy practices.</p>
    </div>
  </main>
}
