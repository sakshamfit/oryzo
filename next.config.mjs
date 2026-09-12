/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Placeholder art ships as flat JPGs in /public. Nothing here needs a
    // remote loader, and keeping the list empty means the build never reaches
    // out to the network.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
