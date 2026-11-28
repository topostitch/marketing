import Link from "next/link";
import styles from "@/app/marketing-layout.module.css";

export default function ProductionCommitments() {
  return (
    <section
      className={styles.section}
      aria-labelledby="production-commitments"
    >
      <div className={styles.sectionIntro}>
        <p className={styles.salesLabel}>WORKING WITH TOPOSTITCH</p>
        <h2 id="production-commitments">
          Know what you’re getting. Know who’s responsible.
        </h2>
        <p>
          A useful 3D asset starts with a clear agreement about the product, the
          destination and the work needed to get there.
        </p>
      </div>
      <div className={styles.grid}>
        <article className={styles.card}>
          <h3>A defined deliverable</h3>
          <p>
            Choose a published package or agree on a custom scope. Review what’s
            included, the intended destination and the preparation requirements
            before work begins.
          </p>
          <Link href="/compare">Compare scope and deliverables</Link>
        </article>
        <article className={styles.card}>
          <h3>Accountability through delivery</h3>
          <p>
            TopoStitch corrects its own capture and processing errors at no
            additional charge. Work outside the agreed scope needs your approval
            and a quotation before it proceeds.
          </p>
          <Link href="/services#fulfillment-terms">
            Read the pilot service terms
          </Link>
        </article>
        <article className={styles.card}>
          <h3>A founder you can reach</h3>
          <p>
            Work directly with Jacob Galito during the pilot. His background
            spans product design, immersive technology and 12 years of U.S. Navy
            service.
          </p>
          <Link href="/about#founder-story">Meet the founder</Link>
        </article>
      </div>
      <p className={styles.note}>
        Launch preview: fulfillment policies are provisional and checkout uses
        Stripe sandbox. Customer-provided captures remain inquiry-only.
      </p>
    </section>
  );
}
