import Link from "next/link";
import s from "@/app/marketing-layout.module.css";
export default function CapturePathways() {
  return (
    <section className={s.section} id="capture-method">
      <div className={s.sectionIntro}>
        <h2>Start with your product. Choose how to capture it.</h2>
        <p>
          Capture method describes how we receive the inputs. Your deliverable
          describes what we prepare for you.
        </p>
      </div>
      <div className={`${s.grid} ${s.two}`}>
        <article className={s.card}>
          <h3>Send us your product</h3>
          <p>
            TopoStitch handles physical capture, reconstruction, processing and
            preparation of your selected deliverable.
          </p>
          <ul>
            <li>
              <Link href="/learn/product-suitability">
                Object suitability guide
              </Link>
            </li>
            <li>
              <Link href="/learn/product-preparation">
                Product preparation guide
              </Link>
            </li>
            <li>
              <Link href="/learn/packaging-shipping">
                Packaging and shipping instructions
              </Link>
            </li>
            <li>
              <Link href="/compare">Package comparison</Link>
            </li>
          </ul>
          <Link className={s.button} href="/order?capture=ship">
            Select your deliverable
          </Link>
        </article>
        <article className={s.card}>
          <h3>Provide your captures</h3>
          <p>
            Photograph your product using our guidance. TopoStitch assesses the
            dataset for reconstruction and processing. Paid fulfillment is not
            yet available.
          </p>
          <ul>
            {[
              ["product-suitability", "Object suitability"],
              ["smartphone-capture", "Smartphone capture"],
              ["camera-capture", "DSLR and mirrorless capture"],
              ["lighting", "Lighting and reflections"],
              ["coverage", "Image coverage"],
              ["submission-checklist", "Capture submission checklist"],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link href={`/learn/${slug}`}>{label}</Link>
              </li>
            ))}
          </ul>
          <Link className={s.button} href="/order?capture=captures">
            Discuss your captures
          </Link>
        </article>
      </div>
    </section>
  );
}
