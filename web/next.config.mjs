/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/:path*',
        },
        {
          source: '/openapi.json',
          destination: 'http://localhost:8000/openapi.json',
        },
        {
          source: '/docs',
          destination: 'http://localhost:8000/docs',
        }
      ];
  },
};

export default nextConfig;
