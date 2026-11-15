import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isContentPagePath, selectRepresentation, varyAccept } from '../worker/negotiation.ts'

const cases = [
  [undefined, 'html'],
  ['', 'html'],
  ['*/*', 'html'],
  ['text/*', 'html'],
  ['text/markdown', 'markdown'],
  ['TEXT/MARKDOWN', 'markdown'],
  [' text/markdown ; q=0.9 , text/html ; q=0.4 ', 'markdown'],
  ['text/html', 'html'],
  ['text/markdown;q=0, */*;q=1', 'html'],
  ['text/markdown;q=0.4, text/html;q=0.9', 'html'],
  ['text/markdown;q=0.9, text/html;q=0.4', 'markdown'],
  ['text/html;q=0, text/markdown;q=1', 'markdown'],
  ['text/html;q=0, text/markdown;q=0', 'html'],
  ['application/json', 'html'],
  ['text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'html'],
  ['text/markdown, text/html', 'markdown'],
  ['text/html, text/markdown', 'html'],
  ['text/markdown;variant=source, text/html;q=0.5', 'html'],
  ['text/markdown;q=0.3, text/*;q=0.8', 'html'],
] satisfies [string | undefined, string][]

for (const [accept, expected] of cases) {
  test(`Accept ${JSON.stringify(accept)} selects ${expected}`, () => {
    assert.equal(selectRepresentation(accept), expected)
  })
}

test('only content page paths participate, not assets or non-pages', () => {
  for (const path of ['/', '/posts', '/posts/example', '/posts/example/', '/bookmarks'])
    assert.equal(isContentPagePath(path), true, path)
  for (const path of ['/api/content/query', '/feed.xml', '/feed.atom', '/feed.json', '/robots.txt', '/sitemap.xml', '/favicon.ico', '/avatar.png', '/_nuxt/app.js', '/posts/_payload.json', '/posts/example.html', '/posts/example.md', '/public/design-review', '/design-review/', '/not-a-page', '/postscript'])
    assert.equal(isContentPagePath(path), false, path)
})

test('Vary preserves other tokens, Accept case, and the wildcard', () => {
  assert.equal(varyAccept(undefined), 'Accept')
  assert.equal(varyAccept('Accept-Encoding'), 'Accept-Encoding, Accept')
  assert.equal(varyAccept('Accept-Encoding, accept'), 'Accept-Encoding, accept')
  assert.equal(varyAccept('*'), '*')
})
