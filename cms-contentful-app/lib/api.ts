import { Entry, EntrySkeletonType } from "contentful";
import { contentfulClient } from "./contentful";

/**
 * Busca entradas da Contentful e resolve referências.
 * O parâmetro 'include: 2' garante que as referências de nível 1 (como o autor)
 * sejam incluídas e resolvidas.
 * * @param contentType O ID do Content Type (e.g., "blogPage").
 * @returns Uma Promise com um array de entradas resolvidas.
 */
export async function getEntries<T extends EntrySkeletonType>(
  contentType: string
): Promise<Entry<T>[]> {
  try {
    const entries = await contentfulClient.getEntries<T>({
      content_type: contentType,
      // CORREÇÃO CRÍTICA: Resolve as referências (o campo 'author')
      include: 2, 
      // NOTE: O parâmetro 'order' foi removido para corrigir o erro TS2345,
      // pois o SDK é muito estrito sobre a tipagem de campos.
    });

    return entries.items;
  } catch (error) {
    console.error(`Erro ao buscar entradas para ${contentType}:`, error);
    // Retorna um array vazio para que o componente possa renderizar de forma segura
    return []; 
  }
}
