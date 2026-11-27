import type { Metadata } from "next";
import InterestForm from "@/components/interest-form";
import s from "../marketing-layout.module.css";
export const metadata: Metadata = {
  title: "Product updates and early-access interests",
  alternates: { canonical: "/updates" },
  robots: { index: false, follow: true },
};
export default async function Updates({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const q = await searchParams;
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <h1>Follow what matters to you.</h1>
        <p>
          One registration, multiple interests. Software plans may change;
          signing up is not a purchase or a promise of access.
        </p>
      </header>
      <section className={s.editorial}>
        <InterestForm
          initial={q.interest === "captures" ? "captures" : "production"}
          source={q.interest === "captures" ? "captures" : "updates"}
        />
      </section>
    </main>
  );
}
