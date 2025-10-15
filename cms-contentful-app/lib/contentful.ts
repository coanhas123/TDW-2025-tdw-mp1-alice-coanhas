import * as contentful from "contentful";

// As variáveis de ambiente devem estar definidas no seu arquivo .env.local
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  // Lança um erro se as credenciais estiverem faltando
  throw new Error("As variáveis de ambiente CONTENTFUL_SPACE_ID e CONTENTFUL_ACCESS_TOKEN devem ser definidas no .env.local.");
}

export const contentfulClient = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  // host: 'cdn.contentful.com', // Usa CDN para produção
});
