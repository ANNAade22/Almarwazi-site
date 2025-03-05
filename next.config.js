/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "almarwazi.vercel.app",
      "ouebbxsskpmusqpsvlyy.supabase.co", // Added Supabase storage domain
    ],
  },
  eslint: {
    dirs: ["app", "components", "lib", "utils"],
  },
};

module.exports = nextConfig;
