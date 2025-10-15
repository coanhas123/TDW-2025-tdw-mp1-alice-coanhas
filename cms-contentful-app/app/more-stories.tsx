type Story = {
  sys?: { id?: string };
  fields?: {
    title?: string;
    slug?: string;
    coverImage?: {
      sys?: Record<string, unknown>;
      fields?: { file?: { url?: string } };
    } | null;
  };
};

type MoreStoriesProps = {
  posts?: Story[];
};

function safeTitle(post: Story) {
  return post.fields?.title ?? "Untitled";
}

export default function MoreStories({ posts = [] }: MoreStoriesProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No stories yet</div>;
  }

  return (
    <section>
      <h3>More stories</h3>
      <ul>
        {posts.map((post) => {
          const id = post.sys?.id ?? Math.random().toString(36).slice(2, 9);
          const title = safeTitle(post);
          const imageUrl = post.fields?.coverImage?.fields?.file?.url;
          return (
            <li key={id} style={{ marginBottom: 12 }}>
              <a href={post.fields?.slug ?? "#"}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {imageUrl ? (
                    // imagem externa pode precisar de http(s) prefix; assume url válida
                    <img
                      src={imageUrl}
                      alt={title}
                      width={80}
                      height={56}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{ width: 80, height: 56, background: "#ddd" }}
                    />
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
