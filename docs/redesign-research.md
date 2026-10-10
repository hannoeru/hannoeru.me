# Antfu-inspired blog redesign

## Decision

Use a small top navigation, a narrow text column, and chronological post rows with compact optional thumbnails. Keep Han's identity and existing Nuxt Content routes. The implementation uses one Reka modal with exclusive search and shortcut-help views. Search shows posts only. This avoids command and post-result ambiguity without a second modal or focus trap.

Reject generic scroll storytelling, a pink editorial palette, large marketing sections, and image-card grids. These choices do not match the inspected reference. Keyboard controls are a requested addition for this blog, not a verified antfu site navigation pattern.

This note records the primary-source research and design choices. It is not a completed accessibility audit.

## Evidence and limits

Research date: 2026-10-10. Primary sources only.

- Inspected the live [home page](https://antfu.me/) and [posts page](https://antfu.me/posts) in the explicit browser session `blog-reference`. The root shared browser was not used.
- Read Anthony's own design posts and source. All GitHub access used `gh api`. Source links below use the inspected revision `e3ff0442327a24b1f389982a19ec8aca704d9245`.
- Reviewed the supplied home screenshot at `/tmp/antfu-reference.png`. Also inspected a live posts screenshot at a 1280 by 633 viewport.
- Reviewed local app files read-only before concurrent implementation changes. The baseline commit was `9e2e54dd9a70c43d3ea36c9acf14ad9c415395be`. Later edits by other agents are outside this baseline comparison.
- No `CONTEXT.md` was found in this repository outside generated and dependency directories.
- Read the research, frontend-design, technical-writing, and unslop skills. The technical-writing skill was available in the installed pi-pstack package.

The live snapshots did not expose a search or shortcut-help control on the home and posts pages. This observation does not prove that no hidden shortcuts exist. The inspected [App.vue](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/App.vue) does contain ArrowLeft, ArrowRight, and Escape handlers for its image preview. That source does not establish global search or site-navigation shortcuts.

## What the reference actually does

| Concrete observation | Primary source | Decision for Han's blog |
| --- | --- | --- |
| A small logo sits at the upper left. Compact navigation sits at the upper right. There is no desktop sidebar. | [Live home](https://antfu.me/), supplied screenshot, [NavBar.vue](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/components/NavBar.vue) | Replace the wide sidebar with top navigation. Keep Home, Posts, and Bookmarks visible. Add a named Search button. |
| The home page starts with a name and personal prose. Inline project links support the biography instead of a large promotional hero. | [Live home](https://antfu.me/), [home source](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/pages/index.md) | Keep Han's Tokyo introduction and open-source work. Do not copy Anthony's biography, project badges, signature, or images. |
| The posts page is a single list. Titles, dates, duration, and language labels form the rows. The inspected main region contained zero images. Large faint year numerals separate groups. | [Live posts](https://antfu.me/posts), [ListPosts.vue](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/components/ListPosts.vue) | Use title-led rows and year groups, with compact thumbnails for Han's archive. Prefer small, readable year headings over oversized decorative numerals. Show dates and existing tags. Do not invent reading times. |
| The prose CSS sets a maximum width of `65ch`, a `1rem` font size, and a `1.75` line height. Live posts prose containers measured about 656 CSS pixels at the inspected desktop viewport. | [prose.css](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/styles/prose.css), live computed styles | Use a similar reading measure and line height. Test Chinese text separately because `ch` does not measure Chinese glyph width. Allow code and tables to scroll horizontally. |
| The reference uses neutral light and dark backgrounds. The home screenshot has a faint dot field. The posts screenshot has faint branch-like decoration. | [main.css](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/styles/main.css), [ArtDots.vue](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/components/ArtDots.vue), [posts frontmatter](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/pages/posts/index.md) | Use neutral colors with one restrained link and focus accent. Start without decorative canvas code. If texture is needed, use a static, low-contrast CSS treatment. |
| Navigation and post rows use reduced opacity. Navigation source also removes outlines. | [NavBar.vue](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/components/NavBar.vue), [markdown.css](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/styles/markdown.css) | Adopt the quiet hierarchy, not its exact opacity values or outline removal. Keep visible `:focus-visible` indicators and check text contrast in both themes. |

The measured reference font stack starts with Inter. A font change is not required to reproduce the useful layout decisions. A new display font should not make Chinese text, code, or interface labels harder to read.

### Anthony's own design explanations

[Sliding Enter Animation](https://antfu.me/posts/sliding-enter-animation) describes a 10-pixel upward movement with opacity and staggered CSS delays. It credits Paco Coursey's site as its inspiration. Its example gates animation with `prefers-reduced-motion: no-preference`. The [current CSS](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/styles/main.css) retains that motion preference guard.

Adopt the reduced-motion guard if any entrance animation is added. Do not stagger the whole archive or hide paragraphs until a scroll event. Search results and focus changes should not wait for animation.

[Animated SVG Logo](https://antfu.me/posts/animated-svg-logo) explains Anthony's personal signature, stroke animation, and SVG mask. Its example disables animation under reduced motion. Adopt the principle of a personal identity mark, not the signature itself. A static Han wordmark is sufficient.

[Rewrite in Vite](https://antfu.me/posts/rewrite-in-vite) explains why Anthony wanted direct styling control and a theme that follows system preference with a manual override. Adopt those goals through the existing UnoCSS and Nuxt color-mode dependencies. Do not replace Nuxt with his Vite site stack.

The source [README](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/README.md) distinguishes MIT-licensed code from words and images under CC BY-NC-SA 4.0. Use original content and visual identity rather than copied assets.

## Local structure and useful boundaries

The following paths describe the inspected baseline:

- [`app/layouts/default.vue`](../app/layouts/default.vue) owns a desktop grid with a 180- or 220-pixel navigation column. It can own the replacement reading-width layout without changing content routing.
- [`app/components/AppHeader.vue`](../app/components/AppHeader.vue) duplicates navigation for desktop and a mobile Reka dialog. A shared navigation definition can supply both layouts and dialog commands. Do not move content queries into this component.
- [`app/components/content/ListPosts.vue`](../app/components/content/ListPosts.vue) queries post metadata, sorts newest first, and applies all selected tags from the URL. Keep this content and filter boundary. Change its presentation to rows without removing URL-based filtering.
- [`app/pages/[...slug].vue`](../app/pages/[...slug].vue) loads content, sets metadata, renders Markdown, and supplies tags. Keep that page responsibility separate from the site dialog.
- [`content.config.ts`](../content.config.ts) already defines optional title, description, date, tags, and language. Search must handle missing metadata explicitly.
- [`package.json`](../package.json) already includes Nuxt Content, VueUse, Reka UI, UnoCSS, and Nuxt color mode. No new command-menu package is necessary.
- Theme commands use the existing Nuxt color-mode store. The old standalone theme control and sidebar link component are removed.

## Structural alternatives

| Design | Benefit | Cost and failure risk | Verdict |
| --- | --- | --- | --- |
| Combined search and commands | One entry and focus lifecycle. Empty queries can show actions. | Commands can obscure post results and require extra selection behavior. | Rejected. Post-only search with native result links is simpler. |
| Search and help views in one modal | Search remains post-only. Help has room for the shortcut list. | Two entry buttons, but one modal and focus lifecycle. | Chosen. A `closed` or `search` or `shortcuts` state prevents stacked dialogs. |

The recommendation concerns presentation, not data ownership. One dialog does not require one large component. Search data, command definitions, and keyboard dispatch remain separate.

## Typed data and execution boundaries

Use a discriminated union for dialog entries. Normalize content metadata once when it enters the search model. The following shape is proposed, not an existing exported type:

```ts
type SitePath = '/' | '/posts' | '/bookmarks'

type SiteCommand =
	| { kind: 'navigate'; id: string; label: string; to: SitePath }
	| { kind: 'theme'; id: 'theme'; label: string }

type PostResult = {
	kind: 'post'
	id: string
	to: string
	title: string
	description: string
	date: string | null
	tags: readonly string[]
}

type DialogEntry = PostResult | SiteCommand

type OverlayState = 'closed' | 'search'

type SeparateOverlayState = 'closed' | 'search' | 'shortcuts'
```

`PostResult.to` comes from the validated content path, not from a constructed slug. The adapter supplies a path-based title if no title exists, an empty description, an empty tag array, and a nullable date. It converts a valid date to a stable serialized string. These are metadata rules, not compatibility paths.

Keep callbacks and DOM references out of content data. A command executor switches on `kind`. Navigation uses Nuxt routing. The theme command uses the existing color-mode behavior. Reject unknown external data at its boundary through the repository's schema tools. Do not assert types with casts.

Recommended ownership is small and explicit:

- A search composable loads and normalizes post data, exposes loading and error states, and filters results. The header does not fetch an archive on every render.
- A plain command module defines the real site actions. Both the header and the dialog consume those definitions.
- The dialog renders the input, groups, results, status, and help. It owns its query and selected result. It does not own route metadata or theme persistence.
- One layout-owned controller mounts the dialog and registers one client-side keyboard listener. It removes the listener on disposal. There is no module-global open ref shared across server requests.

Start with title, description, and tag search. Label that scope clearly. Preserve Chinese text and do not rely on whitespace tokenization. Keep the existing archive available when JavaScript or search data fails.

If full-text search is required, Nuxt Content already provides [queryCollectionSearchSections](https://content.nuxt.com/docs/utils/query-collection-search-sections). The installed `@nuxt/content` section type contains `id`, `title`, ancestor `titles`, `level`, and `content`. Its `id` can include a heading anchor. Use that API rather than parsing rendered Markdown in the browser. Do not download every article body merely to implement metadata search. Choose full-text search only after checking index size and the desired result granularity.

## Focus and keyboard decisions

Use the existing [Reka Dialog](https://reka-ui.com/docs/components/dialog) for the modal shell. It already supplies modal focus trapping, Title and Description components, and Escape handling. Use [Reka Combobox](https://reka-ui.com/docs/components/combobox) if arrow-key result selection is required. Its groups and keyboard behavior avoid a hand-written listbox. If filtering occurs in the search model, use its custom-filtering support instead of applying a second filter to rendered labels.

Focus rules follow the [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):

- Opening search puts focus in the labeled search input. Keep the visible close button in the modal tab sequence.
- Tab and Shift+Tab remain within the dialog. Arrow navigation belongs to the result component, not the global listener.
- Escape closes the active dialog. During text composition, Escape must not close the dialog instead of cancelling composition.
- Closing without navigation returns focus to the invoking element. A keyboard-opened dialog records the current element because it has no newly clicked trigger.
- If the invoking element disappeared, use the persistent Search button as the fallback.
- After successful route navigation, close the dialog and focus the new page heading or main region after Vue finishes the render. Do not restore focus to the old route.
- Show loading, failure, and no-results text. Never activate a stale selected item after the results change.

Reka exposes focus hooks for custom open and close behavior. Override defaults only for the keyboard trigger and route-transition cases. A focus trap alone does not supply route focus handling.

### Browser modifier and input protections

Prefer a visible Search button before adding shortcut bindings. If a printable search shortcut such as `/` is shipped, provide a visible way to disable character shortcuts. [WCAG 2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html) also applies to `?` and multi-character sequences. Ignoring text inputs alone does not satisfy that requirement.

For the first version, use at most `/` to open the combined dialog. Explain the supported keys inside that dialog. Avoid a separate `?` overlay and multi-key navigation sequences.

The global listener must ignore an event when:

- Another handler already prevented its default behavior.
- `isComposing` is true, or the event is a repeated keydown.
- Ctrl, Meta, or Alt is pressed, including AltGraph. Match Shift explicitly if a future shortcut requires it.
- The event's composed path contains an input, textarea, select, editable element, or custom textbox.
- Another modal or interactive popup owns focus. In particular, search must not open over the mobile navigation dialog.

Use `KeyboardEvent.key` for printable shortcuts, not a US-keyboard physical position. The [UI Events specification](https://www.w3.org/TR/uievents/#interface-keyboardevent) defines modifier state, `repeat`, and `isComposing`. Call `preventDefault()` only after a supported action passes these checks. Do not cancel unrelated keys.

Do not register Ctrl+K or Meta+K by default while claiming to preserve browser shortcuts. Those chords can have browser behavior. If the owner explicitly chooses that convention, record the conflict and keep the visible Search button. Never intercept browser Find, Reload, Print, Back, or address-bar commands.

Keep post rows and navigation as real links. Do not turn them into click-only containers. Modified clicks, middle-clicks, and link context menus must continue to work. Anthony's [WrapperPost.vue](https://github.com/antfu/antfu.me/blob/e3ff0442327a24b1f389982a19ec8aca704d9245/src/components/WrapperPost.vue) checks mouse button, modifiers, target, download, and origin before intercepting links. The simpler choice here is to keep normal NuxtLink behavior.

## Style ownership

UnoCSS Wind4 owns the site styles. Semantic light and dark color tokens and shared shortcuts live in `uno.config.ts`. One-off details use utilities in the Vue templates. There is no handwritten stylesheet or custom CSS preflight.

Dark surfaces use neutral grays: `#0d0d0d` for the page, `#171717` for code, and `#1c1c1c` for headers and hover states. Text and borders are neutral. Green is limited to links, focus, selection, and code-line highlights. The existing Inter and Fira Code fonts remain.

Archive thumbnails reserve 112 by 72 pixels on desktop and 80 by 52 pixels on mobile. They load lazily and share the native post link with the title. A missing image leaves a text-only row, not a placeholder.

Code panels show a filename or language, a copy control, and a keyboard-focusable scroll body. Nuxt Content supplies the code, metadata, highlighted slot, and Shiki classes. UnoCSS descendant variants style generated lines without changing token spans. Inline-code styling does not apply to fenced blocks. Syntax highlighting uses `github-light` and `github-dark-default`.

Copy uses the supplied code string through the existing VueUse `useClipboardItems` helper with clipboard reading disabled. Browser constructors run only during activation. The local state is `idle`, `pending`, or `error`; VueUse supplies copied feedback. A rejected write produces a visible alert, not a false success. Unsupported browsers can select the code manually.

## Handoff choices

1. Use top navigation and a reading-width column. Keep the current content routes and URL tag filters.
2. Use chronological text rows with dates, small year headings, and optional post thumbnails. Keep full-size images inside posts where they explain the subject.
3. Use neutral light and dark colors, clear focus indicators, and no decorative runtime canvas.
4. Use one Reka modal with exclusive post-search and shortcut-help views. Do not create stacked overlays.
5. Keep keyboard controls optional, input-safe, composition-safe, and modifier-safe. Do not attribute these additions to antfu.

Only this research document is owned by the research agent. No app edits or commits are part of this work. The pre-existing `public/design-review/` remains untouched.
