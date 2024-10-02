/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  publicRuntimeConfig: {
    staticFolder: "/uploads",
  },
};

export default nextConfig;
