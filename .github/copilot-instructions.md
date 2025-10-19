### Quick context

- This is a Next.js (App Router) site designed to be statically exported (see `next.config.mjs` — output: "export").
- Content and images are fetched from Contentful using `app/lib/contentful.ts` and `app/lib/api.ts`.

### What you need to know to be productive

- Entry points: `app/page.tsx` (home list + featured post), `app/layout.tsx` (global layout/styles).
- Data flow: `app/page.tsx` calls `getPosts()` from `app/lib/api.ts` which uses `contentfulClient` in `app/lib/contentful.ts`.
- Images are used with `next/image` but the project disables optimization for static export (`unoptimized: true`) and often prefixes Contentful urls with `https:`.
- Static export: the app is configured for `next export`. Avoid server-only Next.js primitives (API routes, ISR) unless you change `next.config.mjs`.

### Build / dev / test commands (from `package.json`)

- Start dev server: `npm run dev` (Next dev)
- Build: `npm run build` (Next build configured for export)
- Export static site: `npm run export` (runs `next export`)
- Run unit tests: `npm test` (uses Jest; see `__tests__/sum.test.ts` for example)
- Lint: `npm run lint` (ESLint config at project root)

### Environment & integration notes

- Contentful credentials are read from environment variables: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_PREVIEW_ACCESS_TOKEN (see `app/lib/contentful.ts`).
- `app/lib/contentful.ts` constructs two clients (regular + preview). Code expects `getEntries({ content_type: 'post', include: 2 })` shape.

### Patterns & conventions (concrete examples)

- Type casting: code often casts Contentful responses to stronger types. Example: `const typedPosts = posts as unknown as PostEntry[]` in `app/page.tsx`.
- Defensive rendering: fields may be optional; code checks types at render-time (e.g., `typeof title === 'string' ? title : 'Sem título'`). Follow this pattern when adding components.
- Images: use `.file.url` from Contentful entries and prefix with `https:` if present. Use `unoptimized` on `next/image` when rendering these urls.

### When modifying data fetching or rendering

- Keep static-export constraints in mind. If you introduce server-only features (dynamic routes, API routes, server components relying on runtime-only APIs), update `next.config.mjs`.
- When changing Contentful queries, preserve `include: 2` if you rely on nested author objects in the same request.

### Tests and small examples

- Unit tests use Jest. Small example: `__tests__/sum.test.ts` tests `sum.ts`. Add new unit tests under `__tests__/` and run `npm test`.

### Files to open first when debugging

- `app/page.tsx` — primary place to understand page rendering and how posts are mapped to components
- `app/lib/contentful.ts` — Contentful client and types
- `app/lib/api.ts` — abstraction used by pages to fetch posts
- `next.config.mjs` — confirms static export and image constraints

If anything above is unclear or you'd like the instructions expanded to cover testing CI (CircleCI/Netlify) or local env setup, tell me what to include.
