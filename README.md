**[hannoeru.me](https://hannoeru.me)**

my personal website powered by [Nuxt v4](https://nuxt.com/)

`pnpm generate` or `pnpm build` (the Nuxt `static` preset) creates the static site in `.output/public`.
`pnpm exec wrangler dev` serves these assets locally with Cloudflare's redirect and 404 rules.
Cloudflare Workers Builds runs `pnpm build` and deploys the assets to `blog` with the root `wrangler.jsonc`, which also has the empty `previews` block that `wrangler preview` needs for non-production branches.

## Notes

- `pnpm install` links skills from the pinned `nuxt-skills` dependency into `.agents/skills/` as `pnpm-*`. The approval is in `pnpm-workspace.yaml`.
- `@nuxt/docs` contains local Nuxt docs. Keep its exact version equal to the resolved `nuxt` version when you update dependencies.
- DevTools beta uses the nightly package with Devframe's MCP server. MCP is for development only. Run `pnpm dev`, press **Shift+Alt+D**, and approve the connection with the code in the terminal. Trust the project in pi so it reads `.pi/mcp.json`. Keep pi and the dev server on the same machine. Never expose the endpoint through a tunnel. Two overrides in `pnpm-workspace.yaml` pin published kit and assets packages because the locked nightly references unpublished versions.

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.
