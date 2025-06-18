/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Temporarily disable basePath to test if this fixes the routing
  // assetPrefix: '/wamia-magento-docs',
  // basePath: '/wamia-magento-docs'
}

module.exports = nextConfig
