/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove all path configurations to ensure clean export
  distDir: 'out',
}

module.exports = nextConfig

