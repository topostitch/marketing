import type { Metadata } from 'next';
import Link from 'next/link';
import { servicePages } from '@/lib/service-pages';
import styles from '../commerce-validation.module.css';

export const metadata: Metadata = {
  title: '3D Commerce Services',
  description: 'Explore product digitization, ecommerce-ready 3D assets, specialized production and interactive experiences.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return <main id="main-content" className={`${styles.page} ${styles.servicePage}`}>
    <header className={styles.header}><Link href="/" className={styles.brand}>TopoStitch</Link><Link href="/compare">Compare options</Link></header>
    <section className={styles.commerceSection}>
      <p className={styles.kicker}>3D commerce services</p>
      <h1>Your products deserve more than pictures.</h1>
      <p>Choose the right level of support for your product, storefront or client project.</p>
    </section>
    <section className={styles.commerceSection}>
      <h2>Product asset services</h2>
      <div className={styles.pricingGrid}>
        <article className={styles.pathCard}><h3>Basic</h3><p className={styles.price}>From $149</p><p>Start with a standard product digitization or asset preparation project. Confirm eligibility and deliverables before ordering.</p><Link href="/checkout/basic">Explore Basic</Link></article>
        <article className={styles.pathCard}><h3>E-commerce Ready</h3><p className={styles.price}>From $299</p><p>Prepare a product model for an agreed commerce destination, with optimization and quality review.</p><Link href="/checkout/ecommerce">Explore E-commerce Ready</Link></article>
        <article className={styles.pathCard}><h3>Specialized production</h3><p>Custom quote</p><p>Complex materials, precision requirements, larger products and specialized capture.</p><Link href="/?offer=custom#early-access">Discuss your product</Link></article>
        <article className={styles.pathCard}><h3>Interactive experiences and integration</h3><p>Project quote</p><p>Configurators, publishing workflows, agency support and custom interactive experiences.</p><Link href="/?offer=custom#early-access">Discuss your project</Link></article>
      </div>
      <p>Starting prices are in USD. Shipping, handling, revisions and integration are included only when specified in the purchased scope.</p>
    </section>
    <section className={styles.commerceSection}><h2>Explore by destination</h2><ul>{Object.entries(servicePages).map(([slug, service]) => <li key={slug}><Link href={`/services/${slug}`}>{service.title}</Link></li>)}</ul></section>
    <footer className={styles.commerceSection}><Link href="/">Home</Link> · <Link href="/about">About</Link> · <Link href="/privacy">Privacy</Link></footer>
  </main>;
}
