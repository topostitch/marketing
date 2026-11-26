import styles from '@/app/marketing-layout.module.css'

export const shopifyCaseStudy = 'https://www.shopify.com/case-studies/rebecca-minkoff'
export const amazonGuide = 'https://m.media-amazon.com/images/G/01/imaging/3D/Getting_Started_With_3D_Content_on_Amazon_-_Spring_2024_WW.pdf'
const evidence = [
  { value: '10×', label: 'AR experience adoption', detail: 'Walmart said customer and member adoption increased tenfold across 10 AR experiences at Walmart U.S. and Sam’s Club. The announcement also reported lower returns and improved conversion, without publishing the size of either change.', source: 'Walmart · company announcement, October 2024', href: 'https://corporate.walmart.com/news/2024/10/09/walmart-reveals-plan-for-scaling-artificial-intelligence-generative-ai-augmented-reality-and-immersive-commerce-experiences' },
  { value: '27%', label: 'Higher likelihood of ordering after 3D interaction', detail: 'Shopify’s Rebecca Minkoff case study says shoppers who interacted with a 3D model were 27% more likely to place an order than shoppers who did not. This is an observed association, not proof that 3D caused the difference.', source: 'Shopify · Rebecca Minkoff case study', href: shopifyCaseStudy },
  { value: '8,000+', label: '3D models centralized for reuse', detail: 'VNTANA reports that Kohler centralized and activated more than 8,000 models, addressing manual preparation and distribution across digital channels. This is a technology-provider case study; the reported result has not been independently audited by TopoStitch.', source: 'VNTANA · Kohler case study', href: 'https://www.vntana.com/casestudies/the-3d-commerce-breakthrough-how-kohler-revolutionized-product-visualization/' },
]

export default function CommerceProof() {
  return (
    <section id="why-3d" className={styles.section} aria-labelledby="proof-title">
      <div className={styles.sectionIntro}>
        <h2 id="proof-title">Give customers more ways to explore your products.</h2>
        <p>Interactive 3D helps shoppers inspect shape, detail and scale before purchasing. Major retailers and brands are already investing in these experiences.</p>
      </div>
      <div className={`${styles.grid} ${styles.two}`}>
        {evidence.map(item => (
          <article key={item.label} className={`${styles.card} ${styles.proof}`}>
            <p className={styles.metric}>{item.value}</p>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
            <a href={item.href}>{item.source}</a>
          </article>
        ))}
      </div>
      <p className={styles.note}>These are third-party reported results, not TopoStitch customer outcomes or guaranteed improvements. Results may not transfer to other products, audiences, or implementations. No retailer affiliation or endorsement is implied.</p>
      <p className={styles.note}>Read our <a href="/insights">3D commerce insights and source notes</a>.</p>
    </section>
  )
}
