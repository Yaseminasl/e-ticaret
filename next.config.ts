import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kraftcover.shop",
      },
      {
        protocol: "https",
        hostname: "cdn03.ciceksepeti.com",
      },
    ],
  },
};

export default nextConfig;
