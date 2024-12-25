/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove all redirects and path prefixes
  trailingSlash: true,
}

module.exports = nextConfig
