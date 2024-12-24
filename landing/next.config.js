/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/landing/',
  basePath: '/landing',
  trailingSlash: true,
}

module.exports = nextConfig
