import client from "./contentful";

export async function getEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
