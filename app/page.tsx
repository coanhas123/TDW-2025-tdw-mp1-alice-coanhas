import { Entry } from 'contentful';
import Image from "next/image";
import type { PostEntry } from "./lib/types";

import { Post } from "../types/contentful";
import { getPosts } from "./lib/api";


export default async function Home() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return <p>Nenhum post encontrado.</p>;
  }

  const destaque = posts[0];
  const demais = posts.slice(1);

  const dd = destaque.fields;
  const coverUrl = dd.coverImage?.fields?.file?.url
    ? "https:" + dd.coverImage.fields.file.url
    : null;
  const authorData = dd.author?.fields;
  const authorPic = authorData?.picture?.fields?.file?.url
    ? "https:" + authorData.picture.fields.file.url
    : null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Banner / Destaque */}
      <section className="space-y-8">
        {coverUrl && (
          <div className="relative w-full h-96">
            <Image
              src={coverUrl}
              alt={dd.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">{dd.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{new Date(dd.date).toLocaleDateString("pt-PT")}</span>
            <span>•</span>
            <div className="flex items-center gap-2">
              {authorPic && (
                <Image
                  src={authorPic}
                  alt={authorData?.name || ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{authorData?.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories / Posts secundários */}
      <section className="space-y-12">
        <h2 className="text-2xl font-semibold">More Stories</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {demais.map((post: any) => {
            const { id } = post.sys;
            const { title, date, author, coverImage } = post.fields;

            const url = coverImage?.fields?.file?.url
              ? "https:" + coverImage.fields.file.url
              : null;

            const authorData = author;
            const authorPic = authorData?.picture?.fields?.file?.url
              ? "https:" + authorData.picture.fields.file.url
              : null;

            return (
              <article key={id} className="space-y-4">
                {url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={url}
                      alt={title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{new Date(date).toLocaleDateString("pt-PT")}</span>
                    <span>•</span>
                    {authorPic && (
                      <Image
                        src={authorPic}
                        alt={authorData?.name || ""}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span>{authorData?.name}</span>
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
