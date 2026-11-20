import styles from '@/app/commerce-validation.module.css'

export const shopifyCaseStudy = 'https://www.shopify.com/case-studies/rebecca-minkoff'
export const amazonGuide = 'https://m.media-amazon.com/images/G/01/imaging/3D/Getting_Started_With_3D_Content_on_Amazon_-_Spring_2024_WW.pdf'

const evidence = [
  { value: '44%', label: 'More likely to add to cart', detail: 'Rebecca Minkoff reported this difference between shoppers who interacted with a 3D model and those who did not.', source: 'Shopify · Rebecca Minkoff case study', href: shopifyCaseStudy },
  { value: '27%', label: 'More likely to place an order', detail: 'Rebecca Minkoff reported this difference among shoppers who interacted with a product in 3D versus those who did not.', source: 'Shopify · Rebecca Minkoff case study', href: shopifyCaseStudy },
  { value: '2×', label: 'Purchase conversion observed', detail: 'Amazon reported this average improvement in 2022 when shoppers clicked AR Virtual Try-On or View in 3D on enabled listings in US programs.', source: 'Amazon · 2024 selling partner guide, p. 2', href: amazonGuide },
  { value: '9%', label: 'Average sales improvement', detail: 'Amazon reported this average when View in Your Room was enabled on a product listing, in a 2023 US study.', source: 'Amazon · 2024 selling partner guide, p. 2', href: amazonGuide },
]

export default function CommerceProof() {
  return (
    <section id="why-3d" className={styles.commerceSection} aria-labelledby="proof-title">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Why test 3D?</p>
        <h2 id="proof-title">Give shoppers more to go on.</h2>
        <p>Interactive 3D lets people inspect details. AR can help them judge a product in their own space. Here is what established commerce businesses have reported.</p>
      </div>
      <div className={styles.proofGrid}>
        {evidence.map(item => (
          <article key={item.label} className={styles.proofCard}>
            <p className={styles.metric}>{item.value}</p>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
            <a href={item.href}>{item.source}</a>
          </article>
        ))}
      </div>
      <p className={styles.evidenceNote}>These are third-party reported results, not TopoStitch customer results or guaranteed improvements. Shoppers who choose to interact may already be more interested in buying. Results depend on the product, audience, traffic, and implementation. A pilot tests what happens in your store.</p>
    </section>
  )
}
