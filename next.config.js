/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["almarwazi.vercel.app"],
  },
  eslint: {
    dirs: ["app", "components", "lib", "utils"],
  },
};

module.exports = nextConfig;
