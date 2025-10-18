import PostPreview from "./components/post-preview";

interface Post {
  slug: string;
  title: string;
  coverImage: { url: string; width: number; height: number };
  excerpt: string;
  date: string;
  author: {
    name: string;
    picture: { url: string; width: number; height: number };
  };
}

interface MoreStoriesProps {
  posts: Post[];
}

// Este componente estava a falhar a compilação porque era referenciado, mas não existia.
export default function MoreStories({ posts }: MoreStoriesProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-32">
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight text-gray-800">
        Mais Histórias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
