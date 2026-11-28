import ServiceAnswers from "@/components/service-answers";
import Breadcrumbs from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import CapturePathways from "@/components/capture-pathways";
import Suitability, { FulfillmentTerms } from "@/components/suitability";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceExplorer, {
  ProjectNextStep,
} from "@/components/service-explorer";
import { commerceOffers } from "@/lib/commerce-offers";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = pageMetadata({
  title: "3D Product Digitization & Ecommerce Services",
  description:
    "Explore physical-product digitization, ecommerce-ready 3D assets and specialized production. Compare capture methods, deliverables and pilot requirements.",
  path: "/services",
});

const illustrations = {
  basic: {
    src: "/chair.webp",
    alt: "Illustration of a chair shoppers could rotate to inspect the frame and upholstery",
  },
  ecommerce: {
    src: "/cup.webp",
    alt: "Ceramic mug with a textured glaze, curved handle, and exposed clay foot",
  },
};

export default function ServicesPage() {
  const offerings = commerceOffers.map((offer) => {
    const standard = offer.id === "basic" || offer.id === "ecommerce";
    return {
      ...offer,
      href: standard
        ? `/order?deliverable=${offer.id}`
        : `/request?offer=${offer.id}`,
      cta: standard ? `Buy ${offer.name}` : offer.cta,
    };
  });

  return (
    <main id="main-content" className={styles.page}>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <header className={styles.salesIntro}>
        <h1>3D services for ecommerce</h1>
        <p>
          Buy a fixed-scope product model package, prepare an existing file, or
          get help bringing 3D into your team’s workflow.
        </p>
        <nav aria-label="Explore services" className={styles.salesNav}>
          <a href="#done-for-you">Get a model made or optimized</a>
          <a href="#done-with-you">Get help with your workflow</a>
          <Link href="/order" className={styles.button}>
            Shop packages
          </Link>
          <Link href="/compare">Compare offerings</Link>
        </nav>
      </header>
      <CapturePathways />

      {(
        [
          "Model creation and optimization",
          "3D consulting and integration",
        ] as const
      ).map((service) => (
        <section
          className={styles.section}
          id={
            service === "Model creation and optimization"
              ? "done-for-you"
              : "done-with-you"
          }
          key={service}
        >
          <div className={styles.sectionIntro}>
            <h2>{service}</h2>
          </div>
          <div className={styles.salesOffers}>
            {offerings
              .filter((offer) => offer.service === service)
              .map((offer) => {
                const illustration =
                  offer.id === "basic" || offer.id === "ecommerce"
                    ? illustrations[offer.id]
                    : undefined;
                return (
                  <article
                    key={offer.id}
                    id={offer.id}
                    className={styles.salesOffer}
                  >
                    <div className={styles.salesCopy}>
                      <p className={styles.salesLabel}>{offer.name}</p>
                      <h3>{offer.title}</h3>
                      <p>{offer.description}</p>
                      <p className={styles.price}>{offer.price}</p>
                      <Link className={styles.button} href={offer.href}>
                        {offer.cta}
                      </Link>
                    </div>
                    <div className={styles.salesExample}>
                      {illustration && (
                        <Image
                          src={illustration.src}
                          alt={illustration.alt}
                          width={1254}
                          height={1254}
                          sizes="(max-width: 650px) 90vw, 520px"
                          className={styles.salesImage}
                        />
                      )}
                      <div>
                        <h4>Example project</h4>
                        <p>{offer.example}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      ))}

      <section id="compare" className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>Compare all offerings</h2>
          <p>Compare prices and what’s included. Prices are in USD.</p>
        </div>
        <div className={`${styles.grid} ${styles.compareGrid}`}>
          {offerings.map((offer) => (
            <article
              key={offer.id}
              className={`${styles.card} ${styles.compareCard}`}
            >
              <p className={styles.salesLabel}>{offer.service}</p>
              <h3>{offer.name}</h3>
              <p className={styles.price}>{offer.price}</p>
              <p>{offer.summary}</p>
              <ul>
                {offer.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className={styles.button} href={offer.href}>
                {offer.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          Physical capture is included for eligible standard products. You pay
          inbound and return shipping separately. Specialized work and
          integrations require a quotation.
        </p>
      </section>

      <section className={styles.section} id="purchase-process">
        <div className={styles.sectionIntro}>
          <h2>How to get started</h2>
        </div>
        <ol className={`${styles.grid} ${styles.stepList}`}>
          <li>
            <h3>Choose a package or project</h3>
            <p>
              Select a capture method and then Basic digitization or E-commerce
              Ready. Request a quotation for specialized work.
            </p>
          </li>
          <li>
            <h3>Check product fit</h3>
            <p>
              Confirm material suitability and pilot limits before adding each
              product to the cart. Detailed intake follows verified payment.
              Customer captures and specialized products are inquiry-only.
            </p>
          </li>
          <li>
            <h3>Pay and get started</h3>
            <p>
              Pay for a fixed package through secure Stripe checkout. Custom
              projects use a written scope and quote before payment.
            </p>
          </li>
        </ol>
      </section>

      <ServiceAnswers />
      <ServiceExplorer />
      <Suitability />
      <FulfillmentTerms />
      <section className={styles.section}>
        <h2>Already have a 3D asset?</h2>
        <p>
          Existing asset optimization is a separate pilot candidate. Send your
          source details for assessment and a quotation.
        </p>
        <Link href="/request?offer=custom">Discuss asset optimization</Link>
      </section>
      <ProjectNextStep />
    </main>
  );
}
