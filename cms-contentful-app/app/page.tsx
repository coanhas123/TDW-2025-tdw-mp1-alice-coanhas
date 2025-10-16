import Image from "next/image";
import { getPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-center mb-16 tracking-tight">
        Blog
      </h1>

      <div className="grid gap-16 md:grid-cols-2">
        {posts.map((post: any) => {
          const { title, excerpt, coverImage, author, date, slug } = post.fields;
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
        })}
      </div>
    </main>
  );
}
