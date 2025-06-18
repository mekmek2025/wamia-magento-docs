/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only add basePath and assetPrefix for GitHub Pages production builds
  ...(isProd && isGitHubPages && {
    assetPrefix: '/wamia-magento-docs',
    basePath: '/wamia-magento-docs'
  })
}

module.exports = nextConfig
