import { guides } from "@/content/learn";
import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { insightArticles } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = [
    "",
    "/services",
    "/compare",
    "/about",
    "/privacy",
    "/learn",
    "/developers",
    "/insights",
    "/partnerships",
  ];
  const services = Object.keys(servicePages).map((slug) => `/services/${slug}`);
  const articles = insightArticles.map(
    (article) => `/insights/${article.slug}`,
  );
  return [
    ...fixed,
    ...services,
    ...articles,
    ...guides.map((g) => `/learn/${g.slug}`),
  ].map((path) => ({
    url: `https://www.topostitch.dev${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/insights/") ? 0.7 : 0.8,
  }));
}
