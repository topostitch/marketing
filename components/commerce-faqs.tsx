import styles from '@/app/marketing-layout.module.css'
import { amazonGuide, shopifyCaseStudy } from './commerce-proof'

export default function CommerceFaqs() {
  return (
    <section id="faqs" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.sectionIntro}>
        <h2 id="faq-title">Frequently asked questions</h2>
      </div>
      <div className={styles.faqList}>
        <details><summary>Will 3D increase my sales by these amounts?</summary><p>The figures above describe specific third-party observations. They do not predict your results. Start with a small product set and agree on a baseline and success measure before launch. We do not promise a conversion or revenue increase.</p><a href={shopifyCaseStudy}>Read the Shopify case study</a></details>
        <details><summary>Are 3D viewing and AR the same thing?</summary><p>3D viewing lets shoppers rotate and inspect a model on screen. AR can place a representation in a camera view of their surroundings. Amazon’s 2× figure groups interactions with View in 3D and AR Virtual Try-On; its 9% sales figure refers separately to View in Your Room.</p><a href={amazonGuide}>Read Amazon’s guide, page 2</a></details>
        <details><summary>Can I use this on Amazon or Shopify?</summary><p>Tell us your destination and share your listing or store. We review your intended use and agree on the required files before payment. Product, account, region, device, and storefront requirements can differ. Platform acceptance and feature availability are determined by the platform; they are not guaranteed by buying a model. TopoStitch is an independent service.</p></details>
        <details><summary>Do I need an existing 3D model or have to ship my product?</summary><p>You can start with an existing model or suitable product photos. We review coverage, materials, and dimensions first. If new capture is needed, we discuss guided photography or studio capture. Do not ship anything until capture arrangements, shipping costs, and return handling are agreed.</p></details>
        <details><summary>What is included in the pilot price?</summary><p>Basic starts at $149 for preparing one suitable existing model. E-commerce Ready starts at $299 for one eligible product from suitable imagery, with an optimized model and files for one agreed destination. We confirm deliverables, revisions, timing, and final price before payment. New capture, shipping, complex modeling, variants, and store implementation are separately scoped.</p></details>
        <details><summary>How do we know whether the pilot worked?</summary><p>Choose a measure suited to the project: time to obtain an accepted asset, revision effort, or engagement and purchase behavior using your available store reporting. Traffic and measurement access affect what can be concluded. Comparing people who click 3D with those who do not does not, by itself, establish that 3D caused a sales increase.</p></details>
        <details><summary>Can you help my team or agency do the work?</summary><p>Yes. Request guided capture, workflow consulting, or an agency partnership through the form. We agree on sessions, responsibilities, and deliverables before quoting.</p></details>
      </div>
    </section>
  )
}
