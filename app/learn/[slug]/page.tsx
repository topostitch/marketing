import GuideEngagement from "@/components/guide-engagement";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, learningSources } from "@/content/learn";
import Suitability, { FulfillmentTerms } from "@/components/suitability";
import CoverageDiagram from "@/components/coverage-diagram";
import s from "../../marketing-layout.module.css";
export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  return g
    ? {
        title: g.title,
        description: g.description,
        alternates: { canonical: `/learn/${slug}` },
      }
    : {};
}
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    author: { "@type": "Organization", name: "TopoStitch" },
    dateModified: "2026-11-27",
    mainEntityOfPage: `https://www.topostitch.dev/learn/${slug}`,
  };
  return (
    <main id="main-content" className={s.page}>
      <GuideEngagement slug={slug} />
      <article className={s.editorial}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\u003c"),
          }}
        />
        <header className={s.editorialHeader}>
          <Link href="/learn">Learning Center</Link>
          <p>{g.category} · TopoStitch · Updated November 27, 2026</p>
          <h1>{g.title}</h1>
          <p className={s.intro}>{g.description}</p>
        </header>
        {g.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <ol style={{ listStyle: "decimal", paddingLeft: "1.3rem" }}>
              {section.steps.map((text) => (
                <li key={text} style={{ marginBlock: ".7rem" }}>
                  {text}
                </li>
              ))}
            </ol>
          </section>
        ))}
        {["coverage", "smartphone-capture", "camera-capture"].includes(
          slug,
        ) && <CoverageDiagram />}
        <section>
          <h2>References and scope</h2>
          <p>
            Our checklists describe the provisional TopoStitch pilot. These
            official resources provide broader technical context; their platform
            requirements do not establish TopoStitch eligibility or guarantee
            acceptance.
          </p>
          <ul>
            {learningSources.map((ref) => (
              <li key={ref.url}>
                <a href={ref.url}>{ref.label}</a>
              </li>
            ))}
          </ul>
          <p>
            Amazon documents a Seller app scanning pathway. Account and product
            availability must be checked in Amazon’s current guidance. We do not
            present Amazon’s app as a TopoStitch capture or acceptance
            guarantee.
          </p>
        </section>
        <section>
          <h2>Put the guide to work</h2>
          <p>
            Confirm fit before you capture or ship. Choose the output after you
            understand your starting point.
          </p>
          <nav>
            <Link href="/order">
              Check eligibility and choose a deliverable
            </Link>
            <Link href="/services">Explore services</Link>
            <Link href="/request?offer=custom">
              Ask about a difficult product
            </Link>
          </nav>
        </section>
        <section>
          <h2>Read next</h2>
          <nav>
            {guides
              .filter((x) => x.slug !== slug)
              .slice(0, 3)
              .map((x) => (
                <Link key={x.slug} href={`/learn/${x.slug}`}>
                  {x.title}
                </Link>
              ))}
          </nav>
        </section>
      </article>
      {slug === "product-suitability" && <Suitability />}
      {[
        "packaging-shipping",
        "product-preparation",
        "submission-checklist",
      ].includes(slug) && <FulfillmentTerms />}
    </main>
  );
}
