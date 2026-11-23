import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { paymentLink, paymentOffers, type PaymentOffer } from '@/lib/payments';
import styles from '../../commerce-validation.module.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Secure payment', robots: { index: false, follow: false } };
export default async function CheckoutPage({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params;
  if (!Object.hasOwn(paymentOffers, offer)) notFound();
  const selected = offer as PaymentOffer;
  const link = paymentLink(selected);
  return <main id="main-content" className={`${styles.page} ${styles.servicePage}`}>
    <Link href="/">TopoStitch home</Link>
    <h1>{paymentOffers[selected].name}</h1>
    {link ? <><p>Continue to Stripe to review the exact package description, price, and payment details before purchasing. Any eligibility conditions, deliverables, revisions, and timing must match the package you are purchasing.</p><a className={styles.formButton} href={link}>Continue to secure checkout</a><p>Physical shipping, travel, and custom work are included only when explicitly stated in your purchased scope. A payment does not guarantee platform approval or publication.</p></> : <><p>We review your product and confirm the scope before taking payment. For an approved order, use the Stripe link included with your quote.</p><Link href={`/request?offer=${selected}`}>Request a product review</Link></>}
    <p><Link href="/privacy">Privacy notice</Link> · <a href="mailto:hello@topostitch.dev">Questions about an order?</a></p>
  </main>;
}
