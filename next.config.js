/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "xsgames.co",
      "picsum.photos",
      "images.unsplash.com",
      "ouebbxsskpmusqpsvlyy.supabase.co", // Added Supabase storage domain
    ],
  },
};

module.exports = nextConfig;
