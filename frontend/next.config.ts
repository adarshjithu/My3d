// next.config.ts
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint on build
  },
  typescript: {
    ignoreBuildErrors: true, // disables TypeScript error checks on build
  },
}

export default nextConfig
