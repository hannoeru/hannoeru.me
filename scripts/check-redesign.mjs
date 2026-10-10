import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { test } from 'node:test'

const output = resolve('.output/public')
const baseUrl = process.env.BLOG_URL ?? 'http://localhost:3020'

async function readRoute(path) {
  const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200, path)
  return response.text()
}

function readOutput(path) {
  return readFile(resolve(output, path), 'utf8')
}

test('built home preserves identity and accessible navigation', async () => {
  const html = await readOutput('index.html')
  assert.match(html, /Han（ハン）/)
  assert.match(html, /Software Engineer based in Tokyo, Japan/)
  assert.match(html, /creator of/)
  assert.match(html, /vite-plugin-pages/)
  assert.match(html, /core member of/)
  assert.match(html, /UnoCSS/)
  assert.match(html, /id="main-content" tabindex="-1"/)
  assert.match(html, /Skip to content/)
  assert.match(html, /aria-label="Main navigation"/)
  assert.match(html, /aria-label="Search posts"/)
  assert.match(html, /aria-label="Keyboard shortcuts"/)
  assert.match(html, /rel="canonical" href="https:\/\/hannoeru.me\/"/)
  assert.match(html, /application\/rss\+xml/)
  assert.doesNotMatch(html, /Open navigation/)
})

test('built archive links to every feed post and retains article metadata', async () => {
  const archive = await readOutput('posts.html')
  const feed = JSON.parse(await readRoute('/feed.json'))
  assert.equal(feed.title, 'Han')
  assert.equal(feed.items.length, 35)
  assert.match(archive, /class="post-row"/)
  assert.doesNotMatch(archive, /grid-cols-2|group-hover/)
  for (const post of feed.items) {
    const path = new URL(post.url).pathname
    assert.ok(archive.includes(`href="${path}"`), `archive contains ${path}`)
    const html = await readOutput(`${path.slice(1)}.html`)
    assert.match(html, /property="og:type" content="article"/)
    assert.ok(html.includes(`href="${post.url}"`), `canonical for ${path}`)
    assert.match(html, /<h1/)
  }
})

test('built bookmarks and all feeds remain available', async () => {
  assert.match(await readOutput('bookmarks.html'), /Bookmarks/)
  assert.match(await readRoute('/feed.xml'), /<rss/)
  assert.match(await readRoute('/feed.atom'), /<feed/)
  assert.match(await readOutput('sitemap.xml'), /<urlset|<sitemapindex/)
})
