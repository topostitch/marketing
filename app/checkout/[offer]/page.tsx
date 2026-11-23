import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { commerceOffers } from '@/lib/commerce-offers';
import { paymentLink, paymentOffers, type PaymentOffer } from '@/lib/payments';
import styles from '../../marketing-layout.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Secure payment', robots: { index: false, follow: false } };

export default async function CheckoutPage({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params;
  if (!Object.hasOwn(paymentOffers, offer)) notFound();
  const selected = offer as PaymentOffer;
  const [basic, ecommerce] = commerceOffers;
  const packageDetails = selected === 'basic' ? basic : ecommerce;
  const link = paymentLink(selected);

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.editorial}>
        <header className={styles.editorialHeader}>
          <Link href="/services#compare">Back to all services</Link>
          <h1>{packageDetails.name}</h1>
          <p>{packageDetails.summary}</p>
        </header>
        <div className={styles.card}>
          {link ? <>
            <p><strong>{paymentOffers[selected].price} for one product</strong></p>
            <p>{selected === 'basic'
              ? 'For a single existing 3D model that needs optimization or conversion for one storefront.'
              : 'For one product with suitable reference photos and dimensions. Physical capture and shipping are quoted separately.'}</p>
            <p>Enter your email and pay on Stripe. We’ll use that email to request your files and project details after payment.</p>
            <a className={styles.button} href={link}>Continue to Stripe</a>
            <Link href={`/request?offer=${selected}`}>Check whether your project fits</Link>
          </> : <>
            <p>Tell us about your product so we can confirm fit and send you a payment link.</p>
            <Link className={styles.button} href={`/request?offer=${selected}`}>Request a product review</Link>
          </>}
        </div>
      </div>
    </main>
  );
}
