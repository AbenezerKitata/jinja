/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // loader: "custom",
    // loaderFile: "./supabase-image-loader.ts"
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    project: process.env.NODE_ENV || "development",
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
