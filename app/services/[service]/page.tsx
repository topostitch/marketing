import { jsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import ServiceExplorer, {
  ProjectNextStep,
} from "@/components/service-explorer";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages, type ServiceSlug } from "@/lib/service-pages";
import styles from "../../commerce-validation.module.css";

type Props = { params: Promise<{ service: string }> };
function findService(slug: string) {
  return Object.hasOwn(servicePages, slug)
    ? servicePages[slug as ServiceSlug]
    : undefined;
}
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(servicePages).map((service) => ({ service }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const data = findService(service);
  if (!data) return {};
  return pageMetadata({
    title: data.title,
    description: data.description,
    path: `/services/${service}`,
  });
}
export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const data = findService(service);
  if (!data) notFound();
  const url = `https://www.topostitch.dev/services/${service}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: data.title,
        description: data.description,
        url,
        provider: {
          "@type": "Organization",
          name: "TopoStitch",
          url: "https://www.topostitch.dev",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.topostitch.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.topostitch.dev/services",
          },
          { "@type": "ListItem", position: 3, name: data.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.questions.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  return (
    <main id="main-content" className={`${styles.page} ${styles.servicePage}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(schema),
        }}
      />
      <nav aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/services">Services</Link> /{" "}
        <span aria-current="page">{data.title}</span>
      </nav>
      <section className={styles.commerceSection}>
        <p className={styles.kicker}>Independent ecommerce 3D services</p>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
        <a
          className={styles.formButton}
          href={`/request${data.platform ? `?platform=${encodeURIComponent(data.platform)}` : ""}`}
        >
          Ask about your product
        </a>
        <p>
          No payment is due to inquire. Eligible standard physical products can
          use sandbox checkout after qualification. Ask about non-standard
          materials, customer captures or custom workflows.
        </p>
      </section>
      {data.sections.map(([title, body]) => (
        <section className={styles.commerceSection} key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
      <section className={styles.commerceSection}>
        <h2>Choose a package</h2>
        <p>
          Basic digitization starts at $149 for physical capture, reconstruction
          and a checked digital model. E-commerce Ready starts at $299 and adds
          optimization and preparation for one agreed ecommerce destination.
          Eligible standard physical products can use sandbox checkout after
          qualification. Customer-provided captures remain inquiry-only. Inbound
          and return shipping are paid separately by the customer; specialized
          work and integration require a quote.
        </p>
        <p>
          <Link href="/checkout/basic">Buy Basic</Link> ·{" "}
          <Link href="/checkout/ecommerce">Buy E-commerce Ready</Link> ·{" "}
          <Link href="/compare">Compare services</Link>
        </p>
      </section>
      <section className={styles.commerceSection}>
        <h2>Frequently asked questions</h2>
        {data.questions.map(([q, a]) => (
          <details key={q} className={styles.serviceFaq}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section className={styles.commerceSection}>
        <h2>Platform guidance and evidence</h2>
        <ul>
          {data.sources.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <p>
          Platform requirements can change. We review applicable requirements
          when scoping your project.
        </p>
      </section>
      <ServiceExplorer current={service as ServiceSlug} inset />
      <ProjectNextStep platform={data.platform} inset />
    </main>
  );
}
