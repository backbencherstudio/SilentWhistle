import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "debate-object-worthy-scoop.trycloudflare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prisoners-categories-retail-groundwater.trycloudflare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cathedral-cathedral-life-richardson.trycloudflare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
