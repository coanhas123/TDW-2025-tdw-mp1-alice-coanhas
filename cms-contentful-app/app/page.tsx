import { getEntries } from "@/lib/api";

export default async function Home() {
  const posts = await getEntries("post");
  const categories = await getEntries("category");
  const navbars = await getEntries("navbarComponent");

  return (
    <main className="p-8 space-y-12">
      {/* POSTS */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <ul className="space-y-2">
          {posts.map((item: any) => (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{item.fields.title}</h2>
              <p>{item.fields.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CATEGORIES */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Categorias</h1>
        <ul className="space-y-2">
          {categories.map((item: any) => (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{item.fields.title}</h2>
              <p>{item.fields.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* WEBSITE NAVBAR */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Navbar do Website</h1>
        <ul className="space-y-2">
          {navbars.map((item: any) => (
            <li key={item.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{item.fields.title}</h2>
              <p>{item.fields.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
