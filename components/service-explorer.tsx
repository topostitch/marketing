import Link from 'next/link';
import type { ServiceSlug } from '@/lib/service-pages';
import styles from './service-explorer.module.css';

const destinations: { slug: ServiceSlug; name: string; title: string; description: string; details: string; cta: string }[] = [
  { slug: 'amazon-3d-modeling', name: 'Amazon', title: 'Prepare for your product listing',
    description: 'Start with your ASIN, product references, or an existing model. We review suitability and scope the file preparation for your intended Amazon experience.',
    details: 'Product fit · Model preparation · File handoff', cta: 'Explore Amazon services' },
  { slug: 'shopify-3d-models', name: 'Shopify', title: 'Bring a closer look to your store',
    description: 'Create or optimize a model for your product page. We review your starting assets, theme support, and the files your team needs to publish.',
    details: 'Asset review · Product media · Theme considerations', cta: 'Explore Shopify services' },
  { slug: '3d-product-modeling', name: 'Other storefronts & teams', title: 'Build around the way you sell',
    description: 'Have another destination, a catalog, or an agency project in mind? Start with the product and workflow, then agree on the model and handoff requirements.',
    details: 'Model creation · Optimization · Workflow guidance', cta: 'Explore ecommerce services' },
];

export default function ServiceExplorer({ current, inset = false }: { current?: ServiceSlug; inset?: boolean }) {
  return <section className={`${styles.explorer} ${inset ? styles.inset : ''}`} aria-labelledby="explore-heading">
    <div className={styles.intro}>
      <p className={styles.eyebrow}>Find your destination</p>
      <h2 id="explore-heading">{current ? 'Selling somewhere else, too?' : 'Where will your product live?'}</h2>
      <p>{current ? 'A model may need different preparation for each storefront. Explore the other paths, and tell us if your scope needs to cover more than one.' : 'The destination shapes the work. Explore what to prepare, what we review, and how the finished model gets into your team’s hands.'}</p>
    </div>
    <div className={styles.destinations}>
      {destinations.filter(item => item.slug !== current).map(item => <article className={styles.destinationCard} key={item.slug}>
        <p className={styles.eyebrow}>{item.name}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p className={styles.details}>{item.details}</p>
        <Link href={`/services/${item.slug}`}>{item.cta}<span aria-hidden="true">↗</span></Link>
      </article>)}
    </div>
    <p className={styles.help}>Already know where you’re publishing? <Link href="/compare">Compare packages and deliverables <span aria-hidden="true">→</span></Link></p>
  </section>;
}

export function ProjectNextStep({ platform, inset = false }: { platform?: string; inset?: boolean }) {
  return <section id="early-access" className={`${styles.nextStep} ${inset ? styles.inset : ''}`} aria-labelledby="next-step-heading">
    <div className={styles.nextPanel}>
      <div className={styles.nextCopy}>
        <p className={styles.eyebrow}>Start with one product</p>
        <h2 id="next-step-heading">{platform ? `Let’s scope your ${platform} product.` : 'Give your product a clear next step.'}</h2>
        <p>Share what you have and what you want shoppers to see. We’ll review the fit and reply with a proposed scope, deliverables, and price.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href={`/request${platform ? `?platform=${encodeURIComponent(platform)}` : ''}`}>Request a product review <span aria-hidden="true">→</span></Link>
          <Link href="/compare">Compare services first</Link>
        </div>
        <p className={styles.reassurance}>No payment due to inquire. Scope agreed before work begins.</p>
      </div>
      <aside className={styles.checklist} aria-label="What to share">
        <h3>A useful starting point</h3>
        <p>You don’t need a finished brief. Start with:</p>
        <ul><li>A product or listing link</li><li>The photos, dimensions, or 3D files you already have</li><li>Where the model needs to work and what you need help with</li></ul>
      </aside>
    </div>
  </section>;
}
