import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import styles from "../commerce-validation.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
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
          <a href="/#studio">Studio</a>
          <a href="/about">About</a>
          <Link className={styles.navCta} href="/#early-access">
            Join early access
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
            <a href="/#studio">Studio</a>
            <a href="/about">About</a>
            <a className={styles.mobileNavCta} href="/#early-access">
              Join early access
            </a>
          </div>
        </details>
      </header>

      <section className={styles.hero}>
        <Reveal>
          <p className={styles.eyebrow}>About TopoStitch</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1>
            Built for people
            <br />
            who make
            <br />
            <span>real things.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className={styles.heroCopy}>
            TopoStitch is exploring a simpler way for makers and product brands
            to turn one physical product into reusable digital content for
            ecommerce, marketing, 3D, AR, and more.
          </p>
        </Reveal>
      </section>

      <section className={styles.outputsSection}>
        <Reveal>
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
        </Reveal>
      </section>

      <section className={styles.pathsSection}>
        <Reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>The founder</p>
            <h2>Built from years of product, 3D, and immersive work.</h2>
          </div>
        </Reveal>

        <div className={styles.pathGrid}>
          <Reveal amount={0.2}>
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
          </Reveal>

          <Reveal delay={0.08} amount={0.2}>
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
          </Reveal>
        </div>
      </section>

      <section className={styles.howSection}>
        <Reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Where we are now</p>
            <h2>Early by design.</h2>
          </div>
        </Reveal>

        <div className={styles.steps}>
          <Reveal amount={0.2}>
            <article>
              <span>01</span>
              <h3>Build</h3>
              <p>
                We&apos;re building the core workflow for turning physical
                products into reusable digital product assets.
              </p>
            </article>
          </Reveal>

          <div className={styles.stepArrow}>→</div>

          <Reveal delay={0.08} amount={0.2}>
            <article>
              <span>02</span>
              <h3>Test</h3>
              <p>
                We&apos;re working with makers and small brands to understand
                which outcomes are actually worth paying for.
              </p>
            </article>
          </Reveal>

          <div className={styles.stepArrow}>→</div>

          <Reveal delay={0.16} amount={0.2}>
            <article>
              <span>03</span>
              <h3>Learn</h3>
              <p>
                The goal is not to pretend the product is finished. It&apos;s to
                build the right thing with real customers.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={styles.identitySection}>
        <Reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Who we are</p>
            <h2>Independent by design.</h2>
          </div>
        </Reveal>

        <div className={styles.identityGrid}>
          <Reveal amount={0.2}>
            <div className={styles.identityCard}>
              <span className={styles.identityLabel}>Veteran-owned</span>
              <p>
                TopoStitch is founded and led by a U.S. Navy veteran with a
                background spanning design, media, technology, and immersive
                product development.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05} amount={0.2}>
            <div className={styles.identityCard}>
              <span className={styles.identityLabel}>Minority-owned</span>
              <p>
                TopoStitch is a minority-owned independent company shaped by
                multidisciplinary experience across design, technology, and
                entrepreneurship.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} amount={0.2}>
            <div className={styles.identityCard}>
              <span className={styles.identityLabel}>LGBTQ+ owned</span>
              <p>
                TopoStitch is LGBTQ+ owned and founder-led, with a commitment
                to building a company that reflects a broader range of people,
                perspectives, and creative communities.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} amount={0.2}>
            <div className={styles.identityCard}>
              <span className={styles.identityLabel}>Founder-led</span>
              <p>
                Product decisions, customer discovery, and early pilots are
                being shaped directly by the founder and the people testing
                TopoStitch with real products.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} amount={0.2}>
            <div className={styles.identityCard}>
              <span className={styles.identityLabel}>
                Startup Virginia Idea Factory
              </span>
              <p>
                TopoStitch participated in Startup Virginia&apos;s Idea Factory,
                helping sharpen the venture through customer discovery,
                positioning, and early-stage business validation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.earlyAccess}>
        <Reveal>
          <div className={styles.earlyCopy}>
            <p className={styles.kicker}>Work with us</p>

            <h2>Have a product worth testing?</h2>

            <p>
              If you make or sell physical products and want better ways to
              create product imagery, 3D experiences, AR, or reusable marketing
              content, we&apos;d like to hear from you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
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

        <p>Capture once. Create anything. Sell everywhere.</p>

        <Link href="/">Home</Link>
      </footer>
    </main>
  );
}
