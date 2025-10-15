import { Entry, EntrySkeletonType, Link } from "contentful";
import { getEntries } from "@/lib/api";
import React from "react"; 

// --- Tipos para o content type "author" ---
type AuthorFields = {
  name: string;
};
export type AuthorSkeleton = EntrySkeletonType<AuthorFields, "author">;

// --- Tipos para o content type "blogPage" ---
type BlogFields = {
  // 💡 Tipagem ajustada para satisfazer o linter e o SDK
  title: string | undefined | { [key: string]: unknown }; 
  description: string | undefined | { [key: string]: unknown };
  
  author: Entry<AuthorSkeleton> | Link<"Entry"> | undefined | { [key: string]: unknown }; 
};
export type BlogSkeleton = EntrySkeletonType<BlogFields, "blogPage">;


/**
 * 💡 Type Guard (Guarda de Tipo) para verificar se o item é uma Entry resolvida.
 */
function isEntryResolved<T extends EntrySkeletonType>(
  item: Entry<T> | Link<"Entry"> | undefined
): item is Entry<T> {
  // Verifica se existe e se contém a propriedade 'fields' (característica de uma Entry resolvida)
  return !!item && 'fields' in item;
}

/**
 * Helper function para extrair com segurança um valor de string de um campo Contentful, 
 * explicitamente lidando com o tipo de objeto genérico problemático.
 * @param value O valor de campo bruto do Contentful (tratado como 'unknown' para evitar erros).
 * @param fallback A string a retornar se o valor não for uma string válida.
 * @returns Uma string garantida.
 */
function getFieldString(value: unknown, fallback: string): string {
  if (typeof value === 'string') {
    return value;
  }
  // Para qualquer outro valor (objeto Contentful problemático, undefined, null),
  // retornamos o fallback.
  return fallback;
}


export default async function Home() {
  const posts: Entry<BlogSkeleton>[] = await getEntries<BlogSkeleton>("blogPage");

  if (posts.length === 0) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-red-500">
          Não foi possível carregar as publicações. Verifique as credenciais, o Content Type ID ou se há conteúdo publicado.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((item) => {
          
          // 💡 Correção de campos de topo de nível
          const title: string = getFieldString(item.fields.title as unknown, "Sem título");
          const description: string = getFieldString(item.fields.description as unknown, "Sem descrição");

          const rawAuthor = item.fields.author;
          let authorName = "Desconhecido";
          
          if (rawAuthor && typeof rawAuthor === 'object' && 'sys' in rawAuthor) {
            const authorLink = rawAuthor as unknown as Entry<AuthorSkeleton> | Link<"Entry">;
            
            if (isEntryResolved<AuthorSkeleton>(authorLink)) {
              // 💡 CORREÇÃO DA LINHA 91: Usa getFieldString para extrair o campo 'name' 
              // de forma segura, contornando o objeto problemático do Contentful.
              authorName = getFieldString(authorLink.fields.name, "Desconhecido");
            }
          }


          return (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mb-2">{description}</p>
              <p className="text-sm text-gray-600">Autor: {authorName}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}