# Markdown content negotiation

## Behavior

A request for a page URL (`/`, `/posts`, `/posts/<slug>`, `/bookmarks`) gets Markdown when its `Accept` header prefers `text/markdown`. All other requests get the same static HTML as before. Both representations send `Vary: Accept`.

- Each page also has a direct Markdown URL: `/index.md`, `/posts.md`, `/posts/<slug>.md`, and `/bookmarks.md`. The HTML links to it with `<link rel="alternate" type="text/markdown">`.
- `/llms.txt` and `/llms-full.txt` list and contain the same Markdown.
- Redirects, missing pages, feeds, images, payloads, and other assets do not negotiate.
- Markdown for `/posts` lists every post. It does not apply the `?tags=` filter, because the static build cannot render one file for every tag combination.

## Components

| Part | Owner | Role |
| --- | --- | --- |
| `.md` files, alternate links, `llms.txt` | `nuxt-ai-ready`, included in `@nuxtjs/seo` | Writes a Markdown twin for each prerendered page from the Nuxt Content body. |
| `modules/page-markdown/` | This repository | Replaces the empty `<about-me>`, `<recent-posts>`, and `<list-posts>` tags in the home and archive Markdown. |
| `worker/` | This repository | Chooses HTML or Markdown from `Accept` and serves the matching static file. |
| `wrangler.jsonc` | This repository | Runs the Worker first only on page routes (`run_worker_first`). Other requests go straight to the assets. |

## Why these choices

The site uses the Nuxt `static` preset. No Nitro server runs in production, so Nitro middleware cannot negotiate. `nuxt-ai-ready` reports the same limit at build time and asks the deployment to negotiate on `Accept`.

`nuxt-ai-ready` serializes the Nuxt Content body by default. This keeps authored Markdown, code fences, and file names such as `js [main.js]`. Vue components in content do not run, so they become empty tags. Only the home page (`:AboutMe`, `:RecentPosts`) and the archive (`<ListPosts />`) use them.

The module option `contentSource: false` converts rendered HTML instead. A test build showed worse output: doubled bold markers (`****`), lost code languages, and dates joined to titles. The default source stays.

`modules/page-markdown/` uses the build-time `ai-ready:page:markdown` hook. The module writes the hook result to the `.md` file and to `llms-full.txt`. The hook reads post front matter from `content/posts/` and uses the Nuxt Content path rule: the numeric prefix and `.md` are removed. Markdown lists posts newest first by full timestamp. The HTML archive sorts by day, so posts from the same day can appear in a different order.

The Worker uses the maintained `negotiator` package for RFC 9110 quality values. An explicit `text/markdown;q=0` excludes Markdown. A missing or unrestricted `Accept` header returns HTML. When neither type is acceptable, the Worker returns HTML instead of 406, which RFC 9110 permits. [Accept](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.1). [Vary](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.5).

The Worker fetches the Markdown file with only the request method. HTML validators such as `If-None-Match` therefore cannot produce a Markdown 304. If no Markdown file exists, the Worker returns the normal asset response, so legacy redirects and 404 pages stay the same. A path with a trailing slash also goes to the assets, which redirect it to the canonical page.

Cloudflare's managed [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) converts HTML at the edge on paid plans. It would replace the authored source with converted HTML, so it is not used.

## Verification

`pnpm test` covers `Accept` selection (`tests/markdown-negotiation.test.ts`) and the home and archive expansion (`tests/page-markdown.test.ts`).

After `pnpm build`, `pnpm test:agent` starts `wrangler dev` with the root `wrangler.jsonc`, so the real Worker and the asset rules run. It checks format selection, HEAD, `Vary`, the served bytes against the `.md` files, validators, redirects, trailing slashes, 404 pages, non-page assets, other methods, and the robots `Content-Signal` line. Set `BLOG_URL` to check a deployed site instead.
