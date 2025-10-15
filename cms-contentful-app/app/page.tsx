import { getEntries } from "../lib/api";

type AuthorFields = { name?: string };
type AuthorLink = { sys?: Record<string, unknown>; fields?: AuthorFields } | null;
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
  if (!("fields" in v)) return false;
  const fields = v.fields as unknown;
  if (typeof fields !== "object" || fields === null) return false;
  return true;
}

export default async function Page() {
  const posts = await getEntries<BlogFields>("blogPage");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((item) => {
          const title = String(item.fields?.title ?? "Sem título");
          const description = String(item.fields?.description ?? "Sem descrição");

          let authorName = "Desconhecido";
          if (isAuthorLink(item.fields?.author)) {
            const author = item.fields?.author;
            if (author && typeof author.fields?.name === "string") {
              authorName = author.fields.name;
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

