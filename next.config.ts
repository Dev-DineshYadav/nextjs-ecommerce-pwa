import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /\.(?:css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'css-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.dummyjson\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\/_next\/dynamic-css-manifest\.json/i,
      handler: 'NetworkOnly', 
    },
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offline-cache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
});

export default nextConfig;