import Link from "next/link";
import { deliverables, pilotPolicy } from "@/lib/fulfillment-policy";
import styles from "@/app/marketing-layout.module.css";
export default function ServiceAnswers() {
  return (
    <section className={styles.section} aria-labelledby="service-answers">
      <div className={styles.sectionIntro}>
        <h2 id="service-answers">3D production, explained.</h2>
      </div>
      <div className={`${styles.grid} ${styles.two}`}>
        <article className={styles.card}>
          <h3>What does TopoStitch do?</h3>
          <p>
            TopoStitch provides supported 3D production: physical product
            capture, reconstruction, asset preparation and scoped integration
            support for merchants, manufacturers, agencies and developers.
          </p>
          <Link href="/about">Meet the founder</Link>
        </article>
        <article className={styles.card}>
          <h3>How much does product digitization cost?</h3>
          <p>
            Basic digitization starts at ${deliverables.basic.cents / 100} per
            product. E-commerce Ready starts at $
            {deliverables.ecommerce.cents / 100}. Customers pay shipping
            separately. Specialized production and integrations require a
            quotation.
          </p>
          <Link href="/compare">Compare deliverables and terms</Link>
        </article>
        <article className={styles.card}>
          <h3>Can I photograph the product myself?</h3>
          <p>
            Yes, you can prepare your own captures and discuss them with us.
            Paid customer-capture fulfillment is not yet available. Read the
            capture guidelines before starting; no full dataset upload is
            required before payment by default.
          </p>
          <Link href="/learn/submission-checklist">
            Review the capture checklist
          </Link>
        </article>
        <article className={styles.card}>
          <h3>How long does production take?</h3>
          <p>
            Basic is estimated at {pilotPolicy.turnaround.basic}; E-commerce
            Ready at {pilotPolicy.turnaround.ecommerce}. {pilotPolicy.timing}{" "}
            Shipping transit is excluded.
          </p>
          <Link href="/learn/packaging-shipping">Prepare for shipping</Link>
        </article>
      </div>
    </section>
  );
}
