
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@shared/client"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd() + '/src',
      '@shared': '../../shared/src'
    };
    return config;
  }
};

export default nextConfig;
