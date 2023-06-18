/** @type {import('next').NextConfig} */
// next.config.js
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'uploadthing.com',
      },
    ],
  },
}
