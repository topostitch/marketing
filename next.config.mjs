/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return ["/platform", "/stories", "/learn"].map(source => ({ source, destination: "/", permanent: true }));
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

