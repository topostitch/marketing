import Link from "next/link";
import { pilotPolicy as p } from "@/lib/fulfillment-policy";
import s from "@/app/marketing-layout.module.css";
export default function Suitability() {
  return (
    <section className={s.section} aria-label="Product suitability">
      <div className={s.sectionIntro}>
        <h2>Is your product a good fit?</h2>
        <p>
          These are general photogrammetry heuristics, not guarantees. Actual
          eligibility depends on materials, dimensions, weight, value and
          capture requirements.
        </p>
      </div>
      <div className={s.grid}>
        <article className={s.card}>
          <h3>Good candidates</h3>
          <p>
            Matte or textured surfaces, distinct visual features and solid,
            rigid geometry.
          </p>
        </article>
        <article className={s.card}>
          <h3>Challenging candidates</h3>
          <p>
            Smooth or uniform surfaces, repetitive patterns, deep recesses and
            thin or intricate features. Ask for assessment.
          </p>
        </article>
        <article className={s.card}>
          <h3>Specialized candidates</h3>
          <p>
            Highly reflective, transparent or translucent materials, deformable
            objects and extremely thin geometry. Request a specialized
            quotation.
          </p>
        </article>
      </div>
      <p className={s.note}>
        Standard pilot: up to {p.maxDimensionIn} × {p.maxDimensionIn} ×{" "}
        {p.maxDimensionIn} inches, {p.maxWeightLb} lbs and ${p.maxValueUsd}{" "}
        replacement value per product; {p.maxProducts} products per order.{" "}
        {p.area}. {p.exclusions}
      </p>
      <nav className={s.salesNav}>
        <Link href="/learn/product-suitability">
          Read the suitability guide
        </Link>
        <Link href="/order">Check your product</Link>
        <Link href="/request?offer=custom">Request specialized assessment</Link>
      </nav>
    </section>
  );
}
export function FulfillmentTerms() {
  return (
    <section
      id="fulfillment-terms"
      className={s.section}
      aria-label="Pilot fulfillment terms"
    >
      <div className={s.sectionIntro}>
        <h2>Before you order</h2>
        <p>
          Provisional pilot terms · {p.version}. Sandbox payments only. Final
          founder approval is required before production launch.
        </p>
      </div>
      <div className={`${s.grid} ${s.two}`}>
        <article className={s.card}>
          <h3>Shipping and value</h3>
          <p>{p.shipping}</p>
          <p>
            Maximum declared replacement value: ${p.maxValueUsd} per product.
            This limit is not a promise of insurance coverage. Shipping
            instructions follow verified payment and detailed intake; do not
            ship to an unconfirmed address.
          </p>
        </article>
        <article className={s.card}>
          <h3>Turnaround</h3>
          <p>
            Basic: {p.turnaround.basic}. E-commerce Ready:{" "}
            {p.turnaround.ecommerce}. {p.timing}
          </p>
        </article>
        <article className={s.card}>
          <h3>Quality and additional work</h3>
          <p>{p.quality}</p>
          <p>
            Your acknowledgment confirms that you have read the requirements. It
            does not waive TopoStitch’s fulfillment responsibilities.
          </p>
        </article>
        <article className={s.card}>
          <h3>Cancellations and refunds</h3>
          <p>{p.refunds}</p>
          <p>{p.costs}</p>
        </article>
      </div>
    </section>
  );
}
