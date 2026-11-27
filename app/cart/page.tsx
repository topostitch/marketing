import type { Metadata } from "next";
import PilotCart from "@/components/pilot-cart";
import { FulfillmentTerms } from "@/components/suitability";
import s from "../marketing-layout.module.css";
export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};
export default function Cart() {
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <h1>Your cart</h1>
        <p>
          Each product retains its own capture method and eligibility
          confirmation.
        </p>
      </header>
      <section className={s.editorial}>
        <PilotCart />
      </section>
      <FulfillmentTerms />
    </main>
  );
}
