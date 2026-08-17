import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;