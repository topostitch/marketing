import type { Metadata } from 'next';
import Link from 'next/link';
import { commerceOffers } from '@/lib/commerce-offers';
import styles from '../marketing-layout.module.css';

export const metadata: Metadata = {
  title: '3D model packages and pricing',
  description: 'Choose a Basic existing-model preparation package or E-commerce Ready product model creation package, with clear per-product pricing.',
  alternates: { canonical: '/checkout' },
};
export default function PackagesPage() {
  return <main id="main-content" className={styles.page}>
    <header className={styles.salesIntro}><h1>Choose a 3D package</h1>
      <p>Choose the package and quantity that fit your product. Pay securely through Stripe, then share the files and details we need to begin.</p>
    </header>
    <section className={styles.section} aria-label="3D packages">
      <div className={`${styles.grid} ${styles.two}`}>
        {commerceOffers.slice(0, 2).map(offer => <article key={offer.id} className={styles.card}>
          <h2>{offer.name}</h2><p><strong>{offer.price}</strong></p><p>{offer.summary}</p>
          <ul>{offer.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
          <Link className={styles.button} href={`/checkout/${offer.id}`}>Choose {offer.name}</Link>
        </article>)}
      </div>
      <p className={styles.note}>Prices are in USD per product. These fixed-scope packages are available for direct purchase. For capture, complex modeling, variants, or storefront implementation, <Link href="/request?offer=custom">request a custom quote</Link> or <Link href="/compare">compare all services</Link>.</p>
    </section>
  </main>;
}
