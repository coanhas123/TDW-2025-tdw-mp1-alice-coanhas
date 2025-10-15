import { getEntries } from "../lib/api";

type AuthorFields = { name?: string };
type BlogFields = {
  sys: { id: string };
  fields: {
    title?: string;
    description?: string;
    author?: { sys?: any; fields?: AuthorFields } | null;
  };
};

export default async function Page() {
  const posts = await getEntries<BlogFields>("blogPage");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((item) => {
          const title = String(item.fields?.title ?? "Sem título");
          const description = String(item.fields?.description ?? "Sem descrição");

          const authorName =
            item.fields?.author &&
            typeof item.fields.author === "object" &&
            typeof item.fields.author.fields?.name === "string"
              ? String(item.fields.author.fields.name)
              : "Desconhecido";

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
