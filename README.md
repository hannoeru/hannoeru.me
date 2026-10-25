**[hannoeru.me](https://hannoeru.me)**

my personal website powered by [Nuxt v4](https://nuxt.com/)

`pnpm generate` or `pnpm build` (the Nuxt `static` preset) creates the static site in `.output/public`.
`pnpm exec wrangler dev --experimental-new-config` serves these assets locally with Cloudflare's redirect and 404 rules.
The Worker is configured in `cloudflare.config.ts` and `wrangler.config.ts`.
Cloudflare Workers Builds builds with `pnpm build && pnpm exec cf-wrangler build` and deploys with `pnpm exec cf deploy --prebuilt`.
Non-production branches set `CLOUDFLARE_PREVIEW_BUILD=true` for the build and deploy with `pnpm exec cf previews deploy --prebuilt`.

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.
