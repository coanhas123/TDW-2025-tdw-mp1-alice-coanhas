/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // gera site estático com `next build`
  trailingSlash: true, // opcional: gera /page/ em vez de /page.html
  images: {
    unoptimized: true, // desativa next/image optimizations (não funcionam em export estático)
  },
};

module.exports = nextConfig;
