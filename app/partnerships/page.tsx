import type { Metadata } from 'next'
import Link from 'next/link'
import PartnershipInquiryForm from '@/components/partnership-inquiry-form'
import TrackedLink from '@/components/insights/tracked-link'
import styles from '@/app/marketing-layout.module.css'

export const metadata: Metadata = {
  title: '3D Production Partnerships for Agencies and Developers',
  description: 'Explore white-label 3D production, catalog digitization, asset optimization, and project collaboration with TopoStitch.',
  alternates: { canonical: '/partnerships' },
  openGraph: { title: 'TopoStitch Partnerships', description: '3D production support for agencies, developers, manufacturers, and 3D providers.', url: 'https://www.topostitch.dev/partnerships', type: 'website' },
}

const partnershipTypes = [
  { id: 'agencies', title: 'Agencies and studios', text: 'Explore specialist production support for client work when 3D is needed but the work is not part of your in-house team.' },
  { id: 'developers', title: 'Developers and integrators', text: 'Discuss asset preparation, storefront constraints, technical handoff, or a production workflow that fits your implementation.' },
  { id: 'manufacturers', title: 'Brands and manufacturers', text: 'Review a product or small catalog, existing CAD and model files, and the path from a source asset to a customer-facing deliverable.' },
  { id: 'providers', title: '3D production providers', text: 'Coordinate on project scopes where complementary capture, modeling, optimization, or implementation skills may help.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': 'https://www.topostitch.dev/partnerships#page', name: 'TopoStitch Partnerships', url: 'https://www.topostitch.dev/partnerships', description: 'Explore project-based 3D production support for agencies, developers, manufacturers, and providers.', isPartOf: { '@id': 'https://www.topostitch.dev/#website' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.topostitch.dev' }, { '@type': 'ListItem', position: 2, name: 'Partnerships', item: 'https://www.topostitch.dev/partnerships' }] },
  ],
}

export default function PartnershipsPage() {
  return <main id="main-content" className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className={styles.salesIntro} aria-labelledby="partnerships-title">
      <p className={styles.salesLabel}>TOPOSTITCH PARTNER SOLUTIONS</p>
      <h1 id="partnerships-title">Expand your capabilities. Not your overhead.</h1>
      <p>Bring product 3D into client and catalog projects with focused production support. Start with a defined scope and agree on responsibilities before work begins.</p>
      <TrackedLink className={styles.button} href="#inquiry" eventLabel="partnerships:hero">Discuss a partnership</TrackedLink>
      <p className={styles.note}>TopoStitch is an independent production service. This page does not claim retailer approval, an existing retailer partnership, or guaranteed capacity.</p>
    </section>
    <section className={styles.section} aria-labelledby="partnership-types-title">
      <div className={styles.sectionIntro}><h2 id="partnership-types-title">Ways we may work together</h2><p>Partnership work is scoped project by project. We confirm fit, deliverables, terms, and timing before accepting production.</p></div>
      <div className={`${styles.grid} ${styles.two}`}>
        {partnershipTypes.map(item => <article className={styles.card} key={item.id}><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>
    </section>
    <section className={styles.section} aria-labelledby="working-model-title">
      <div className={styles.sectionIntro}><h2 id="working-model-title">Start with one useful test</h2><p>A small pilot makes it easier to uncover production and handoff needs before expanding a catalog or committing to a larger client scope.</p></div>
      <ol className={`${styles.grid} ${styles.stepList}`}>
        <li><h3>Describe the work</h3><p>Share the product type, source material, target experience, and your role in the project.</p></li>
        <li><h3>Agree on boundaries</h3><p>Define deliverables, ownership, reviews, responsibilities, and what is outside the scope.</p></li>
        <li><h3>Review a pilot</h3><p>Evaluate one representative product or asset before deciding whether the workflow is suitable for more.</p></li>
      </ol>
      <p className={styles.note}>Fixed-price Basic starts at $149 and E-commerce Ready starts at $299 per product. Catalog programs, white-label arrangements, custom production, and integration work are quoted separately. <Link href="/compare">See package details</Link>.</p>
    </section>
    <section className={styles.section} aria-labelledby="partnership-inquiry-title">
      <div className={styles.sectionIntro}><h2 id="partnership-inquiry-title">Tell us what you’re exploring</h2><p>We’ll review the request and follow up by email. This form is for responding to your inquiry and does not enroll you in marketing updates.</p></div>
      <PartnershipInquiryForm />
    </section>
  </main>
}
