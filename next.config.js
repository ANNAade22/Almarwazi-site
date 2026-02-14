/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'almarwazi.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'ouebbxsskpmusqpsvlyy.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Compression
  compress: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Experimental features for better performance

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroui/react', '@react-spring/web'],
  },
};

module.exports = nextConfig;
