/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // substitui o antigo next export
  images: {
    unoptimized: true, // evita problemas com o Image Optimization em export estático
  },
  reactStrictMode: true,
};

export default nextConfig;