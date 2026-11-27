import { jsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleEngagement from "@/components/insights/article-engagement";
import TrackedLink from "@/components/insights/tracked-link";
import styles from "@/app/marketing-layout.module.css";
import { getInsight, insightArticles } from "@/content/insights";

const site = "https://www.topostitch.dev";

export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    article: {
      published: article.datePublished,
      modified: article.dateModified,
    },
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();
  const url = `${site}/insights/${article.slug}`;
  const related = article.relatedArticles
    .map(getInsight)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: url,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: { "@type": "Organization", name: "TopoStitch", url: site },
        publisher: { "@type": "Organization", name: "TopoStitch", url: site },
        inLanguage: "en-US",
        articleSection: article.category,
        keywords: [
          article.category,
          article.audience,
          "3D product models",
          "3D commerce",
        ],
        citation: article.sources.map((source) => source.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: `${site}/insights`,
          },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
  return (
    <main id="main-content" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <article className={`${styles.editorial} ${styles.article}`}>
        <ArticleEngagement slug={article.slug} />
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/insights">Insights</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{article.title}</span>
        </nav>
        <header className={styles.editorialHeader}>
          <p className={styles.articleCategory}>
            {article.category} · {article.readMinutes} min read
          </p>
          <h1>{article.title}</h1>
          <p className={styles.articleIntro}>{article.intro}</p>
          <p className={styles.articleByline}>
            By TopoStitch · Published{" "}
            <time dateTime={article.datePublished}>
              {formatDate(article.datePublished)}
            </time>{" "}
            · Reviewed{" "}
            <time dateTime={article.dateModified}>
              {formatDate(article.dateModified)}
            </time>
          </p>
        </header>
        <aside className={styles.answerBox} aria-label="Short answer">
          <strong>In brief</strong>
          <p>{article.description}</p>
        </aside>
        <div className={styles.articleBody}>
          {article.sections.map((section, sectionIndex) => (
            <section
              key={section.heading}
              aria-labelledby={`section-${sectionIndex}`}
            >
              <h2 id={`section-${sectionIndex}`}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {paragraph.text}
                  {paragraph.sources?.map((sourceNumber) => (
                    <sup className={styles.sourceMarker} key={sourceNumber}>
                      <a
                        href={`#source-${sourceNumber + 1}`}
                        aria-label={`Source ${sourceNumber + 1}`}
                        data-analytics-source
                      >
                        {sourceNumber + 1}
                      </a>
                    </sup>
                  ))}
                </p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <section className={styles.sources} aria-labelledby="sources-heading">
          <h2 id="sources-heading">Sources and notes</h2>
          <ol>
            {article.sources.map((source, index) => (
              <li id={`source-${index + 1}`} key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                </a>{" "}
                <span>— {source.publisher}</span>
                {source.note && <p>{source.note}</p>}
              </li>
            ))}
          </ol>
          <p className={styles.note}>
            Sources checked November 26, 2026. Platform requirements can change;
            check the publisher’s current documentation before production.
          </p>
        </section>
        <section
          className={styles.articleCta}
          aria-labelledby="article-cta-heading"
        >
          <h2 id="article-cta-heading">Take the next step</h2>
          <p>
            Start with the product, file, or workflow question you need to
            solve. TopoStitch’s fixed-price packages start at $149 for Basic and
            $299 for E-commerce Ready; specialized and integration work is
            scoped separately.
          </p>
          <TrackedLink
            className={styles.button}
            href={article.cta.href}
            eventLabel={`insight:${article.slug}`}
          >
            {article.cta.label}
          </TrackedLink>
        </section>
        {related.length > 0 && (
          <nav
            className={styles.relatedArticles}
            aria-labelledby="related-heading"
          >
            <h2 id="related-heading">Related insights</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <p className={styles.note}>
          <Link href="/insights">Browse all insights</Link>
        </p>
      </article>
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}
