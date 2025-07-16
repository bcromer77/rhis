/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Define allowed origins or other server actions configurations
      allowedOrigins: ["localhost:3000"], // Adjust as needed
    },
  },
};

module.exports = nextConfig;
