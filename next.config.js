/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/horizon",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

