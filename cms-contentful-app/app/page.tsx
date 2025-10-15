import { getEntries } from "../lib/api";

type AuthorFields = { name?: string };
type AuthorLink = {
  sys?: Record<string, unknown>;
  fields?: AuthorFields;
} | null;
type BlogFields = {
  sys: { id: string };
  fields: {
    title?: string;
    description?: string;
    author?: AuthorLink;
  };
};

function isAuthorLink(value: unknown): value is AuthorLink {
  if (value === null) return true;
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return "fields" in v;
}

export default async function Page() {
  const posts = await getEntries<BlogFields>("blogPage");

  return (
    <main>
      {posts.map((item) => {
        const title = String(item.fields?.title ?? "Sem título");
        let authorName = "Desconhecido";
        if (isAuthorLink(item.fields?.author)) {
          const author = item.fields?.author;
          if (author && typeof author.fields?.name === "string")
            authorName = author.fields.name;
        }
        return (
          <article key={item.sys.id}>
            <h2>{title}</h2>
            <p>Autor: {authorName}</p>
          </article>
        );
      })}
    </main>
  );
}
