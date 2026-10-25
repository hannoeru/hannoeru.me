import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { access, readFile, readdir } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { legacyRedirects } from '../shared/legacy-redirects.ts'

const output = resolve('.output/public')
const origin = 'https://hannoeru.me'
const listener = createServer()
listener.listen(0, '127.0.0.1')
await once(listener, 'listening')
const port = listener.address().port
await new Promise((resolve, reject) => listener.close(error => error ? reject(error) : resolve()))
const baseUrl = process.env.SEO_BASE_URL || `http://127.0.0.1:${port}`
const files = await readdir(output, { recursive: true })
for (const file of ['index.html', '404.html', 'feed.xml', 'feed.atom', 'feed.json', 'robots.txt', 'sitemap.xml', '_redirects']) {
  const contents = await readFile(resolve(output, file), 'utf8')
  assert.ok(contents.trim(), `nonempty static artifact: ${file}`)
}
await assert.rejects(access(resolve('.output/server')), { code: 'ENOENT' }, 'no server bundle')
assert.ok(!files.some(file => /(^|[/\\])_worker\.js([/\\]|$)/.test(file)), 'no Worker bundle in static assets')

const rss = await readFile(resolve(output, 'feed.xml'), 'utf8')
assert.match(rss, /<rss\b/)
assert.match(rss, /<item\b/)
const atom = await readFile(resolve(output, 'feed.atom'), 'utf8')
assert.match(atom, /<feed\b/)
assert.match(atom, /<entry\b/)
const feed = JSON.parse(await readFile(resolve(output, 'feed.json'), 'utf8'))
assert.ok(feed.version.startsWith('https://jsonfeed.org/version/'))
assert.ok(feed.items.length > 0, 'JSON feed contains posts')
const robots = await readFile(resolve(output, 'robots.txt'), 'utf8')
assert.match(robots, /^User-agent:\s*\*/im)
assert.match(robots, /^Sitemap:\s*https:\/\/hannoeru\.me\/sitemap\.xml\s*$/im)

const redirectLines = (await readFile(resolve(output, '_redirects'), 'utf8'))
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))
assert.ok(redirectLines.length <= 2000, 'within Cloudflare static redirect limit')
for (const line of redirectLines)
  assert.ok(line.length <= 1000, 'within Cloudflare redirect line limit')
const redirectRules = redirectLines.map(line => line.split(/\s+/))

function redirectVariants(path) {
  const encoded = encodeURI(path)
  return new Set([path, encoded, encoded.replace(/%[\dA-F]{2}/g, escape => escape.toLowerCase())])
}

for (const [path, target] of Object.entries(legacyRedirects)) {
  assert.ok(redirectRules.some(([source, destination, status]) => redirectVariants(path).has(source) && destination === target && status === '301'), `static permanent redirect for ${path}`)
}

const xml = await readFile(resolve(output, 'sitemap.xml'), 'utf8')
// Read only page locations, not image:loc entries.
const locations = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map(match => match[1])
// Follow Nuxt Content's numbered file and index route conventions.
const expected = (await readdir('content', { recursive: true }))
  .filter(file => file.endsWith('.md'))
  .map(file => `/${file.replace(/\\/g, '/').replace(/(^|\/)\d+\./g, '$1').replace(/\.md$/, '').replace(/(^|\/)index$/, '')}`)
assert.deepEqual(locations.toSorted(), expected.map(path => `${origin}${path}`).toSorted())

function assertCanonical(html, url) {
  const links = [...html.matchAll(/<link\b[^>]*>/g)]
    .map(match => match[0])
    .filter(tag => /\brel="canonical"/.test(tag))
  assert.equal(links.length, 1, `one canonical for ${url}`)
  assert.ok(links[0].includes(`href="${url}"`), `canonical points to ${url}`)
}

