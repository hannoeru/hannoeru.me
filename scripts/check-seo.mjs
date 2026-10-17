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

for (const path of expected) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  const html = await readFile(resolve(output, file), 'utf8')
  assertCanonical(html, `${origin}${path}`)
  assert.match(html, /<h1\b/, `content heading for ${path}`)
}

for (const path of Object.keys(legacyRedirects)) {
  for (const variant of new Set([path, encodeURI(path)])) {
    for (const suffix of ['.html', '/index.html']) {
      const file = resolve(output, `${variant.slice(1)}${suffix}`)
      await assert.rejects(access(file), { code: 'ENOENT' }, `no legacy HTML: ${file}`)
    }
  }
}

// Exercise the generated Worker and its static assets together, as in production.
let logs = ''
const worker = process.env.SEO_BASE_URL
  ? undefined
  : spawn(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'dev', '--config', '.output/server/wrangler.json', '--port', String(port), '--ip', '127.0.0.1'], {
      env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
worker?.stdout.on('data', chunk => logs += chunk)
worker?.stderr.on('data', chunk => logs += chunk)

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
      // Wrangler may still be starting.
    }
    if (worker && worker.exitCode !== null)
      break
    await setTimeout(500)
  }
  assert.ok(ready, `Worker did not start:\n${logs}`)

  for (const [path, target] of Object.entries(legacyRedirects)) {
    // Percent escape casing must not change redirect matching.
    const encoded = encodeURI(path)
    for (const variant of new Set([encoded, encoded.replace(/%[\dA-F]{2}/g, escape => escape.toLowerCase())])) {
      const response = await request(`${variant}?utm_source=seo-check`)
      assert.equal(response.status, 301, `permanent redirect for ${variant}`)
      const location = new URL(response.headers.get('location'), baseUrl)
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
  console.log(`SEO checks passed: ${expected.length} canonical pages and ${Object.keys(legacyRedirects).length} permanent redirects.`)
}
finally {
  if (worker && worker.exitCode === null) {
    worker.kill('SIGTERM')
    await once(worker, 'exit')
  }
}
