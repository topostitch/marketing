import type { Metadata } from "next";
export const siteUrl = "https://www.topostitch.dev";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const founderId = `${siteUrl}/about#jacob-galito`;
export function productionIndexing() {
  return process.env.VERCEL_ENV === "production";
}
export function canonical(path: string) {
  return new URL(path, siteUrl).href;
}
export function pageMetadata({
  title,
  description,
  path,
  article,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  article?: { published?: string; modified: string };
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | TopoStitch`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: canonical(path) },
    robots: {
      index: productionIndexing() && !noindex,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical(path),
      siteName: "TopoStitch",
      locale: "en_US",
      type: article ? "article" : "website",
      ...(article
        ? {
            publishedTime: article.published,
            modifiedTime: article.modified,
            authors: [canonical("/about")],
          }
        : {}),
      images: [
        {
          url: canonical("/og-image.png"),
          width: 1200,
          height: 630,
          alt: "TopoStitch — 3D production services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [canonical("/og-image.png")],
    },
  };
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export type Crumb = { name: string; path: string };
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "TopoStitch",
      legalName: "TopoStitch LLC",
      url: siteUrl,
      logo: canonical("/brand/topostitch-mark-dark.svg"),
      description:
        "Supported 3D production services for ecommerce, augmented reality and interactive experiences.",
      email: "hello@topostitch.dev",
      founder: { "@id": founderId },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@topostitch.dev",
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "TopoStitch",
      url: siteUrl,
      publisher: { "@id": organizationId },
      inLanguage: "en-US",
    },
  ],
};
