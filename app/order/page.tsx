import type { Metadata } from "next";
import PilotOrder from "@/components/pilot-order";
import Suitability, { FulfillmentTerms } from "@/components/suitability";
import s from "../marketing-layout.module.css";
export const metadata: Metadata = {
  title: "Choose capture and deliverable",
  alternates: { canonical: "/order" },
  robots: { index: false, follow: true },
};
export default async function Order({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <h1>Start your product’s next dimension</h1>
        <p>
          Select capture, choose a deliverable and confirm fit. This preview
          uses Stripe sandbox payments only.
        </p>
      </header>
      <section className={s.editorial}>
        <PilotOrder
          initialCapture={q.capture === "captures" ? "captures" : "ship"}
          initialDeliverable={
            q.deliverable === "ecommerce" ? "ecommerce" : "basic"
          }
        />
      </section>
      <Suitability />
      <div id="terms">
        <FulfillmentTerms />
      </div>
    </main>
  );
}
