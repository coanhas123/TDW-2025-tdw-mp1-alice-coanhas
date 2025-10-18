import { contentfulClient } from './contentful';

export async function getPosts() {
  const response = await contentfulClient.getEntries({
    content_type: 'post',
    include: 2, // inclui o autor dentro do post
  });
  return response.items;
}
