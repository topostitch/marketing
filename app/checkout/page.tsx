import type { Metadata } from 'next';
import Link from 'next/link';
import { commerceOffers } from '@/lib/commerce-offers';
import styles from '../marketing-layout.module.css';

export const metadata: Metadata = { title: 'Choose a 3D package', robots: { index: false, follow: true } };
export default function PackagesPage() {
  return <main id="main-content" className={styles.page}>
    <header className={styles.salesIntro}><h1>Choose a 3D package</h1>
      <p>Start with the files you have or get a new product model made. Choose your quantity, then confirm the scope with us.</p>
    </header>
    <section className={styles.section} aria-label="3D packages">
      <div className={`${styles.grid} ${styles.two}`}>
        {commerceOffers.slice(0, 2).map(offer => <article key={offer.id} className={styles.card}>
          <h2>{offer.name}</h2><p><strong>{offer.price}</strong></p><p>{offer.summary}</p>
          <ul>{offer.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
          <Link className={styles.button} href={`/checkout/${offer.id}`}>Choose {offer.name}</Link>
        </article>)}
      </div>
      <p className={styles.note}>Prices are in USD. Final scope is reviewed before payment. Need a custom scope? <Link href="/compare">Compare all services</Link>.</p>
    </section>
  </main>;
}
