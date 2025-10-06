/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Ensure Next uses the project directory for tracing (avoid picking parent lockfile)
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
};

module.exports = nextConfig;
