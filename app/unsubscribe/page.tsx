import type { Metadata } from "next";
import UnsubscribeForm from "@/components/unsubscribe-form";
import s from "../marketing-layout.module.css";
export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function Unsubscribe({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; token?: string }>;
}) {
  const q = await searchParams;
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <h1>Your email preferences</h1>
      </header>
      <section className={s.editorial}>
        <UnsubscribeForm id={q.id || ""} token={q.token || ""} />
      </section>
    </main>
  );
}
