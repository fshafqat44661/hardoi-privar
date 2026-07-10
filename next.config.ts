import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /** Allow remote images when CMS adds external URLs later */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
