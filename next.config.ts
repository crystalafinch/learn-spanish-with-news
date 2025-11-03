import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO: Revisit this configuration
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS hosts
      },
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP hosts
      },
    ],
  },
};

export default nextConfig;
