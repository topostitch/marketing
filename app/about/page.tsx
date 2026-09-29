import Link from "next/link";
import styles from "../commerce-validation.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          TopoStitch
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/#studio">Studio</Link>
          <Link href="/about">About</Link>
          <Link className={styles.navCta} href="/#early-access">
            Join early access
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>About TopoStitch</p>

        <h1>
          Built for people
          <br />
          who make
          <br />
          <span>real things.</span>
        </h1>

        <p className={styles.heroCopy}>
          TopoStitch is exploring a simpler way for makers and product brands
          to turn one physical product into reusable digital content for
          ecommerce, marketing, 3D, AR, and more.
        </p>
      </section>

      <section className={styles.outputsSection}>
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.kicker}>Why we&apos;re building it</p>
            <h2>
              Creating product content shouldn&apos;t mean starting over every
              time.
            </h2>
          </div>

          <p>
            A new product photo, campaign, marketplace, background, or format
            often means another round of production work. TopoStitch is being
            built around a different idea: create one reusable digital version
            of a product, then keep creating from it.
          </p>
        </div>
      </section>

      <section className={styles.pathsSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>The founder</p>
          <h2>Built from years of product, 3D, and immersive work.</h2>
        </div>

        <div className={styles.pathGrid}>
          <article className={styles.pathCard}>
            <span className={styles.pathTag}>Jacob Galito</span>

            <h3>Designer. Builder. Founder.</h3>

            <p>
              Jacob&apos;s background spans product design, 3D, immersive
              technology, digital experiences, and software development.
            </p>

            <p>
              Before TopoStitch, he co-founded Ario, an augmented reality
              company where he served as Creative Director and helped build
              products for enterprise and government customers.
            </p>

            <p>
              He was also a co-inventor on Ario&apos;s patented platform and
              has worked across interactive product experiences, spatial
              computing, ecommerce, and emerging technology.
            </p>
          </article>

          <article className={`${styles.pathCard} ${styles.studioCard}`}>
            <span className={styles.pathTag}>What changed</span>

            <h3>From building 3D tools to solving a product problem.</h3>

            <p>
              TopoStitch started from the technology side: making physical
              capture, 3D processing, and publishing easier.
            </p>

            <p>
              The bigger opportunity became clearer over time. The model
              itself isn&apos;t the end product. It&apos;s the foundation for
              everything a brand can create from a physical product.
            </p>

            <p>
              That&apos;s why we&apos;re now focused on helping small brands
              and independent makers turn physical products into reusable
              digital assets and content.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Where we are now</p>
          <h2>Early by design.</h2>
        </div>

        <div className={styles.steps}>
          <article>
            <span>01</span>
            <h3>Build</h3>
            <p>
              We&apos;re building the core workflow for turning physical
              products into reusable digital product assets.
            </p>
          </article>

          <div className={styles.stepArrow}>→</div>

          <article>
            <span>02</span>
            <h3>Test</h3>
            <p>
              We&apos;re working with makers and small brands to understand
              which outcomes are actually worth paying for.
            </p>
          </article>

          <div className={styles.stepArrow}>→</div>

          <article>
            <span>03</span>
            <h3>Learn</h3>
            <p>
              The goal is not to pretend the product is finished. It&apos;s to
              build the right thing with real customers.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.earlyAccess}>
        <div className={styles.earlyCopy}>
          <p className={styles.kicker}>Work with us</p>

          <h2>Have a product worth testing?</h2>

          <p>
            If you make or sell physical products and want better ways to
            create product imagery, 3D experiences, AR, or reusable marketing
            content, we&apos;d like to hear from you.
          </p>
        </div>

        <div className={styles.pathCard}>
          <span className={styles.pathTag}>Early access</span>

          <h3>Help shape what TopoStitch becomes.</h3>

          <p>
            We&apos;re looking for a small number of makers and product brands
            who are willing to test the workflow with real products and real
            business needs.
          </p>

          <Link href="/#early-access">Join early access →</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.brand}>
          TopoStitch
        </Link>

        <p>Capture once. Create anything. Sell everywhere.</p>

        <Link href="/">Home</Link>
      </footer>
    </main>
  );
}
