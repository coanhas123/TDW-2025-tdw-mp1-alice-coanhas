import client from "./contentful";

export async function getEntries<T = unknown>(contentType: string): Promise<T[]> {
  const entries = await client.getEntries({
    content_type: contentType,
    include: 2,
  });

  // Trata entries.items como unknown antes de converter para T[]
  return (entries.items as unknown) as T[];
}
