/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Reduce the number of cache layers
  experimental: {
    turbotrace: {
      contextDirectory: process.cwd(),
    },
  },

  // Disable SWC minify to reduce build complexity if needed
  swcMinify: true,
};

export default nextConfig;
