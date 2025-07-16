/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  trailingSlash: false,
  poweredByHeader: false,
};

module.exports = nextConfig;

