/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://almarwazi.vercel.app/"],
  },
  // Remove any eslint configuration from here if present
  eslint: {
    // Only run ESLint on these directories
    dirs: ["app", "components", "lib", "utils"],
  },
};

module.exports = nextConfig;
