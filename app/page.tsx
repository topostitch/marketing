import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CommerceProof from "@/components/commerce-proof";
import CommerceFaqs from "@/components/commerce-faqs";
import styles from "./marketing-layout.module.css";

export const metadata: Metadata = {
  title: { absolute: "3D Product Modeling for Amazon & Shopify | TopoStitch" },
  description: "3D product modeling and asset optimization for sellers, brands, and manufacturers. Create your first model or fix an existing asset for Shopify, Amazon, or another destination.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://www.topostitch.dev/#organization", name: "TopoStitch", url: "https://www.topostitch.dev", email: "hello@topostitch.dev" },
    { "@type": "Service", name: "Product 3D preparation and creation", provider: { "@id": "https://www.topostitch.dev/#organization" }, serviceType: "3D product asset preparation and done-for-you production for ecommerce merchants", url: "https://www.topostitch.dev/#studio", description: "Product eligibility and scope are reviewed before payment. Existing-model preparation, product model creation, and custom workflow assistance." },
  ],
};

const outputs = [
  { title: "Interactive product 3D", description: "Let shoppers rotate and inspect the product from different angles.", image: "/chair.webp", alt: "Illustration of an interactive 3D chair model." },
  { title: "Product context with AR", description: "Prepare suitable products for supported augmented reality experiences.", image: "/AR.webp", alt: "Illustration of a product placed in a room using augmented reality." },
];

const audiences = [
  { title: "Create your first product model", description: "Sellers, brands, and manufacturers can start with one product and an agreed storefront or marketplace." },
  { title: "Make existing 3D files usable", description: "Designers, OEMs, and teams that inherited a 3D library can bring CAD, vendor files, or existing models for a review of format, scale, materials, and file size." },
  { title: "Integrate and support 3D", description: "Developers, agencies, and integration teams can discuss file requirements, storefront compatibility, and a handoff they can maintain." },
  { title: "Scope a rollout", description: "Ecommerce leads, product owners, and other decision-makers can work with TopoStitch to assess one SKU, agree on acceptance criteria, and plan the work needed for a wider rollout." },
];

