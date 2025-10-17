export interface PostFields {
  title: string;
  excerpt: string;
  date: string;
  coverImage?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
  author?: {
    name?: string;
    picture?: {
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
  };
}

export interface Post {
  sys: {
    id: string;
  };
  fields: PostFields;
}
