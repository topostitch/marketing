import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { commerceOffers } from '@/lib/commerce-offers';
import { paymentLink, paymentOffers, sandboxCheckoutLink, type PaymentOffer } from '@/lib/payments';
import styles from '../../marketing-layout.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Secure payment', robots: { index: false, follow: false } };

export default async function CheckoutPage({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params;
  if (!Object.hasOwn(paymentOffers, offer)) notFound();
  const selected = offer as PaymentOffer;
  const [basic, ecommerce] = commerceOffers;
  const packageDetails = selected === 'basic' ? basic : ecommerce;
  const sandboxLink = sandboxCheckoutLink(selected);
  const link = sandboxLink ? null : paymentLink(selected);

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.editorial}>
        <header className={styles.editorialHeader}>
          <Link href="/checkout">Back to packages</Link>
          <h1>{packageDetails.name}</h1>
          <p>{packageDetails.summary}</p>
        </header>
        <div className={styles.card}>
          {link || sandboxLink ? <>
            <p><strong>{paymentOffers[selected].price} for one product</strong></p>
            <p>{selected === 'basic'
              ? 'For a single existing 3D model that needs optimization or conversion for one storefront.'
              : 'For one product with suitable reference photos and dimensions. Physical capture and shipping are quoted separately.'}</p>
            {sandboxLink ? <>
              <p><strong>Stripe sandbox.</strong> Use a test card to reach Stripe’s payment confirmation. This walkthrough creates no fulfillment order.</p>
              <p>Test card <strong>4242 4242 4242 4242</strong> · any future expiry · any three-digit CVC</p>
              <a className={styles.button} href={sandboxLink}>Continue to Stripe test checkout</a>
            </> : <>
              <p>Enter your email and pay on Stripe. We’ll use that email to request your files and project details after payment.</p>
              {link && <a className={styles.button} href={link}>Continue to Stripe</a>}
            </>}
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
