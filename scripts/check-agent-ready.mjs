import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { after, before, test } from 'node:test'
import { setTimeout } from 'node:timers/promises'

const markdownAccept = 'text/markdown'
const browserAccept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
const newestPath = '/posts/control-lg-webos-tv-with-apple-remote-home-assistant'
const chinesePath = '/posts/vue-js-veevalidate-3-chinese-language'
const pages = ['/', '/posts', '/bookmarks', newestPath, chinesePath]

const listener = createServer()
listener.listen(0, '127.0.0.1')
await once(listener, 'listening')
const port = listener.address().port
listener.close()
const baseUrl = process.env.BLOG_URL || `http://127.0.0.1:${port}`

let wrangler
before(async () => {
  if (process.env.BLOG_URL)
    return
  wrangler = spawn(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'dev', '--config', 'wrangler.jsonc', '--port', String(port), '--ip', '127.0.0.1'], { stdio: 'ignore' })
  const deadline = Date.now() + 60000
  while (Date.now() < deadline) {
    if (await fetch(baseUrl).then(response => response.ok, () => false))
      return
    await setTimeout(250)
  }
  throw new Error('wrangler dev did not become ready')
})
after(() => wrangler?.kill())

function request(path, { accept, method = 'GET', headers = {} } = {}) {
  return fetch(new URL(path, baseUrl), {
    method,
    redirect: 'manual',
    headers: { ...headers, ...(accept === undefined ? {} : { Accept: accept }) },
  })
}

async function checkRepresentation(response, representation, label) {
  assert.equal(response.status, 200, label)
  assert.match(response.headers.get('content-type') ?? '', representation === 'markdown' ? /^text\/markdown;\s*charset=utf-8$/i : /^text\/html/, label)
  assert.ok((response.headers.get('vary') ?? '').toLowerCase().split(',').map(value => value.trim()).includes('accept'), `Vary: Accept on ${label}`)
  return response.text()
}

for (const path of pages) {
  test(`${path} negotiates by Accept quality, and HEAD matches GET`, async () => {
    const cases = [
      [undefined, 'html'],
      [browserAccept, 'html'],
      [markdownAccept, 'markdown'],
      ['*/*', 'html'],
      ['text/markdown;q=0, */*;q=1', 'html'],
      ['text/markdown;q=0.4, text/html;q=0.9', 'html'],
      ['text/markdown;q=0.9, text/html;q=0.4', 'markdown'],
      ['text/html;q=0, text/markdown;q=1', 'markdown'],
      ['application/json', 'html'],
    ]
    for (const [accept, representation] of cases)
      await checkRepresentation(await request(path, { accept }), representation, `${path}: ${accept ?? '(missing Accept)'}`)
    for (const [accept, representation] of [[undefined, 'html'], [markdownAccept, 'markdown']]) {
      const head = await request(path, { accept, method: 'HEAD' })
      assert.equal(await checkRepresentation(head, representation, `HEAD ${path}`), '')
    }
  })
}

test('Markdown matches the generated twin files and expands the component-backed pages', async () => {
  for (const path of pages) {
    const file = resolve('.output/public', `${path === '/' ? 'index' : path.slice(1)}.md`)
    assert.equal(await checkRepresentation(await request(path, { accept: markdownAccept }), 'markdown', path), await readFile(file, 'utf8'), path)
  }
  const home = await (await request('/', { accept: markdownAccept })).text()
  assert.match(home, /# Han（ハン）\n\nSoftware Engineer\n\nHi, I'm Han/)
  assert.match(home, /## Recent posts\n\n- 2026-06-03\. \[Control an LG webOS TV/)
  const archive = await (await request('/posts', { accept: markdownAccept })).text()
  assert.equal(archive.match(/^- \d{4}-\d{2}-\d{2}\. \[/gm)?.length, 35)
  const chinese = await (await request(chinesePath, { accept: markdownAccept })).text()
  assert.match(chinese, /```js \[main.js\]/)
  for (const text of [home, archive])
    assert.doesNotMatch(text, /<about-me>|<recent-posts>|<list-posts>/)
})

test('HTML validators do not produce a Markdown 304', async () => {
  const html = await request(newestPath, { accept: browserAccept })
  await html.arrayBuffer()
  const response = await request(newestPath, {
    accept: markdownAccept,
    headers: { 'If-None-Match': html.headers.get('etag') ?? '"html"', 'If-Modified-Since': html.headers.get('last-modified') ?? new Date().toUTCString() },
  })
  await checkRepresentation(response, 'markdown', newestPath)
})

test('legacy redirects, trailing slashes, and unknown pages behave like HTML', async () => {
  const legacy = encodeURI('/posts/【vue-js】veevalidate-3-0-使用方法＆導入中文語系')
  for (const path of [legacy, '/posts/', `${newestPath}/`, '/bookmarks/', '/posts/not-a-real-post', '/not-a-real-page', '/posts/%']) {
    const html = await request(path, { accept: browserAccept })
    const markdown = await request(path, { accept: markdownAccept })
    assert.equal(markdown.status, html.status, path)
    assert.equal(markdown.headers.get('location'), html.headers.get('location'), path)
    assert.doesNotMatch(markdown.headers.get('content-type') ?? '', /^text\/markdown/, path)
  }
  assert.equal((await request(legacy, { accept: markdownAccept })).headers.get('location'), chinesePath)
})

test('feeds, robots, assets, and payloads do not negotiate', async () => {
  for (const path of ['/feed.xml', '/robots.txt', '/sitemap.xml', '/favicon.ico', '/posts/_payload.json', `${newestPath}.md`]) {
    const baseline = await request(path)
    const markdown = await request(path, { accept: markdownAccept })
    assert.equal(markdown.status, baseline.status, path)
    assert.equal(markdown.headers.get('content-type'), baseline.headers.get('content-type'), path)
    assert.deepEqual(Buffer.from(await markdown.arrayBuffer()), Buffer.from(await baseline.arrayBuffer()), path)
  }
})

test('non-GET methods keep the static asset behavior', async () => {
  for (const method of ['POST', 'OPTIONS']) {
    const baseline = await request('/', { method })
    const markdown = await request('/', { method, accept: markdownAccept })
    assert.equal(markdown.status, baseline.status, method)
    assert.doesNotMatch(markdown.headers.get('content-type') ?? '', /^text\/markdown/, method)
  }
})

test('robots keeps the author Content-Signal directive', async () => {
  const text = await (await request('/robots.txt')).text()
  assert.match(text, /^Content-Signal:\s*ai-train=no,\s*search=yes,\s*ai-input=no\s*$/m)
})
