import { fileURLToPath } from 'node:url';
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return ["/platform", "/stories"].map(source => ({ source, destination: "/", permanent: true }));
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

