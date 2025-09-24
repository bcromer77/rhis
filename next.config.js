// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ensure Next.js app router is enabled
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