export default function HomePage() {
  return (
    <main id="main-content" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>3D product models for ecommerce.</h1>
          <p>Get a model made, fix an existing 3D file, or get expert help publishing 3D on your storefront.</p>
          <Link className={styles.button} href="#services">Explore 3D services</Link>
          <p className={styles.note}>Start with one product. We review it before you pay.</p>
        </div>
        <figure className={styles.figure}>
          <Image className={styles.heroImage} src="/hero_graphic.webp"
            alt="Illustration of a lamp shown in a product viewer and other ecommerce media."
            width={800} height={800} sizes="(max-width: 850px) 100vw, 650px" priority />
          <figcaption>Illustration of how a product model can be used across ecommerce.</figcaption>
        </figure>
      </section>

      <section className={styles.destination} aria-label="Supported destinations">
        <p>Prepare models for</p>
        <Image src="/brands/amazon.svg" alt="Amazon" width={64} height={24} />
        <Image src="/brands/shopify.svg" alt="Shopify" width={64} height={24} />
        <p className={styles.note}>Independent service.</p>
      </section>

      <section className={styles.section} id="services">
        <div className={styles.sectionIntro} id="studio">
          <h2>Done for You and Done with You</h2>
          <p>Choose a production package or get hands-on guidance for your team. We review your project before payment. Prices are in USD.</p>
        </div>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.offer}`}>
            <h3>Basic</h3>
            <p className={styles.price}>From $149 <span>/ product</span></p>
            <p>Bring an existing model that’s hard to reuse, too heavy for the web, or in the wrong format. We review it for one agreed destination.</p>
            <ul><li>Source model review</li><li>Optimization and agreed file conversion</li><li>Delivery with a handoff checklist</li></ul>
            <a href="/request?offer=basic">Request Basic</a>
          </article>
          <article className={`${styles.card} ${styles.offer} ${styles.featured}`}>
            <h3>E-commerce Ready</h3>
            <p className={styles.price}>From $299 <span>/ product</span></p>
            <p>We create and check one 3D model for an eligible product. Apply to ship your item for capture or tell us what imagery you already have.</p>
            <ul><li>Image coverage and feasibility review</li><li>Model creation, QA, and optimization</li><li>Files for one agreed commerce destination</li></ul>
            <a href="/request?offer=ecommerce">Request E-commerce Ready</a>
          </article>
          <article className={`${styles.card} ${styles.offer}`}>
            <h3>Done with You</h3>
            <p className={styles.price}>Custom quote</p>
            <p>Get a review of your assets, product fit, and storefront requirements, with a written recommendation for what to do next.</p>
            <ul><li>Guided capture and workflow consulting</li><li>One-SKU pilot plans, team handoffs, and catalog rollout planning</li><li>Agency and integration partnerships</li></ul>
            <a href="/request?offer=custom">Discuss your project</a>
          </article>
        </div>
        <p className={styles.note}>Starting prices apply to eligible products and suitable source material. Final scope, revisions, turnaround, and price are confirmed before payment. Capture, shipping, complex modeling, variants, and store implementation are quoted separately. No payment is taken through this inquiry form.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>Help shoppers see what they’re buying</h2>
          <p>Start with a reusable product model and one intended destination.</p>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          {outputs.map(output => (
            <article key={output.title} className={`${styles.card} ${styles.output}`}>
              <Image src={output.image} alt={output.alt} width={800} height={800}
                sizes="(max-width: 650px) 100vw, 580px" className={styles.outputImage} />
              <div className={styles.outputCopy}><h3>{output.title}</h3><p>{output.description}</p></div>
            </article>
          ))}
        </div>
        <p className={styles.note}>Illustrations of possible uses. Pilot deliverables are agreed during review.</p>
      </section>

      <section className={styles.section} id="product-fit">
        <div className={styles.sectionIntro}><h2>Find the right way to show your product</h2>
        <p>Tell us what shoppers need to understand about your product. We’ll review one item and recommend a deliverable based on its materials, your source files, and where it needs to appear.</p></div>
        <ul className={styles.grid}>
          <li className={styles.card}><h3>Standard 3D pilot</h3><p>A rigid product with visible detail and reliable dimensions. Tell us if you can ship it or already have source files.</p></li>
          <li className={styles.card}><h3>Custom 3D quote</h3><p>For clear glass, polished metals, gemstones, flexible products, or incomplete references, we can assess whether CAD, manual modeling, or a different capture approach fits your goals. We’ll confirm feasibility and quote the work before you pay.</p></li>
          <li className={styles.card}><h3>Consulting or a different deliverable</h3><p>If interactive 3D won’t show what shoppers need, work with TopoStitch on an asset review, a guided capture plan, or a recommendation for product photography, turntable video, or detail images. We’ll discuss which work we can scope and what your team or another specialist would handle.</p></li>
        </ul>
        <p className={styles.note}><Link href="/request?offer=custom">Request a product review</Link></p>
      </section>

      <section className={styles.section} id="how-it-works">
        <div className={styles.sectionIntro}><h2>How it works</h2></div>
        <ol className={`${styles.grid} ${styles.stepList}`}>
          <li><h3>Share one product</h3><p>Tell us what you have and where you want to use it. We confirm the scope and price before payment.</p></li>
          <li><h3>We do the agreed work</h3><p>After approval and payment, we collect the agreed files or send shipping instructions, then create or optimize the model, or work with your team on the agreed plan.</p></li>
          <li><h3>Review and handoff</h3><p>Review what we’ve prepared and receive the agreed files, recommendations, or handoff guidance.</p></li>
        </ol>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}><h2>Who we work with</h2></div>
        <div className={`${styles.grid} ${styles.two}`}>
          {audiences.map(audience => (
            <article key={audience.title} className={styles.card}>
              <h3>{audience.title}</h3>
              <p>{audience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}><h2>Requirements for your storefront</h2><p>Find requirements and options for your destination.</p></div>
        <ul className={styles.grid}>
          <li className={styles.card}><Link href="/services/amazon-3d-modeling">3D product modeling for Amazon sellers</Link></li>
          <li className={styles.card}><Link href="/services/shopify-3d-models">Shopify 3D model creation and preparation</Link></li>
          <li className={styles.card}><Link href="/services/3d-product-modeling">Ecommerce 3D modeling, optimization, and consulting</Link></li>
        </ul>
      </section>

      <CommerceProof />
      <CommerceFaqs />

      <section className={`${styles.section} ${styles.action}`} id="early-access">
        <h2>Bring us one product</h2>
        <p>Share what you’re working with and where it needs to appear. We’ll recommend a next step.</p>
        <Link href="/request" className={styles.button}>Request a product review</Link>
        <p>Prefer to follow along? <Link href="/updates">Get service updates</Link>.</p>
      </section>

      <footer className={styles.footer}>
        <Link href="/" aria-label="TopoStitch home">
          <Image
            src="/brand/topostitch-mark-dark.svg"
            alt="TopoStitch"
            width={200}
            height={64}
          />
        </Link>


        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="mailto:hello@topostitch.dev">Contact</a>
      </footer>
    </main>
  );
}

