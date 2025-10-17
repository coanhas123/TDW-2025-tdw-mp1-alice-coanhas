/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["images.ctfassets.net"], // necessário para imagens do Contentful
  },
};

module.exports = nextConfig;
