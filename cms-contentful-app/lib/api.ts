import client from "./contentful";
import { Entry, EntrySkeletonType } from "contentful";

export async function getEntries<T extends EntrySkeletonType>(
  contentType: string
): Promise<Entry<T>[]> {
  const entries = await client.getEntries<T>({
    content_type: contentType,
  });
  return entries.items;
}
