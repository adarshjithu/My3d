import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add these important configurations:
  output: process.env.NEXT_OUTPUT_MODE === 'export' ? 'export' : undefined,
  images: {
    unoptimized: process.env.NEXT_OUTPUT_MODE === 'export', // Required for static exports
    domains: [], // Add any external image domains here
  },
  // For API routes (if using them)
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    externalResolver: true,
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // For internationalized routing (if needed)
  i18n: process.env.NEXT_PUBLIC_ENABLE_I18N === 'true' ? {
    locales: ['en', 'es'], // customize as needed
    defaultLocale: 'en',
  } : undefined,
}

export default nextConfig