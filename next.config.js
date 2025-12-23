/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'lirp.cdn-website.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
