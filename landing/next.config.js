/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'sparkshift.app'],
  },
  trailingSlash: true,
}

module.exports = nextConfig

