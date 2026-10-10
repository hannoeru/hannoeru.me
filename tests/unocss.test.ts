import assert from 'node:assert/strict'
import { glob, readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { test } from 'node:test'

const requireUno = createRequire(import.meta.resolve('@unocss/nuxt'))
const { createGenerator } = await import(requireUno.resolve('unocss'))
const requireConfig = createRequire(requireUno.resolve('@unocss/config'))
const { createJiti } = await import(requireConfig.resolve('jiti'))
const jiti = createJiti(import.meta.url, { alias: { unocss: requireUno.resolve('unocss') } })
const config = await jiti.import('../uno.config.ts', { default: true })

async function generateApp() {
  const sources: string[] = []
  for await (const path of glob('app/**/*.vue'))
    sources.push(await readFile(path, 'utf8'))
  const uno = await createGenerator(config)
  return uno.generate(sources.join('\n'))
}

const { css, matched } = await generateApp()

function rule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`(?:^|\\n)${escaped}(?:,\\n[^{}]+)?\\{([^}]*)\\}`))
  assert.ok(match, `Missing generated selector ${selector}`)
  return match[0]
}

test('Vue extraction generates neutral light/dark surfaces and body-owned root styling', () => {
  for (const name of ['site-root', 'site-body', 'site-dialog', 'tooltip-panel', 'code-panel', 'code-header', 'code-body'])
    assert.ok(matched.has(name), `Not extracted: ${name}`)

  for (const [name, value] of Object.entries({
    'canvas-dark': '#0d0d0d',
    'code-dark': '#171717',
    'panel-dark': '#1c1c1c',
    'line-dark': '#2b2b2b',
    'body-dark': '#bcbcbc',
    'muted-dark': '#949494',
    'heading-dark': '#ededed',
    'code-light': '#f7f7f7',
    'body-light': '#373737',
  }))
    assert.ok(css.includes(`--colors-${name}: ${value}`), `Missing generated token ${name}`)

  assert.match(rule('.site-root'), /min-height:100dvh/)
  assert.match(rule('.site-root'), /color-scheme:light/)
  assert.match(rule('.site-root'), /scrollbar-color:#cfcfcf transparent/)
  assert.match(rule('.site-root.dark'), /color-scheme:dark/)
  assert.match(rule('.site-root.dark'), /scrollbar-color:#373737 transparent/)
  assert.doesNotMatch(css, /--colors-scrollbar/)
  assert.match(rule('.wordmark'), /line-height:1;/)
  for (const reference of css.matchAll(/var\((--colors-[\w-]+)\)/g))
    assert.ok(css.includes(`${reference[1]}:`), `Unresolved generated theme token ${reference[1]}`)
  assert.match(rule('.dark .site-body'), /var\(--colors-canvas-dark\)/)
  assert.match(rule('.dark .site-body'), /color-scheme:dark/)
  assert.match(rule('.site-body>#__nuxt'), /min-height:100dvh/)
  assert.match(rule('.dark .site-body>#__nuxt'), /var\(--colors-canvas-dark\)/)
  assert.match(rule('.dark .site-dialog'), /var\(--colors-canvas-dark\)/)
  assert.match(rule('.dark .tooltip-panel'), /var\(--colors-panel-dark\)/)
  assert.doesNotMatch(css, /--c-/)
})

test('real Wind4 dark variants need an ancestor, not the same html element', async () => {
  const uno = await createGenerator(config)
  const result = await uno.generate(new Set(['dark:bg-canvas-dark']))
  assert.match(result.css, /\.dark \.dark\\:bg-canvas-dark\{/)
  assert.doesNotMatch(result.css, /\.dark\.dark\\:bg-canvas-dark/)
})

test('generated code descendants retain lines, highlights, and scroll geometry without token overrides', () => {
  assert.match(rule('.code-body>code'), /width:max-content;min-width:100%;display:block;font:inherit/)
  assert.match(rule('.code-body .line'), /min-height:1\.8em;display:block/)
  assert.match(rule('.code-body .line.highlight'), /var\(--colors-highlight-light\)/)
  assert.match(rule('.dark .code-body .line.highlight'), /inset 2px 0.*rgb\(131 197 160/)
  assert.doesNotMatch(css, /--shiki-|\.code-body span\[style\]/)
  assert.match(rule('.code-body'), /white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto/)
  assert.match(rule('.page-content :not(pre)>code'), /box-decoration-break:clone/)
  assert.match(css, /--font-mono: "Fira Code"/)
  assert.match(css, /--font-sans: "Inter"/)
})

test('generic generated media rules have zero element specificity and preserve image crops', () => {
  assert.match(rule('.page-content :where(img,video)'), /max-width:100%;height:auto/)
  assert.match(rule('.post-thumbnail img'), /width:100%;height:100%;display:block;object-fit:cover/)
  assert.match(rule('.avatar img'), /width:100%;height:100%;object-fit:cover/)
  assert.doesNotMatch(css, /\.page-content (?:img|video)\{/)
})

test('generated media rules preserve the 560px boundary and compact controls', () => {
  assert.match(rule('.post-thumbnail'), /width:calc\(var\(--spacing\) \* 28\);height:calc\(var\(--spacing\) \* 18\)/)
  const mobileStart = css.indexOf('@media(max-width:560px){')
  assert.notEqual(mobileStart, -1)
  const mobile = css.slice(mobileStart, css.indexOf('@supports', mobileStart))
  assert.match(mobile, /\.post-thumbnail\{[^}]*width:calc\(var\(--spacing\) \* 20\);height:calc\(var\(--spacing\) \* 13\)/)
  assert.match(mobile, /\.code-copy\{[^}]*min-height:calc\(var\(--spacing\) \* 11\)/)
  assert.match(mobile, /\.code-body \.line\{padding-inline:calc\(var\(--spacing\) \* 4\)/)
  assert.match(mobile, /\.site-shell\{width:calc\(100% - 2\.5rem\)/)
})

test('generated navigation, focus, selection, scrollbars, and reduced motion remain active', () => {
  assert.match(rule('.nav-link[aria-current]'), /var\(--colors-accent-light\)/)
  assert.match(rule('.dark .nav-link:hover'), /var\(--colors-accent-dark\)/)
  assert.match(rule('.dark .tool-button:hover'), /var\(--colors-hover-dark\)/)
  assert.match(rule('.dark .search-result:hover'), /var\(--colors-hover-dark\)/)
  assert.match(rule('.dark .group:hover .post-row-title'), /var\(--colors-accent-dark\)/)
  assert.match(rule('.site-body :where(:focus-visible)'), /outline-width:2px/)
  assert.match(rule('.site-body :where(:focus-visible)'), /outline-offset:5px/)
  assert.match(rule('.code-body:focus-visible'), /outline-offset:-3px/)
  assert.ok(matched.has('focus:outline-none'))
  assert.match(css, /\.focus\\:outline-none:focus\{[^}]*outline-style:none/)
  assert.match(rule('.site-body::selection'), /var\(--colors-selection\)/)
  assert.match(rule('.dark .site-body *'), /scrollbar-color:#373737 transparent/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\{[^]*\.site-body \*::before\{scroll-behavior:auto !important;transition:none !important;animation:none !important/)
  assert.ok(matched.has('transition-opacity'))
  assert.ok(matched.has('opacity-0'))
  assert.ok(matched.has('motion-reduce:transition-none'))
})
