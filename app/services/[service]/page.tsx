import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicePages, type ServiceSlug } from '@/lib/service-pages';
import styles from '../../commerce-validation.module.css';

type Props = { params: Promise<{ service: string }> };
function findService(slug: string) { return Object.hasOwn(servicePages, slug) ? servicePages[slug as ServiceSlug] : undefined; }
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(servicePages).map(service => ({ service })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const data = findService(service);
  if (!data) return {};
  return { title: data.title, description: data.description, alternates: { canonical: `/services/${service}` }, openGraph: { title: data.title, description: data.description, url: `/services/${service}` }, twitter: { card: 'summary_large_image', title: data.title, description: data.description } };
}
export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const data = findService(service);
  if (!data) notFound();
  const url = `https://www.topostitch.dev/services/${service}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: data.title, description: data.description, url, provider: { '@type': 'Organization', name: 'TopoStitch', url: 'https://www.topostitch.dev' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.topostitch.dev' }, { '@type': 'ListItem', position: 2, name: data.title, item: url }] },
  ] };
  return <main id="main-content" className={`${styles.page} ${styles.servicePage}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">{data.title}</span></nav>
    <section className={styles.commerceSection}><p className={styles.kicker}>Independent ecommerce 3D services</p><h1>{data.title}</h1><p>{data.intro}</p><a className={styles.formButton} href={`/request${data.platform ? `?platform=${encodeURIComponent(data.platform)}` : ""}`}>Request a product pilot</a><p>Scope reviewed before payment. No checkout required to inquire.</p></section>
    {data.sections.map(([title, body]) => <section className={styles.commerceSection} key={title}><h2>{title}</h2><p>{body}</p></section>)}
    <section className={styles.commerceSection}><h2>Start with a clear scope and price</h2><p>Existing-model preparation starts at $149 per product. E-commerce Ready product model creation starts at $299 per eligible product. Ask about Ship-to-3D if you need capture. These are pilot starting prices; final scope, deliverables, revisions, and price are agreed before payment. Consulting and custom work require a quote.</p><Link href="/#studio">Compare pilot options</Link></section>
    <section className={styles.commerceSection}><h2>Frequently asked questions</h2>{data.questions.map(([q, a]) => <details key={q} className={styles.serviceFaq}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <section className={styles.commerceSection}><h2>Platform guidance and evidence</h2><ul>{data.sources.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul><p>Platform requirements can change. We review applicable requirements when scoping your project.</p></section>
    <section id="early-access" className={styles.commerceSection}><h2>Tell us about your {data.platform ? `${data.platform} product` : 'product'}</h2><p>Share your starting point and intended outcome. We will review suitability and reply with a next step.</p><Link href={`/request${data.platform ? `?platform=${encodeURIComponent(data.platform)}` : ""}`}>Request a product review</Link></section>
    <nav aria-label="Related services" className={styles.commerceSection}><h2>Explore 3D services</h2><ul>{Object.entries(servicePages).filter(([slug]) => slug !== service).map(([slug, page]) => <li key={slug}><Link href={`/services/${slug}`}>{page.title}</Link></li>)}</ul></nav>
    <footer className={styles.commerceSection}><Link href="/about">About TopoStitch</Link> · <Link href="/privacy">Privacy</Link> · <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a></footer>
  </main>;
}
