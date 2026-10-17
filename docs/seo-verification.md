# Canonical URLs and legacy redirects

`shared/legacy-redirects.ts` is the source for old article URL mappings.
Use decoded route-rule keys: encoded keys did not match requests in the
Cloudflare production build. Each old URL must return a permanent HTTP 301
redirect and must not produce a static HTML asset or sitemap entry.

Run after a production build:

```sh
pnpm build
pnpm test:seo
```

The check compares sitemap page URLs with the content routes, checks one
self-referencing canonical and a heading in every generated page, rejects
legacy HTML assets, and starts the built Worker with local Wrangler bindings.
It checks every old URL with upper- and lowercase percent escapes, query-string
preservation, its destination, and the archive filter canonical.

After deployment, test the same HTTP behavior against production:

```sh
SEO_BASE_URL=https://hannoeru.me pnpm test:seo
```

This still requires a local build for the artifact checks. The external URL
only changes the HTTP checks. The command does not deploy or change remote data.

In Search Console, inspect affected URL examples and compare the declared
canonical, Google-selected canonical, and last crawl date. Confirm that each
replacement is indexed before treating an old-URL exclusion as expected.
The October 12, 2026 notification's exact examples were not available during
the investigation, so this fix does not claim to explain every exclusion.
