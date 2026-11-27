import { fileURLToPath } from "node:url";
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return process.env.VERCEL_ENV === "production"
      ? [
          "/api/:path*",
          "/order/:path*",
          "/cart",
          "/checkout/:path*",
          "/request",
          "/updates",
          "/unsubscribe",
        ].map((source) => ({
          source,
          headers: [{ key: "X-Robots-Tag", value: "noindex" }],
        }))
      : [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex" }],
          },
        ];
  },
  async redirects() {
    return [
      { source: "/platform", destination: "/developers", permanent: true },
      { source: "/stories", destination: "/insights", permanent: true },
    ];
  },
  images: {
    formats: ["image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
