import type { Entry, EntrySkeletonType, Asset } from 'contentful';

export interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: 'author';
  fields: {
    name: string;
    picture: Asset;
  };
}

export interface PostSkeleton extends EntrySkeletonType {
  contentTypeId: 'post';
  fields: {
    title: string;
    slug: string;
    date: string;
    excerpt?: string;
    content: any;
    coverImage: Asset;
    author: Entry<AuthorSkeleton>;
  };
}

// Tipos convenientes
export type AuthorEntry = Entry<AuthorSkeleton>;
export type PostEntry = Entry<PostSkeleton>;
