/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESSENCIAL: Permite que o 'next build' gere a pasta 'out' para Netlify
  output: 'export',
  
  // Garante que a aplicação se comporte como uma Single Page Application (SPA)
  // e gera páginas HTML estáticas.
  trailingSlash: true, 

  // ... (outras configurações, se existirem)
};

module.exports = nextConfig;
