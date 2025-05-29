/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ai-sports-almanac' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ai-sports-almanac/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/ai-sports-almanac' : '',
  },
}

module.exports = nextConfig
