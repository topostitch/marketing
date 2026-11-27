import type { MetadataRoute } from "next";
import { productionIndexing, siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  // Wildcard includes search crawlers such as Googlebot, Bingbot and OAI-SearchBot.
  // Training-bot permissions are unchanged; no separate training policy is inferred.
  return productionIndexing()
    ? {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
      }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
