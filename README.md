**[hannoeru.me](https://hannoeru.me)**

my personal website powered by [Nuxt v4](https://nuxt.com/)

`pnpm generate` or `pnpm build` creates the static site in `.output/public`.
`pnpm preview` serves these assets locally with Cloudflare's redirect and 404 rules.
Cloudflare Workers Builds runs `pnpm generate` and deploys the assets to `blog` with the root `wrangler.jsonc`.

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.
