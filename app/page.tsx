import Image from "next/image";
import type { PostEntry } from "./lib/types";
import { getPosts } from "./lib/api";

export default async function Home() {
  const posts = (await getPosts()) as any as PostEntry[];

  if (!posts || posts.length === 0) {
    return <p>Nenhum post encontrado.</p>;
  }

  const destaque = posts[0];
  const demais = posts.slice(1);

  // --- Campos do post principal ---
  const dd = destaque.fields;

  const coverUrl =
    (dd.coverImage as any)?.fields?.file?.url
      ? "https:" + (dd.coverImage as any).fields.file.url
      : null;

  const authorData = dd.author?.fields as any;
  const authorPic =
    authorData?.picture?.fields?.file?.url
      ? "https:" + authorData.picture.fields.file.url
      : null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* === Destaque principal === */}
      <section className="space-y-8">
        {coverUrl && (
          <div className="relative w-full h-96">
            <Image
              src={coverUrl}
              alt={(dd.title as unknown as string) || ""}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            {(dd.title as unknown as string) || ""}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {new Date(dd.date as unknown as string).toLocaleDateString("pt-PT")}
            </span>
            <span>•</span>
            <div className="flex items-center gap-2">
              {authorPic && (
                <Image
                  src={authorPic}
                  alt={(authorData?.name as unknown as string) || ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{(authorData?.name as unknown as string) || ""}</span>
            </div>
          </div>
        </div>
      </section>

      {/* === Posts secundários === */}
      <section className="space-y-12">
        <h2 className="text-2xl font-semibold">More Stories</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {demais.map((item) => {
            const post = item as PostEntry;
            const { title, coverImage, date, author } = post.fields;

            const url =
              (coverImage as any)?.fields?.file?.url
                ? "https:" + (coverImage as any).fields.file.url
                : null;

            const authorFields = author?.fields as any;
            const authorPicUrl =
              authorFields?.picture?.fields?.file?.url
                ? "https:" + authorFields.picture.fields.file.url
                : null;

            return (
              <article key={post.sys.id} className="space-y-4">
                {url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={url}
                      alt={(title as unknown as string) || ""}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">
                    {(title as unknown as string) || ""}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>
                      {new Date(date as unknown as string).toLocaleDateString("pt-PT")}
                    </span>
                    <span>•</span>
                    {authorPicUrl && (
                      <Image
                        src={authorPicUrl}
                        alt={(authorFields?.name as unknown as string) || ""}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span>{(authorFields?.name as unknown as string) || ""}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
