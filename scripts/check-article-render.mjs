import assert from 'node:assert/strict'
import { test } from 'node:test'

const baseUrl = process.env.BLOG_URL ?? 'http://localhost:3020'

async function readRoute(path) {
  const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200, path)
  return response.text()
}

test('archive renders an optional reserved thumbnail within each native post link', async () => {
  const html = await readRoute('/posts')
  const feed = JSON.parse(await readRoute('/feed.json'))
  const rows = [...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*class="(?:[^"]*\s)?post-row(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g)]
  assert.equal(rows.length, feed.items.length)
  for (const post of feed.items) {
    const path = new URL(post.url).pathname
    const row = rows.find(match => match[1] === path)?.[2]
    assert.ok(row, path)
    if (post.image) {
      assert.match(row, /class="post-thumbnail"/)
      assert.match(row, /<img[^>]*width="112"[^>]*height="72"[^>]* alt(?:=""|\s)[^>]*loading="lazy"/)
    }
    else {
      assert.doesNotMatch(row, /post-thumbnail|<img/)
    }
    assert.match(row, /class="post-row-title"/)
    assert.match(row, /<time/)
  }
})

test('code headers keep native copy controls, focusable bodies, and class-based token slots', async () => {
  const html = await readRoute('/posts/install-cloudflared-opnsense')
  assert.match(html, /class="code-label">bash<\/span>/)
  assert.match(html, /<button type="button" class="code-copy" aria-label="Copy bash code"/)
  const blocks = [...html.matchAll(/<pre class="code-body ([^"]+)" tabindex="0"[^>]*>([\s\S]*?)<\/pre>/g)]
  assert.ok(blocks.length > 0)
  for (const [, classes, slot] of blocks) {
    assert.match(classes, /language-[\w-]+ shiki/)
    assert.match(slot, /<code>/)
    assert.match(slot, /class="line" line="1"/)
    assert.match(slot, /<span class="s[\w-]+">/)
    assert.doesNotMatch(slot, /style="/)
  }
})

test('filename labels survive the Markdown renderer', async () => {
  const typescript = await readRoute('/posts/windi-css-next-generation-tailwind-css-compiler')
  assert.match(typescript, /class="code-label">vite.config.ts<\/span>/)
  assert.match(typescript, /class="code-label">src\/main.ts<\/span>/)
  const gateway = await readRoute('/posts/unifi-usg-vlan-openvpn')
  assert.match(gateway, /class="code-label">config.gateway.json<\/span>/)
})
