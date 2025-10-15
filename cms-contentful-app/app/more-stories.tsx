// Path: cms-contentful-app/app/more-stories.tsx
import Image from "next/image";

type Story = {
  sys?: { id?: string };
  fields?: {
    title?: string;
    slug?: string;
    coverImage?: { fields?: { file?: { url?: string } } } | null;
  };
};

type MoreStoriesProps = {
  posts?: Story[] | null;
  className?: string;
};

export default function MoreStories({ posts = [], className }: MoreStoriesProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className={className}>No stories yet</div>;
  }

  return (
    <section className={className}>
      <h3>More stories</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => {
          const id = post.sys?.id ?? Math.random().toString(36).slice(2, 9);
          const title = post.fields?.title ?? "Untitled";
          const slug = post.fields?.slug ?? "#";
          const imageUrl = post.fields?.coverImage?.fields?.file?.url;
          const src = imageUrl ? (imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl) : null;

          return (
            <li key={id} style={{ marginBottom: 12 }}>
              <a href={slug} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {src ? (
                    <Image
                      src={src}
                      alt={title}
                      width={120}
                      height={80}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                      unoptimized={true}
                    />
                  ) : (
                    <div style={{ width: 120, height: 80, background: "#ddd", borderRadius: 6 }} />
                  )}
                  <span>{title}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
