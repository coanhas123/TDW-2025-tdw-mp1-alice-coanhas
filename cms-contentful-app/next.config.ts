/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESSENCIAL para a Geração Estática (Static Export)
  // Esta linha diz ao 'next build' para gerar uma pasta 'out'
  // em vez do padrão '.next/standalone'.
  output: 'export', 
};

module.exports = nextConfig;