assert.ok(expected.includes('/'), 'home page is included')
assert.ok(expected.some(path => path.startsWith('/posts/')), 'post pages are included')
for (const path of expected) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  const html = await readFile(resolve(output, file), 'utf8')
  assertCanonical(html, `${origin}${path}`)
  assert.match(html, /<h1\b/, `content heading for ${path}`)
  for (const [, image] of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
    const url = new URL(image, origin)
    if (url.origin === origin)
      await access(resolve(output, url.pathname.slice(1)))
  }
}

for (const path of Object.keys(legacyRedirects)) {
  for (const variant of redirectVariants(path)) {
    for (const suffix of ['.html', '/index.html']) {
      const file = resolve(output, `${variant.slice(1)}${suffix}`)
      await assert.rejects(access(file), { code: 'ENOENT' }, `no legacy HTML: ${file}`)
    }
  }
}

let logs = ''
let startupError
const server = process.env.SEO_BASE_URL
  ? undefined
  : spawn(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'dev', '--config', 'wrangler.jsonc', '--port', String(port), '--ip', '127.0.0.1'], {
      env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
server?.stdout.on('data', chunk => logs += chunk)
server?.stderr.on('data', chunk => logs += chunk)
server?.on('error', error => startupError = error)

async function request(path) {
  return fetch(new URL(path, baseUrl), { redirect: 'manual', signal: AbortSignal.timeout(10000) })
}

try {
  let ready = false
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await request('/robots.txt')
      await response.arrayBuffer()
      if (response.status === 200) {
        ready = true
        break
      }
    }
    catch {
      // Wrangler can refuse connections until its asset server is ready.
    }
    if (startupError || (server && (server.exitCode !== null || server.signalCode !== null)))
      break
    await setTimeout(500)
  }
  assert.ok(ready, `Static asset server did not become ready: ${startupError || ''}\n${logs}`)

  for (const path of expected) {
    const response = await request(path)
    assert.equal(response.status, 200, `static page at ${path}`)
    assertCanonical(await response.text(), `${origin}${path}`)
  }

  for (const file of ['feed.xml', 'feed.atom', 'feed.json', 'robots.txt', 'sitemap.xml']) {
    const response = await request(`/${file}`)
    assert.equal(response.status, 200, `static artifact at /${file}`)
    assert.equal(await response.text(), await readFile(resolve(output, file), 'utf8'), `served static artifact: ${file}`)
  }

  for (const [path, target] of Object.entries(legacyRedirects)) {
    assert.ok(expected.includes(target), `redirect target is a content route: ${target}`)
    for (const variant of redirectVariants(path)) {
      const response = await request(`${variant}?utm_source=seo-check`)
      assert.equal(response.status, 301, `permanent redirect for ${variant}`)
      assert.ok(response.headers.has('location'), `redirect location for ${variant}`)
      const location = new URL(response.headers.get('location'), baseUrl)
      assert.equal(location.origin, new URL(baseUrl).origin, `same-origin redirect for ${variant}`)
      assert.equal(location.pathname, target)
      assert.equal(location.searchParams.get('utm_source'), 'seo-check')
      await response.arrayBuffer()
    }
    const response = await request(target)
    assert.equal(response.status, 200, target)
    assertCanonical(await response.text(), `${origin}${target}`)
  }

  const filtered = await request('/posts?tags=Vue')
  assert.equal(filtered.status, 200)
  assertCanonical(await filtered.text(), `${origin}/posts`)
  for (const path of ['/posts', Object.values(legacyRedirects)[0]]) {
    const response = await request(`${path}/`)
    assert.equal(response.status, 307, `drop trailing slash for ${path}`)
    assert.equal(new URL(response.headers.get('location'), baseUrl).pathname, path)
    await response.arrayBuffer()
  }
  for (const path of ['/__seo-check-missing-page', '/posts/__seo-check-missing-post']) {
    const response = await request(path)
    assert.equal(response.status, 404, `not found: ${path}`)
    await response.arrayBuffer()
  }
  console.log(`SEO checks passed: static artifacts, ${expected.length} canonical pages, ${Object.keys(legacyRedirects).length} permanent redirects, and 404 responses.`)
}
finally {
  if (server?.pid && server.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit')
    server.kill('SIGTERM')
    await exited
  }
}
