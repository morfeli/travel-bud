/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["fastly.4sqi.net"],
  },
};

module.exports = nextConfig;
