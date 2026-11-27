import Breadcrumbs from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "@/app/marketing-layout.module.css";
import { insightArticles, insightCategories } from "@/content/insights";

export const metadata: Metadata = pageMetadata({
  title: "Insights on 3D Commerce & Product Models",
  description:
    "Source-linked insights on 3D product models, ecommerce measurement, Shopify, Amazon and agency production workflows.",
  path: "/insights",
});

export default function InsightsPage() {
  const grouped = insightCategories
    .map((category) => ({
      category,
      articles: insightArticles.filter(
        (article) => article.category === category,
      ),
    }))
    .filter((group) => group.articles.length);
  return (
    <main id="main-content" className={styles.page}>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
      />
      <section className={styles.salesIntro} aria-labelledby="insights-title">
        <p className={styles.salesLabel}>TOPOSTITCH INSIGHTS</p>
        <h1 id="insights-title">Practical answers for product 3D.</h1>
        <p>
          Clear guides for deciding what to model, how to prepare it, and how to
          evaluate 3D product experiences. Research claims link to their sources
          and note their limits.
        </p>
        <nav className={styles.categoryNav} aria-label="Insight categories">
          {grouped.map(({ category }) => (
            <a key={category} href={`#${categoryId(category)}`}>
              {category}
            </a>
          ))}
        </nav>
      </section>
      {grouped.map(({ category, articles }) => (
        <section
          key={category}
          id={categoryId(category)}
          className={styles.section}
          aria-labelledby={`${categoryId(category)}-heading`}
        >
          <div className={styles.sectionIntro}>
            <h2 id={`${categoryId(category)}-heading`}>{category}</h2>
          </div>
          <div className={`${styles.grid} ${styles.two}`}>
            {articles.map((article) => (
              <article className={styles.card} key={article.slug}>
                <p className={styles.articleCategory}>
                  {article.category} · {article.readMinutes} min read
                </p>
                <h3>
                  <Link href={`/insights/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p>{article.description}</p>
                <Link
                  href={`/insights/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
      <section className={styles.section} aria-labelledby="insights-cta">
        <div className={styles.action}>
          <h2 id="insights-cta">Need help with a product or workflow?</h2>
          <p>
            Compare the current services and starting prices, or talk with us
            about a project that needs a custom scope.
          </p>
          <Link className={styles.button} href="/services">
            Explore 3D services
          </Link>
        </div>
      </section>
    </main>
  );
}

function categoryId(category: string) {
  return `category-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
}
