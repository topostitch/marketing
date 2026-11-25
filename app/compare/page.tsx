import type { Metadata } from 'next';
import Link from 'next/link';
import { commerceOffers } from '@/lib/commerce-offers';
import styles from '../marketing-layout.module.css';

export const metadata: Metadata = {
  title: 'Compare 3D services and pricing', description: 'Compare TopoStitch Basic and E-commerce Ready packages, plus workflow consulting and agency integration support.',
  alternates: { canonical: '/compare' },
};
export default function ComparePage() {
  return <main id="main-content" className={styles.page}>
    <header className={styles.salesIntro}><h1>Find the right starting point</h1>
      <p>Compare prices, inputs, and deliverables for your product or team.</p>
      <Link href="/services">Explore the services in detail</Link>
    </header>
    <section className={styles.section} aria-label="Compare services">
      <div className={`${styles.grid} ${styles.compareGrid}`}>
        {commerceOffers.map(offer => <article key={offer.id} className={`${styles.card} ${styles.compareCard}`}>
          <p className={styles.salesLabel}>{offer.service}</p><h2>{offer.name}</h2>
          <p className={styles.price}>{offer.price}</p><p>{offer.summary}</p>
          <ul>{offer.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
          <Link className={styles.button} href={offer.id === 'basic' || offer.id === 'ecommerce' ? `/checkout/${offer.id}` : `/request?offer=${offer.id}`}>
            {offer.id === 'basic' || offer.id === 'ecommerce' ? `Choose ${offer.name}` : offer.cta}
          </Link>
        </article>)}
      </div>
      <p className={styles.note}>Prices are in USD per product for the fixed-scope packages. Basic and E-commerce Ready can be purchased directly; non-standard products, capture, shipping, complex modeling, variants, and storefront implementation require a custom quote.</p>
    </section>
    <section className={styles.section}><div className={styles.action}>
      <h2>Not sure which service fits?</h2><p>Share what you have and where your product needs to work. We’ll review the starting point with you.</p>
      <Link className={styles.button} href="/request">Request a project review</Link>
    </div></section>
  </main>;
}
