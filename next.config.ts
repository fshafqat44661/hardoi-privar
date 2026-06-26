import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /** Allow remote images when CMS adds external URLs later */
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
