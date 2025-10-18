import { createClient } from 'contentful';

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

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});
