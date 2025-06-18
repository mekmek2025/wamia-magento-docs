/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/wamia-magento-docs" : "",
  basePath: process.env.NODE_ENV === "production" ? "/wamia-magento-docs" : "",
  // Ensure all dynamic routes are generated at build time
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
