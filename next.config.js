/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Ensure Next uses the project directory for tracing (avoid picking parent lockfile)
  outputFileTracingRoot: path.join(__dirname),
  // Skip TypeScript and ESLint blocking during builds (user requested)
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },
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
