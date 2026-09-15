/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // The sandboxed preview serves the dev server from a proxied e2b host.
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    // Imagery is served from Unsplash / Supabase via plain <img> tags, so no
    // remote loader is needed and the build never depends on the network.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
