/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/homepage',
  assetPrefix: '/homepage/',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;