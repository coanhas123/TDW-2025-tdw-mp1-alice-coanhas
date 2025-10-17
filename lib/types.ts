export interface PostEntry {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    excerpt: string;
    coverImage: {
      url?: string;
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
    author: {
      name?: string;
      picture?: {
        url?: string;
        fields?: {
          file?: {
            url?: string;
          };
        };
      };
    };
    date: string;
    slug: string;
  };
}
