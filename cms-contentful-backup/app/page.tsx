import Image from "next/image";
import { getPosts } from "@/lib/api";
// SOLUÇÃO: NENHUMA importação de tipo 'Entry' do 'contentful' é necessária aqui.
// O tipo será definido localmente com a estrutura de Contentful Entry.

// Definição do Tipo da Estrutura de Campos (Fields)
type PostFields = {
  title: string;
  excerpt: string;
  coverImage: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
  author: {
    fields?: {
      name?: string;
      picture?: {
        fields?: {
          file?: {
            url?: string;
          };
        };
      };
    };
  };
  date: string;
  slug: string;
};

// Definição da Estrutura COMPLETA de UMA ENTRADA do Contentful
// (Isto imita a interface Entry<T> sem a importação problemática)
interface ContentfulEntryStructure<T> {
  sys: {
    id: string;
    // Adicione outros campos 'sys' se necessário (createdAt, contentType, etc.)
  };
  fields: T;
}

// O tipo PostEntry usa a estrutura genérica com os seus campos
type PostEntry = ContentfulEntryStructure<PostFields>;

export default async function Home() {
  // AQUI: Tipagem forçada para o tipo definido localmente.
  // Isso deve finalmente resolver o erro TS2709, pois não há importação de 'contentful' a ser confundida.
  const posts = (await getPosts()) as PostEntry[];

  if (posts.length === 0) {
    return <p>Nenhum post encontrado.</p>;
  }

  const postElements = posts.map((post) => {
    // Agora o 'post' é reconhecido corretamente como PostEntry.
    const { title, excerpt, coverImage, author, date } = post.fields;
    const authorData = author?.fields;

    const coverUrl = coverImage?.fields?.file?.url
      ? "https:" + coverImage.fields.file.url
      : null;
    const authorPic = authorData?.picture?.fields?.file?.url
      ? "https:" + authorData.picture.fields.file.url
      : null;

    return (
      <article
        key={post.sys.id}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      >
        {coverUrl && (
          <div className="relative w-full h-64">
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-3">{excerpt}</p>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            {authorPic && (
              <Image
                src={authorPic}
                alt={authorData?.name || "Author"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {authorData?.name || "Desconhecido"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(date).toLocaleDateString("pt-PT", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-center mb-16 tracking-tight">
        Blog
      </h1>

      <div className="grid gap-16 md:grid-cols-2">{postElements}</div>
    </main>
  );
}
