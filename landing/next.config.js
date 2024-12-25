/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable automatic static optimization
  experimental: {
    strictNextHead: true,
  },
}

module.exports = nextConfig

