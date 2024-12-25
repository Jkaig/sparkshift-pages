/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove assetPrefix and basePath as they're causing issues
  trailingSlash: true,
}

module.exports = nextConfig

