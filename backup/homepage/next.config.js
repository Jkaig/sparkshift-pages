/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/landing',
  assetPrefix: '/landing/',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;