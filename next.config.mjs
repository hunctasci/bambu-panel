/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "",
      },
    ],
  },
  publicRuntimeConfig: {
    staticFolder: "/uploads",
  },
};

export default nextConfig;
