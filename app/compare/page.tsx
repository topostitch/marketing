import CapturePathways from "@/components/capture-pathways";
import Suitability, { FulfillmentTerms } from "@/components/suitability";
import type { Metadata } from "next";
import Link from "next/link";
import { commerceOffers } from "@/lib/commerce-offers";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = {
  title: "Compare 3D services and pricing",
  description:
    "Compare TopoStitch Basic and E-commerce Ready packages, plus workflow consulting and agency integration support.",
  alternates: { canonical: "/compare" },
};
export default function ComparePage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.salesIntro}>
        <h1>Find the right starting point</h1>
        <p>
          Compare prices, inputs, and deliverables for your product or team.
        </p>
        <Link href="/services">Explore the services in detail</Link>
      </header>
      <CapturePathways />
      <section className={styles.section} aria-label="Compare services">
        <div className={`${styles.grid} ${styles.compareGrid}`}>
          {commerceOffers.map((offer) => (
            <article
              key={offer.id}
              className={`${styles.card} ${styles.compareCard}`}
            >
              <p className={styles.salesLabel}>{offer.service}</p>
              <h2>{offer.name}</h2>
              <p className={styles.price}>{offer.price}</p>
              <p>{offer.summary}</p>
              <ul>
                {offer.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                className={styles.button}
                href={
                  offer.id === "basic" || offer.id === "ecommerce"
                    ? `/order?deliverable=${offer.id}`
                    : `/request?offer=${offer.id}`
                }
              >
                {offer.id === "basic" || offer.id === "ecommerce"
                  ? `Choose ${offer.name}`
                  : offer.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          Basic digitization starts at $149 for physical capture, reconstruction
          and a checked digital model. E-commerce Ready starts at $299 and adds
          optimization and preparation for one agreed ecommerce destination.
          Eligible standard physical products can use sandbox checkout after
          qualification. Customer-provided captures remain inquiry-only. Inbound
          and return shipping are paid separately by the customer; specialized
          work and integration require a quote.
        </p>
      </section>
      <section className={styles.section}>
        <div className={styles.action}>
          <h2>Not sure which service fits?</h2>
          <p>
            Share what you have and where your product needs to work. We’ll
            review the starting point with you.
          </p>
          <Link className={styles.button} href="/request">
            Request a project review
          </Link>
        </div>
      </section>
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
    </main>
  );
}
