import { createClient } from "contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error(
    "❌ Missing Contentful credentials. Check your .env.local file.",
  );
}

export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || "master",
});

export const contentfulPreviewClient = createClient({
  space: SPACE_ID,
  accessToken: PREVIEW_TOKEN || ACCESS_TOKEN,
  host: PREVIEW_TOKEN ? "preview.contentful.com" : "cdn.contentful.com",
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || "master",
});
