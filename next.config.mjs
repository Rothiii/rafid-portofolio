/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Webpack configuration to help with Windows caching issues
  webpack: (config, { dev, isServer }) => {
    // Reduce the number of cache files created
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        compression: 'gzip',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        maxMemoryGenerations: 1,
      };
    }
    return config;
  },
  
  swcMinify: true,
};

export default nextConfig;
