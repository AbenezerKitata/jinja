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
};

module.exports = nextConfig;
