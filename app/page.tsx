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
    { "@type": "Service", name: "Product 3D preparation and creation", provider: { "@id": "https://www.topostitch.dev/#organization" }, serviceType: "3D product asset preparation and done-for-you production for ecommerce merchants", url: "https://www.topostitch.dev/services", description: "Existing-model preparation, product model creation, and custom workflow assistance." },
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
          <Link className={styles.button} href="/services">Explore 3D services</Link>
          <p className={styles.note}>Start with one product or get help planning a wider rollout.</p>
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
          <h2>Two ways to work with TopoStitch</h2>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          <article className={styles.card}>
            <h3>Get a model made or optimized</h3>
            <p>We create a new product model or prepare the one you already have for your storefront.</p>
            <Link href="/services#done-for-you">Explore 3D production</Link>
          </article>
          <article className={styles.card}>
            <h3>Get help with your 3D workflow</h3>
            <p>We work with your team or agency on capture, asset standards, integration, and handoff.</p>
            <Link href="/services#done-with-you">Explore consulting and support</Link>
          </article>
        </div>
        <p className={styles.note}><Link href="/services#compare">Compare offerings and pricing</Link></p>
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
          <li><h3>Share one product</h3><p>Choose a service based on what you have and where you want to use it.</p></li>
          <li><h3>We do the agreed work</h3><p>Once your project starts, we collect the agreed files or send shipping instructions, then create or optimize the model, or work with your team on the agreed plan.</p></li>
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

      <CommerceProof />
      <CommerceFaqs />

      <div className={styles.closingLinks} id="early-access">
        <Link href="/services#compare" className={styles.button}>Compare 3D services</Link>
        <Link href="/request?offer=custom">Ask about your project</Link>
      </div>
    </main>
  );
}

