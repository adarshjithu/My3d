import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Modern configuration (Next.js 13.4+)
  output: 'standalone',
  distDir: '.next',
  
  // For App Router (no longer experimental)
  appDir: true, // Move this to top level
  
  // Remove the old experimental block
  // experimental: {
  //   appDir: true, ← Remove this
  // },
};

export default nextConfig;