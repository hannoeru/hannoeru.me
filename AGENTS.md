# AGENTS.md

This is a single-package Nuxt site. `AGENTS.md` is the project instruction file.
The project includes config for pi. Other agents can use the setup prompt in `README.md`.
Before you change Nuxt code, read the matching page in `node_modules/@nuxt/docs/`.
For error codes, read `node_modules/@nuxt/docs/errors/`.

## DevTools

- Follow the DevTools note in [README.md](README.md#notes). Trust the project before pi reads `.pi/mcp.json`.
- Use `devframe_connect_list-instances` first, then `devframe_connect_call-tool` for the selected project instance.
- Keep the client and the dev server on the same machine. MCP is for development only. Never expose the endpoint through a tunnel.
- The kit and assets overrides apply only to the locked nightly. Check published sibling versions before an update.

## Commands

- Use pnpm only. Install dependencies with `pnpm install`.
- Before you finish, run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build`.
- Use `pnpm lint:fix` for lint fixes.
- Check for an existing dev server before you start one. Call server routes with `pnpm nuxt curl /api/...`.
- Search the docs with `pnpm nuxt docs "<topic>"`.

## Rules

- Preserve the app's auto-imports, route conventions, TypeScript settings, and experimental flags.
- pnpm links skills as `pnpm-*` in `.agents/skills/`. Do not edit those links.

## Boundaries

- Never edit `.nuxt/`, `.output/`, or generated tsconfigs. Change `nuxt.config.ts` instead.
- Keep `@nuxt/docs` pinned to the exact resolved `nuxt` version. Keep them in sync when the Nuxt range resolves to a new version.
- Keep `minimumReleaseAge: 4320` and the existing release-age exclusions in `pnpm-workspace.yaml`.
- Preserve the static preset, prerender settings, redirects, and Cloudflare asset deployment.
- Do not open issues or PRs on `nuxt/nuxt`. Its `AGENTS.md` bans agent-authored contributions.
