/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-domain.com"], // Add any domains you need for Image component
  },
  // Remove any eslint configuration from here if present
};

module.exports = nextConfig;
