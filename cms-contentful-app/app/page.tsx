import { getEntries } from "@/lib/api";
import { Entry, EntrySkeletonType } from "contentful";

// Tipos corretos para os campos
type PostSkeleton = EntrySkeletonType<{
  title: string;
  description: string;
}>;

type CategorySkeleton = EntrySkeletonType<{
  title: string;
  description: string;
}>;

type NavbarSkeleton = EntrySkeletonType<{
  title: string;
  description: string;
}>;

export default async function Home() {
  const posts: Entry<PostSkeleton>[] = await getEntries<PostSkeleton>("post");
  const categories: Entry<CategorySkeleton>[] = await getEntries<CategorySkeleton>("category");
  const navbars: Entry<NavbarSkeleton>[] = await getEntries<NavbarSkeleton>("navbarComponent");

  return (
    <main className="p-8 space-y-12">
      {/* POSTS */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <ul className="space-y-2">
          {posts.map((item) => (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">
                {typeof item.fields.title === "string" ? item.fields.title : "Sem título"}
              </h2>
              <p>
                {typeof item.fields.description === "string"
                  ? item.fields.description
                  : "Sem descrição"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CATEGORIES */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Categorias</h1>
        <ul className="space-y-2">
          {categories.map((item) => (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">
                {typeof item.fields.title === "string" ? item.fields.title : "Sem título"}
              </h2>
              <p>
                {typeof item.fields.description === "string"
                  ? item.fields.description
                  : "Sem descrição"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* NAVBAR */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Navbar do Website</h1>
        <ul className="space-y-2">
          {navbars.map((item) => (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">
                {typeof item.fields.title === "string" ? item.fields.title : "Sem título"}
              </h2>
              <p>
                {typeof item.fields.description === "string"
                  ? item.fields.description
                  : "Sem descrição"}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
