import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/learn";
import Suitability from "@/components/suitability";
import s from "../marketing-layout.module.css";
export const metadata: Metadata = {
  title: "Learn 3D production",
  description:
    "Free product suitability, preparation, shipping and capture guidance from TopoStitch.",
  alternates: { canonical: "/learn" },
};
export default function Learn() {
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <p>LEARNING CENTER</p>
        <h1>A better capture starts here.</h1>
        <p>
          Practical guides for preparing products and capturing usable inputs.
          Free to read, with no email registration.
        </p>
        <nav className={s.salesNav}>
          <a href="#guides">Browse guides</a>
          <Link href="/insights">Insights: business and industry</Link>
          <Link href="/developers">Developers: future tools</Link>
        </nav>
        <p className={s.note}>
          Learn covers production tasks. Insights covers business value and
          research. Software documentation will cover released tools when
          supported releases are available.
        </p>
      </header>
      <section id="guides" className={s.section}>
        <div className={s.grid}>
          {guides.map((g) => (
            <article className={s.card} key={g.slug}>
              <p>{g.category}</p>
              <h2 style={{ fontSize: "1.4rem" }}>{g.title}</h2>
              <p>{g.description}</p>
              <Link href={`/learn/${g.slug}`}>Read the guide →</Link>
            </article>
          ))}
        </div>
      </section>
      <Suitability />
    </main>
  );
}
