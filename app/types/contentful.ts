import type { EntrySkeletonType } from "contentful";

export interface PostFields {
  title: string;
  excerpt: string;
  date: string;
  author?: {
    fields?: {
      name?: string;
      picture?: {
        fields?: {
          file?: {
            url?: string;
          };
        };
      };
    };
  };
  coverImage?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
}

export type PostSkeleton = EntrySkeletonType<PostFields>;
