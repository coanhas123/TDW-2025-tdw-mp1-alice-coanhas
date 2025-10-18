import Image from "next/image";
import { getPosts } from "./lib/api";
import type { Entry } from "contentful";
import type { PostSkeleton } from "./types/contentful";

import type { PostFields } from "./types/contentful";

type PostEntry = Entry<PostSkeleton>;

export default async function Home() {
  const posts = await getPosts(); // retorna Entry<any>[]
  const typedPosts = posts as unknown as PostEntry[];

  if (!typedPosts?.length) {
    return <p className="text-center py-10">Nenhum post encontrado.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* === Post em destaque === */}
      <FeaturedPost post={typedPosts[0]} />

      {/* === Lista de posts secundários === */}
      <section className="space-y-12">
        <h2 className="text-2xl font-semibold">Mais histórias</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {typedPosts.slice(1).map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}

function FeaturedPost({ post }: { post: PostEntry }) {
  const { title, date, coverImage, author } = post.fields;

  const coverFields = coverImage?.fields as NonNullable<
    PostFields["coverImage"]
  >["fields"];
  const coverUrl = coverFields?.file?.url
    ? "https:" + coverFields.file.url
    : null;

  const authorFields = author?.fields as NonNullable<
    PostFields["author"]
  >["fields"];
  const authorPic = authorFields?.picture?.fields?.file?.url
    ? "https:" + authorFields.picture.fields.file.url
    : null;

  return (
    <section className="space-y-8">
      {coverUrl && (
        <div className="relative w-full h-96">
          <Image
            src={coverUrl}
            alt={typeof title === "string" ? title : "Imagem"}
            fill
            className="object-cover rounded-xl"
            unoptimized
          />
        </div>
      )}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          {typeof title === "string" ? title : "Sem título"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            {typeof date === "string"
              ? new Date(date).toLocaleDateString("pt-PT")
              : "Data desconhecida"}
          </span>
          <span>•</span>
          <div className="flex items-center gap-2">
            {authorPic && (
              <Image
                src={authorPic}
                alt={authorFields?.name ?? "Autor"}
                width={32}
                height={32}
                className="rounded-full"
                unoptimized
              />
            )}
            <span>
              {typeof authorFields?.name === "string"
                ? authorFields.name
                : "Autor desconhecido"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: PostEntry }) {
  const { title, date, coverImage, author } = post.fields;

  const coverFields = coverImage?.fields as NonNullable<
    PostFields["coverImage"]
  >["fields"];
  const coverUrl = coverFields?.file?.url
    ? "https:" + coverFields.file.url
    : null;

  const authorFields = author?.fields as NonNullable<
    PostFields["author"]
  >["fields"];
  const authorPic = authorFields?.picture?.fields?.file?.url
    ? "https:" + authorFields.picture.fields.file.url
    : null;

  return (
    <article className="space-y-4">
      {coverUrl && (
        <div className="relative w-full h-48">
          <Image
            src={coverUrl}
            alt={typeof title === "string" ? title : "Imagem do post"}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-medium">
          {typeof title === "string" ? title : "Sem título"}
        </h3>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>
            {typeof date === "string"
              ? new Date(date).toLocaleDateString("pt-PT")
              : "Data desconhecida"}
          </span>
          <span>•</span>
          {authorPic && (
            <Image
              src={authorPic}
              alt={authorFields?.name ?? "Autor"}
              width={24}
              height={24}
              className="rounded-full"
              unoptimized
            />
          )}
          <span>
            {typeof authorFields?.name === "string"
              ? authorFields.name
              : "Autor desconhecido"}
          </span>
        </div>
      </div>
    </article>
  );
}
