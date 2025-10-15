import { Entry, EntrySkeletonType, Link } from "contentful";
import { getEntries } from "@/lib/api";
import React from "react"; 

// --- Tipos para o content type "author" ---
type AuthorFields = {
  name?: string;
};
export type AuthorSkeleton = EntrySkeletonType<AuthorFields, "author">;

// --- Tipos para o content type "blogPage" ---
type BlogFields = {
  // Tornamos a tipagem ainda mais flexível para acomodar o objeto genérico do SDK
  title: string | undefined | { [key: string]: any }; 
  description: string | undefined | { [key: string]: any };
  
  // O campo 'author' pode ser qualquer um destes tipos, incluindo o objeto genérico do SDK
  author: Entry<AuthorSkeleton> | Link<"Entry"> | undefined | { [key: string]: any }; 
};
export type BlogSkeleton = EntrySkeletonType<BlogFields, "blogPage">;


/**
 * 💡 Type Guard (Guarda de Tipo) para verificar se o item é uma Entry resolvida.
 * Isto é crucial para Contentful, pois nem todos os links são resolvidos.
 * @param item O item potencial vindo de uma referência do Contentful.
 * @returns true se o item tiver a propriedade 'fields' (ou seja, resolvido).
 */
function isEntryResolved<T extends EntrySkeletonType>(
  item: Entry<T> | Link<"Entry"> | undefined
): item is Entry<T> {
  // Verifica se existe e se contém a propriedade 'fields' (característica de uma Entry resolvida)
  // Nota: Isto só é chamado se o valor for um Link ou Entry (ver abaixo na função Home)
  return !!item && 'fields' in item;
}


export default async function Home() {
  // Aqui assumimos que a tipagem de 'posts' está correta e a API funcionou
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
          
          // 💡 CORREÇÃO FINAL DEFINITIVA: Separamos a verificação de tipo e a atribuição final.
          
          const rawTitle = item.fields.title as unknown;
          const rawDescription = item.fields.description as unknown;

          // Usamos variáveis mutáveis e verificações 'if' para garantir que o tipo flua corretamente.
          let finalTitle: string = "Sem título";
          let finalDescription: string = "Sem descrição";

          if (typeof rawTitle === 'string') {
              finalTitle = rawTitle;
          }
          if (typeof rawDescription === 'string') {
              finalDescription = rawDescription;
          }

          // Atribuição final à variável constante tipada.
          // 💡 Adicionamos 'as string' final para resolver o erro TS2322, 
          // garantindo ao compilador que o valor é uma string.
          const title: string = finalTitle as string;
          const description: string = finalDescription as string; // Linha 93 corrigida

          const rawAuthor = item.fields.author;
          let authorName = "Desconhecido";
          
          // 💡 CORREÇÃO 2 (Autor): Usamos 'as unknown as T' para forçar a conversão
          if (rawAuthor && typeof rawAuthor === 'object' && 'sys' in rawAuthor) {
             // Força a conversão através de 'unknown' para evitar o erro de não-sobreposição.
            const authorLink = rawAuthor as unknown as Entry<AuthorSkeleton> | Link<"Entry">;
            
            if (isEntryResolved<AuthorSkeleton>(authorLink)) {
              // Se o Type Guard for verdadeiro, o TypeScript sabe que authorLink é Entry<AuthorSkeleton>
              authorName = String(authorLink.fields.name ?? "Desconhecido");
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