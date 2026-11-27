import { pageMetadata, siteSchema, siteUrl } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  ...pageMetadata({
    title: "3D Production Services",
    description:
      "Create, optimize and deploy 3D product assets for ecommerce, augmented reality and interactive experiences.",
    path: "/",
  }),
  metadataBase: new URL(siteUrl),
  applicationName: "TopoStitch",
  icons: {
    icon: { url: "/favicon.svg?v=3", type: "image/svg+xml", sizes: "any" },
    apple: "/apple-icon.png",
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(process.env.GOOGLE_SITE_VERIFICATION
            ? { google: process.env.GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.BING_SITE_VERIFICATION
            ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
            : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fafaf8" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        <JsonLd data={siteSchema} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        >
          Skip to main content
        </a>
        <noscript>
          <style>{`.scroll-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <Header />
        {children}
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
