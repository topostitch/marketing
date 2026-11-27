import PaymentConfirmedEvent from "@/components/payment-confirmed-event";
import type { Metadata } from "next";
import Link from "next/link";
import { reconcilePilotPayment } from "@/lib/pilot-checkout";
import OrderIntake from "@/components/order-intake";
import { FulfillmentTerms } from "@/components/suitability";
import s from "../../marketing-layout.module.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Payment verification and intake",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function Complete({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const q = await searchParams;
  let paid = false;
  try {
    if (q.session_id) paid = await reconcilePilotPayment(q.session_id);
  } catch {}
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <h1>
          {paid ? "Sandbox payment verified" : "Payment is not yet verified"}
        </h1>
        <p>
          {paid
            ? "Complete the detailed intake below. No capture dataset is required before payment."
            : "A redirect alone does not confirm payment. Refresh this page after Stripe completes payment, or contact TopoStitch if the issue persists."}
        </p>
      </header>
      <section className={s.editorial}>
        {paid ? (
          <>
            <PaymentConfirmedEvent />
            <OrderIntake session={q.session_id!} />
          </>
        ) : (
          <Link href="/cart">Return to your cart</Link>
        )}
      </section>
      <FulfillmentTerms />
    </main>
  );
}
