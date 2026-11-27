import type { Metadata } from "next";
import Link from "next/link";
import { capabilities } from "@/lib/capabilities";
import InterestForm from "@/components/interest-form";
import s from "../marketing-layout.module.css";
export const metadata: Metadata = {
  title: "Developers — future 3D production tools",
  description:
    "Follow TopoStitch’s local-first production tooling and automation direction. Future capabilities are not currently purchasable.",
  alternates: { canonical: "/developers" },
};
export default function Developers() {
  return (
    <main id="main-content" className={s.page}>
      <header className={s.salesIntro}>
        <p>DEVELOPERS & STUDIOS</p>
        <h1>Build once. Process at scale.</h1>
        <p>
          We’re developing local-first tools and repeatable workflows to
          simplify 3D production for developers, studios and organizations.
        </p>
        <p>
          Today, work with us through supported production services and scoped
          integration projects. The software below is future direction, not a
          product catalog.
        </p>
        <Link href="/partnerships">
          Discuss a workflow or enterprise requirement
        </Link>
      </header>
      <section className={s.section}>
        <div className={s.grid}>
          {capabilities.slice(2).map((c) => (
            <article className={s.card} key={c.id}>
              <p>{c.status}</p>
              <h2 style={{ fontSize: "1.4rem" }}>{c.name}</h2>
              <p>{c.detail}</p>
            </article>
          ))}
        </div>
        <p className={s.note}>
          In development means active implementation. Planned means roadmap
          scope without a release date. Exploring means discovery. No public
          software availability, enterprise readiness, air-gap readiness, CMMC
          compliance or government authorization is claimed. Status reviewed
          November 27, 2026.
        </p>
      </section>
      <section className={s.editorial}>
        <div className={s.sectionIntro}>
          <h2>Register your interests</h2>
          <p>
            Tell us which future capabilities matter. No software installation
            or payment is required.
          </p>
        </div>
        <InterestForm source="developers" initial="cli" />
      </section>
    </main>
  );
}
