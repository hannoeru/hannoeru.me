# Redesign verification

## Run the checks

Use the Node version in `.nvmrc` and the installed project dependencies. Stop the dev server before typecheck or build, then restart it after those commands finish. They regenerate `.nuxt` and can invalidate a running Content database.

1. Run `pnpm typecheck`.
2. Run `pnpm lint`.
3. Run `pnpm test`.
4. Run `pnpm build`.
5. Start the local site with `pnpm dev --port 3020`.
6. Run `node --test scripts/check-redesign.mjs scripts/check-article-render.mjs`.

`pnpm test` includes five behavior tests and six real UnoCSS generation tests. The search regression forces native Turkish casing through a test-scoped mock. It checks uppercase metadata against a lowercase query and the reverse for titles, descriptions, and tags. It does not assume that `LANG` changes Node's default string casing. The style tests cover extraction from Vue scripts, neutral theme tokens, root dark-mode selectors, portal surfaces, media specificity, code descendants, focus, scrollbars, and reduced motion. They use the installed UnoCSS generator, not a mocked stylesheet.

The artifact check reads the production HTML and sitemap from `.output/public`. It checks feed endpoints on the running local site. Set `BLOG_URL` if the server uses another address.

## Check the browser

[`scripts/check-redesign-browser.json`](../scripts/check-redesign-browser.json) contains independent browser check phases. Run each entry through the native `agent_browser_code` tool in file order. Pass its `code`, `session`, and `timeoutMs` fields. The `name` field is a label, not a tool argument.

Each phase uses observed completion conditions. It checks focus, Tab trapping, search results, cancelled and completed navigation, same-route selection, editable fields, shortcut opt-out, and mobile width. The navigation phase installs a temporary router guard and removes it before the successful navigation check.

The checks use the local server at `http://localhost:3020`. They use a separate browser session. The phases restore the shortcut preference after the opt-out check. If a session loses its page, inspect the reported state and use a fresh explicit session for the next independent phase.

All nine phases passed against the current UnoCSS implementation in the fresh root session `blog-neutral-proof`, with zero failed or rejected browser calls.

## Independent browser checks

The root agent also checked the following on the real site:

- Home, Posts, Bookmarks, and an article render at desktop and 375-pixel mobile widths.
- Light and dark themes keep readable text and link colors.
- `/` focuses the search input. `?` focuses the help close button. Tab stays inside the modal.
- Search finds the Cloudflared article. Selection closes search and focuses the completed page's main region.
- Typing a shortcut character in search changes the query, not the route.
- Disabling single-key shortcuts stops `/` and `b`. The visible controls still work.
- Clicking the OPNsense article tag filters the archive to one post. Removing that tag restores the archive.
- The mobile article has no document-level horizontal overflow. Its code blocks remain in the content.

## Thumbnails, code panels, and neutral surfaces

The root also checked the current styles in the real browser:

- The 1280-pixel desktop archive has a 704-pixel reading column and 35 post rows. Its thumbnail boxes are 112 by 72 pixels; the image fills each inspected box with `object-fit: cover`.
- At a 375-pixel viewport, thumbnail boxes are 80 by 52 pixels and the copy control is 44 pixels high. Neither the archive nor the inspected article has document-level horizontal overflow.
- Rasterized background values are neutral: page `[13, 13, 13]`, code `[23, 23, 23]`, and header `[28, 28, 28]`. Light-mode page and code values are `[255, 255, 255]` and `[247, 247, 247]`.
- The root uses the dark color scheme and neutral viewport scrollbar colors. Light and dark controls remain usable.
- Copy completed a real browser write with the exact 347-character first Cloudflared code block, including its trailing newline. The write payload was captured while the original API executed. Headless clipboard reads were denied, so an OS-level read or paste was not verified.
- An injected rejected clipboard write produced a visible `role="alert"` and did not show copied feedback. The original browser API was restored after the check.
- Tab focused the code body. ArrowRight scrolled it horizontally. Its focus outline uses a minus-three-pixel inset. Inline code has pill padding; fenced code has no inline-code padding.
- Filename labels survive the Markdown renderer, including `vite.config.ts`, `src/main.ts`, and `config.gateway.json`.

Verified screenshots are saved locally at:

- `/tmp/blog-neutral-posts-desktop.png`
- `/tmp/blog-neutral-posts-mobile.png`
- `/tmp/blog-neutral-code-desktop.png`
- `/tmp/blog-neutral-code-mobile.png`
- `/tmp/blog-neutral-code-error-light-mobile.png`

This is a focused feature check, not a complete WCAG audit. Tweet embeds depend on Twitter's external script and service.
