import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import CommerceProof from "@/components/commerce-proof";
import CommerceFaqs from "@/components/commerce-faqs";
import MvpLeadForm from "@/components/mvp-lead-form";
import styles from "./commerce-validation.module.css";

export const metadata: Metadata = {
  title: { absolute: "3D Product Modeling for Amazon & Shopify | TopoStitch" },
  description: "Independent 3D product modeling services for Amazon and Shopify merchants. Prepare an existing model or apply for a founder-led Ship-to-3D pilot.",
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

const audiences = ["Amazon merchants", "Shopify merchants", "Brands already using 3D", "Brands planning their first 3D launch"];

export default function HomePage() {
  return (
    <main id="main-content" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="TopoStitch home">
          <Image
            src="/brand/topostitch-mark-dark.svg"
            alt="TopoStitch"
            width={200}
            height={64}
            className={styles.brandMark}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <a href="/#how-it-works">How it works</a>
          <a href="/#studio">Pilot pricing</a>
          <a href="/#why-3d">Why 3D</a>
          <a href="/#services">3D services</a>
          <a href="/about">About</a>
          <Link className={styles.navCta} href="/#early-access">
            Start a product pilot
          </Link>
        </nav>

        <details className={styles.mobileNav}>
          <summary className={styles.mobileNavTrigger} aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>

          <div className={styles.mobileNavPanel}>
            <a href="/#how-it-works">How it works</a>
            <a href="/#studio">Pilot pricing</a>
          <a href="/#why-3d">Why 3D</a>
          <a href="/#services">3D services</a>
            <a href="/about">About</a>
            <a className={styles.mobileNavCta} href="/#early-access">
              Start a product pilot
            </a>
          </div>
        </details>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopyColumn}>
          <Reveal delay={0}>
            <div className={styles.eyebrow}>
              For Amazon and Shopify merchants
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1>
              Product 3D.
              <br />
              <span>For Amazon
              <br />and Shopify.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className={styles.heroCopy}>
              Bring an existing 3D model or apply to ship us one product for capture. We review what you need and agree on the deliverables before you pay.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#early-access">
                Start a product pilot
              </a>

              <a className={styles.secondaryButton} href="#studio">
                See pilot pricing
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <p className={styles.microcopy}>
              Founder-led paid pilots. Product eligibility and final price confirmed before payment.
            </p>
          </Reveal>
        </div>

        <Reveal
          className={styles.heroVisual}
          delay={0.12}
          amount={0.08}
          direction="right"
        >
          <div className={styles.heroGraphic}>
            <Image
              src="/hero_graphic.webp"
              alt="A physical product transformed into ecommerce imagery, lifestyle photography, interactive 3D, AR, and social content."
              width={1600}
              height={1200}
              priority
              className={styles.heroGraphicImage}
            />
          </div>
        </Reveal>
      </section>

      <section className={styles.destinationStrip} aria-label="Initial merchant audience">
        <p className={styles.destinationEyebrow}>Starting with Amazon and Shopify merchants</p>
        <div className={styles.destinationList}>
          <Image src="/brands/amazon.svg" alt="Amazon" width={100} height={40} />
          <Image src="/brands/shopify.svg" alt="Shopify" width={96} height={40} />
        </div>
        <p className={styles.evidenceNote}>Independent service. Platform names identify intended destinations, not endorsements.</p>
      </section>

      <section id="services" className={styles.commerceSection}>
        <h2>3D product modeling services for your store</h2>
        <p>Choose your destination for relevant requirements, project options, and next steps.</p>
        <ul>
          <li><Link href="/services/amazon-3d-modeling">3D product modeling for Amazon sellers</Link></li>
          <li><Link href="/services/shopify-3d-models">Shopify 3D model creation and preparation</Link></li>
          <li><Link href="/services/3d-product-modeling">Ecommerce 3D modeling, optimization, and consulting</Link></li>
        </ul>
      </section>
      <CommerceProof />

      <section className={styles.outputsSection}>
        <Reveal amount={0.2}>
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.kicker}>
                One product. More ways to sell it.
              </p>
              <h2>
                Help shoppers understand what they are buying.
              </h2>
            </div>

            <p>
              Start with a reusable product model and one intended destination.
              These illustrations show the kinds of experiences a suitable asset can support.
            </p>
          </div>
        </Reveal>

        <div className={styles.outputGrid}>
          {outputs.map((output, index) => (
            <Reveal key={output.title} delay={index * 0.05} amount={0.15}>
              <article className={styles.outputCard}>
                <div className={styles.outputImageWrap}>
                  <Image
                    src={output.image}
                    alt={output.alt}
                    width={800}
                    height={800}
                    className={styles.outputImage}
                  />
                </div>

                <div className={styles.outputContent}>
                  <span className={styles.outputNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{output.title}</h3>
                  <p>{output.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className={styles.futureNote}>
          Illustrative examples, not customer projects. Each pilot has its own agreed deliverables.
        </p>
      </section>

      <section className={styles.pathsSection} id="studio">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Pilot pricing · USD</p>
          <h2>Start with one product.</h2>
          <p>Choose the help you need. We review your product and source material before asking you to pay.</p>
        </div>
        <div className={styles.pricingGrid}>
          <article className={styles.pathCard}>
            <span className={styles.pathTag}>Existing asset</span><h3>Basic</h3>
            <p className={styles.price}>From $149 <span>/ product</span></p>
            <p>Prepare one suitable existing 3D model for its next use.</p>
            <ul><li>Source model review</li><li>Optimization and agreed file conversion</li><li>Delivery with a handoff checklist</li></ul>
            <a href="?offer=basic#early-access" data-offer="basic">Request Basic</a>
          </article>
          <article className={`${styles.pathCard} ${styles.studioCard}`}>
            <span className={styles.pathTag}>Done for you</span><h3>E-commerce Ready</h3>
            <p className={styles.price}>From $299 <span>/ product</span></p>
            <p>We create and check one 3D model for an eligible product. Apply to ship your item for capture or tell us what imagery you already have.</p>
            <ul><li>Image coverage and feasibility review</li><li>Model creation, QA, and optimization</li><li>Files for one agreed commerce destination</li></ul>
            <a href="?offer=ecommerce#early-access" data-offer="ecommerce">Request E-commerce Ready</a>
          </article>
          <article className={styles.pathCard}>
            <span className={styles.pathTag}>Work with your team</span><h3>Guided or custom</h3>
            <p className={styles.price}>Let&apos;s scope it</p>
            <p>Help for projects that need more than one standard asset.</p>
            <ul><li>Guided capture and workflow consulting</li><li>Catalogs, variants, or implementation</li><li>Agency and integration partnerships</li></ul>
            <a href="?offer=custom#early-access" data-offer="custom">Discuss your project</a>
          </article>
        </div>
        <p className={styles.evidenceNote}>Starting prices apply to eligible products and suitable source material. Final scope, revisions, turnaround, and price are confirmed before payment. Capture, shipping, complex modeling, variants, and store implementation are quoted separately. No payment is taken through this inquiry form.</p>
      </section>

      <section className={styles.howSection} id="how-it-works">
        <Reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>How it works</p>
            <h2>Review. Prepare. Deliver.</h2>
          </div>
        </Reveal>

        <div className={styles.steps}>
          <Reveal amount={0.2}>
            <article>
              <span>01</span>
              <h3>Share your product</h3>
              <p>
                Send your listing, intended destination, and a description of the assets you have. We confirm feasibility and a written scope before payment.
              </p>
            </article>
          </Reveal>

          <div className={styles.stepArrow}>→</div>

          <Reveal delay={0.08} amount={0.2}>
            <article>
              <span>02</span>
              <h3>We prepare the asset</h3>
              <p>
                Once the scope is approved and payment is confirmed, we collect your agreed inputs or send shipping instructions. We then create or prepare the model and check it against the scope.
              </p>
            </article>
          </Reveal>

          <div className={styles.stepArrow}>→</div>

          <Reveal delay={0.16} amount={0.2}>
            <article>
              <span>03</span>
              <h3>Review and handoff</h3>
              <p>
                Review your deliverables and receive the agreed files and guidance. Store implementation is included only when explicitly scoped.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div>
          <p className={styles.kicker}>For merchants investing in product understanding</p>
          <h2>
            Already using 3D, or ready to try it?
          </h2>
        </div>

        <div className={styles.audienceGrid}>
          {audiences.map((audience) => (
            <span key={audience}>{audience}</span>
          ))}
        </div>
      </section>

      <CommerceFaqs />

      <section className={styles.earlyAccess} id="early-access">
        <Reveal>
          <div className={styles.earlyCopy}>
            <p className={styles.kicker}>Start a product pilot</p>
            <h2>Bring us one product.</h2>
            <p>
              Tell us about your Amazon listing or Shopify store, the product,
              and what you want to improve. We will review your request and
              reply with the next step.
            </p>

            <p>
              No payment or shipping required to inquire.
              <br />
              Prefer email? <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <MvpLeadForm />
        </Reveal>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.brand} aria-label="TopoStitch home">
          <Image
            src="/brand/topostitch-mark-dark.svg"
            alt="TopoStitch"
            width={200}
            height={64}
            className={styles.brandMark}
          />
        </Link>

        <p>3D product models for ecommerce.</p>

        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="mailto:hello@topostitch.dev">Contact</a>
      </footer>
    </main>
  );
}

