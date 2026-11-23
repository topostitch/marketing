import type { Metadata } from 'next';
import Link from 'next/link';
import { commerceOffers } from '@/lib/commerce-offers';
import { paymentLink, paymentOffers, sandboxCheckoutLink } from '@/lib/payments';
import styles from '../marketing-layout.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Choose a 3D package', robots: { index: false, follow: true } };

export default function PackagesPage() {
  const packages = commerceOffers.flatMap(offer => {
    if (offer.id !== 'basic' && offer.id !== 'ecommerce') return [];
    const sandbox = Boolean(sandboxCheckoutLink(offer.id));
    return [{ ...offer, available: !sandbox && Boolean(paymentLink(offer.id)), sandbox }];
  });
  const sandbox = packages.some(offer => offer.sandbox);
  const available = packages.some(offer => offer.available);

  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.salesIntro}>
        <h1>Choose a 3D package</h1>
        {sandbox && <p><strong>Stripe sandbox.</strong> Choose a package to try checkout with a test card.</p>}
        {available && <p>Choose a package and pay securely through Stripe.</p>}
        {!sandbox && !available && <p>Choose a package to request a review and confirm scope.</p>}
      </header>
      <section className={styles.section} aria-label="3D packages">
        <div className={`${styles.grid} ${styles.two}`}>
          {packages.map(offer => (
            <article key={offer.id} className={styles.card}>
              <h2>{offer.name}</h2>
              <p><strong>{offer.available || offer.sandbox ? `${paymentOffers[offer.id].price} per product` : offer.price}</strong></p>
              <p>{offer.summary}</p>
              <Link className={styles.button} href={offer.available || offer.sandbox ? `/checkout/${offer.id}` : `/request?offer=${offer.id}`}>
                {offer.available ? `Buy ${offer.name}` : offer.sandbox ? `Test checkout · ${offer.name}` : offer.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.note}>Need a custom scope? <Link href="/services#compare">Compare all services</Link>.</p>
      </section>
    </main>
  );
}
