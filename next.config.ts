import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  reactStrictMode: true,
};

export default nextConfig;
