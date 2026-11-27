import type { MetadataRoute } from "next";
import { canonical } from "@/lib/seo";
import { guides } from "@/content/learn";
import { servicePages } from "@/lib/service-pages";
import { insightArticles } from "@/content/insights";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "/",
      "/services",
      "/compare",
      "/about",
      "/privacy",
      "/learn",
      "/developers",
      "/insights",
      "/partnerships",
    ].map((path) => ({ url: canonical(path) })),
    ...Object.keys(servicePages).map((slug) => ({
      url: canonical(`/services/${slug}`),
    })),
    ...insightArticles.map((article) => ({
      url: canonical(`/insights/${article.slug}`),
      lastModified: article.dateModified,
    })),
    ...guides.map((guide) => ({
      url: canonical(`/learn/${guide.slug}`),
      lastModified: "2026-11-27",
    })),
  ];
}
