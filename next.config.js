/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wamia-magento-docs' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/wamia-magento-docs' : ''
}

module.exports = nextConfig
