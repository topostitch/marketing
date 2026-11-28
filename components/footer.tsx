import Link from "next/link";
import Image from "next/image";
import UpdatesForm from "./updates-form";
import styles from "@/app/marketing-layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <section
          id="updates"
          className={styles.footerSignup}
          aria-labelledby="updates-heading"
        >
          <div>
            <h2 id="updates-heading">Get TopoStitch updates</h2>
            <p>
              Production guidance, company updates and early-access
              opportunities.
            </p>
          </div>
          <UpdatesForm />
        </section>
        <div className={styles.footerDirectory}>
          <div className={styles.footerIdentity}>
            <Link href="/" aria-label="TopoStitch home">
              <Image
                src="/brand/topostitch-mark-dark.svg"
                alt=""
                width={145}
                height={27}
              />
            </Link>
            <p>3D production for products worth a closer look.</p>
            <p>
              Independent and founder-led.
              <br />
              Richmond, Virginia.
            </p>
            <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>
          </div>
          <nav aria-label="Services and pricing">
            <h2>Work with us</h2>
            <Link href="/services">Services</Link>
            <Link href="/compare">Compare packages</Link>
            <Link href="/order">Check product eligibility</Link>
            <Link href="/request">Discuss a project</Link>
            <Link href="/partnerships">Agency partnerships</Link>
          </nav>
          <nav aria-label="Production resources">
            <h2>Plan your project</h2>
            <Link href="/learn/product-suitability">Product suitability</Link>
            <Link href="/learn/product-preparation">Product preparation</Link>
            <Link href="/learn/packaging-shipping">Packaging and shipping</Link>
            <Link href="/learn">Learning Center</Link>
            <Link href="/services#fulfillment-terms">
              Service terms and refunds
            </Link>
          </nav>
          <nav aria-label="Company">
            <h2>TopoStitch</h2>
            <Link href="/about">About and founder</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/developers">Developer roadmap</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
        <div className={styles.footerColophon}>
          <p>
            TopoStitch LLC · Disabled veteran-, minority-, Asian American- and
            LGBTQ+-owned.
          </p>
          <p>
            Independent production services. Platform names identify intended
            destinations, not partnerships or endorsements.
          </p>
        </div>
      </div>
    </footer>
  );
}
