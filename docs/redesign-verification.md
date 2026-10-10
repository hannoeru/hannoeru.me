# Redesign verification

## Run the checks

Use the Node version in `.nvmrc` and the installed project dependencies.

1. Run `pnpm typecheck`.
2. Run `pnpm lint`.
3. Run `pnpm test`.
4. Run `pnpm build`.
5. Start the local site with `pnpm dev --port 3020`.
6. Run `node --test scripts/check-redesign.mjs`.

The artifact check reads the production HTML and sitemap from `.output/public`. It checks feed endpoints on the running local site. Set `BLOG_URL` if the server uses another address.

## Check the browser

[`scripts/check-redesign-browser.json`](../scripts/check-redesign-browser.json) contains independent browser check phases. Run each entry through the native `agent_browser_code` tool in file order. Pass its `code`, `session`, and `timeoutMs` fields. The `name` field is a label, not a tool argument.

Each phase uses observed completion conditions. It checks focus, Tab trapping, search results, cancelled and completed navigation, same-route selection, editable fields, shortcut opt-out, and mobile width. The navigation phase installs a temporary router guard and removes it before the successful navigation check.

The checks use the local server at `http://localhost:3020`. They use a separate browser session. The phases restore the shortcut preference after the opt-out check. If a session loses its page, inspect the reported state and use a fresh explicit session for the next independent phase.

All nine phases passed across the implementation and root checks. The root reran the combined mobile phase in a fresh session after the reused helper session lost its page.

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

This is a focused feature check, not a complete WCAG audit. Tweet embeds depend on Twitter's external script and service.
