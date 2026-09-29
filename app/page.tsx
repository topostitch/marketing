import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import MvpLeadForm from "@/components/mvp-lead-form";
import styles from "./commerce-validation.module.css";

const outputs = [
  "Product imagery",
  "Lifestyle scenes",
  "Interactive 3D",
  "AR experiences",
  "Social content",
  "Advertising assets",
];

const audiences = [
  "Independent makers",
  "Shopify brands",
  "Etsy sellers",
  "Product designers",
  "Artists & ceramicists",
  "Small manufacturers",
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          TopoStitch
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#studio">Studio</a>
          <Link href="/about">About</Link>
          <a className={styles.navCta} href="#early-access">
            Join early access
          </a>
        </nav>
      </header>

      <section className={styles.hero}>
        <Reveal delay={0}>
          <div className={styles.eyebrow}>For people who make real things</div>
        </Reveal>

        <Reveal delay={0.06}>
          <h1>
            Capture once.
            <br />
            Create anything.
            <br />
            <span>Sell everywhere.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className={styles.heroCopy}>
            Turn one physical product into the content you need to sell it online.
            Start with photos, video, a scan, an existing 3D model, or the product
            itself.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className={styles.heroActions}>
          <a className={styles.primaryButton} href="#early-access">
            Join early access
          </a>
          <a className={styles.secondaryButton} href="#studio">
            Have us digitize a product
          </a>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className={styles.microcopy}>
          TopoStitch is in early development. We&apos;re working directly with
          makers and small product brands.
          </p>
        </Reveal>

        <Reveal delay={0.32} amount={0.18}>
          <div className={styles.productStage} aria-hidden="true">
          <div className={styles.productObject}>
            <div className={styles.productTop} />
            <div className={styles.productBody} />
          </div>

          <div className={styles.stageLabel}>your product</div>
          </div>
        </Reveal>
      </section>

      <section className={styles.outputsSection}>
        <Reveal amount={0.2}>
          <div className={styles.sectionIntro}>
          <div>
            <p className={styles.kicker}>One product. More ways to sell it.</p>
            <h2>Stop starting from scratch for every new piece of content.</h2>
          </div>

          <p>
            TopoStitch is being built around one reusable digital version of
            your product that can become many different sales and marketing
            assets.
          </p>
          </div>
        </Reveal>

        <div className={styles.outputGrid}>
          {outputs.map((output, index) => (
            <Reveal key={output} delay={index * 0.05} amount={0.15}>
              <article className={styles.outputCard}>
              <span className={styles.outputNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.outputPlaceholder} />
                <h3>{output}</h3>
              </article>
            </Reveal>
          ))}
        </div>

        <p className={styles.futureNote}>
          We&apos;re starting with the highest-value product and ecommerce
          workflows first. More formats, including video, come later.
        </p>
      </section>

      <section className={styles.pathsSection} id="studio">
        <Reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Start your way</p>
            <h2>You don&apos;t need to become a 3D expert.</h2>
          </div>
        </Reveal>

        <div className={styles.pathGrid}>
          <Reveal amount={0.2}>
            <article className={styles.pathCard}>
            <span className={styles.pathTag}>DIY</span>
            <h3>Create it yourself</h3>
            <p>
              Already have photos, video, scans, or a 3D model? Bring what you
              have and turn it into a reusable digital product.
            </p>

            <ul>
              <li>Start with assets you already have</li>
              <li>Keep control of your product content</li>
              <li>Create new outputs without starting over</li>
            </ul>

              <a href="#early-access">Join early access →</a>
            </article>
          </Reveal>

          <Reveal delay={0.08} amount={0.2}>
            <article className={`${styles.pathCard} ${styles.studioCard}`}>
            <span className={styles.pathTag}>TopoStitch Studio</span>
            <h3>Have us do it for you</h3>
            <p>
              Send us your physical product and we&apos;ll handle the capture,
              processing, optimization, and setup.
            </p>

            <ul>
              <li>You send the product</li>
              <li>We digitize and prepare it</li>
              <li>You get a reusable digital product</li>
            </ul>

              <a href="#early-access">Apply for a pilot →</a>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={styles.howSection} id="how-it-works">
        <Reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>How it works</p>
            <h2>Capture. Create. Sell.</h2>
          </div>
        </Reveal>

        <div className={styles.steps}>
          <Reveal amount={0.2}>
            <article>
              <span>01</span>
            <h3>Capture</h3>
            <p>
              Start with photos, phone video, scans, an existing model, or send
              us the physical product.
              </p>
            </article>
          </Reveal>

          <div className={styles.stepArrow}>→</div>

          <Reveal delay={0.08} amount={0.2}>
            <article>
              <span>02</span>
            <h3>Create</h3>
            <p>
              Turn your source into a reusable digital product and create new
              product content from it.
              </p>
            </article>
          </Reveal>

          <div className={styles.stepArrow}>→</div>

          <Reveal delay={0.16} amount={0.2}>
            <article>
              <span>03</span>
            <h3>Sell</h3>
            <p>
              Use those outputs wherever customers discover and shop for your
              products.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div>
          <p className={styles.kicker}>Built for physical-product creators</p>
          <h2>If you sell something people can hold, we want to hear from you.</h2>
        </div>

        <div className={styles.audienceGrid}>
          {audiences.map((audience) => (
            <span key={audience}>{audience}</span>
          ))}
        </div>
      </section>

      <section className={styles.earlyAccess} id="early-access">
        <Reveal>
          <div className={styles.earlyCopy}>
          <p className={styles.kicker}>Help us build TopoStitch</p>
          <h2>Bring us one product.</h2>
          <p>
            We&apos;re working with a small number of makers and emerging
            brands to learn what makes creating and reusing product content
            genuinely easier.
          </p>

          <p>
            No polished workflow required.
            <br />
            No 3D expertise required.
          </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <MvpLeadForm />
        </Reveal>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.brand}>
          TopoStitch
        </Link>

        <p>Capture once. Create anything. Sell everywhere.</p>

        <Link href="/about">About</Link>
      </footer>
    </main>
  );
}
