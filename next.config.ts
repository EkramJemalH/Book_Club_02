import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure webpack for HMR
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Fix WebSocket configuration for HMR
      config.devServer = {
        ...config.devServer,
        client: { 
          webSocketURL: 'auto://0.0.0.0:0/_next/webpack-hmr',
          overlay: {
            errors: true,
            warnings: false,
          },
        },
        allowedHosts: 'all',
        hot: true,
        liveReload: true,
      };
    }
    return config;
  },

  // Allow images from external domains (for Open Library covers)
  images: {
    domains: ['covers.openlibrary.org', 'books.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Disable strict mode if causing issues
  reactStrictMode: false,

  // Enable experimental features if needed
  experimental: {
    // If you're using Turbopack
    // turbopack: {
    //   resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    // },
  },
};

export default nextConfig;