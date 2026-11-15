import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { ListedPost } from '../modules/page-markdown/render.ts'
import { expandPageComponents, readPosts, renderPostArchive } from '../modules/page-markdown/render.ts'

const siteUrl = 'https://hannoeru.me'
const posts: ListedPost[] = Array.from({ length: 7 }, (_, index) => ({
  path: `/posts/p${index}`,
  title: `Post ${index}`,
  date: `${index < 3 ? 2026 : 2025}-01-0${7 - index}T00:00:00.000Z`,
}))

test('home replaces the identity and recent posts components and keeps the authored text', () => {
  const generated = '---\ncanonical_url: "https://hannoeru.me/"\n---\n\n<about-me>\n\n\n\n</about-me>\n\nHi, I\'m Han.\n\n<recent-posts>\n\n\n\n</recent-posts>\n\n---\n\nConnect with me'
  const markdown = expandPageComponents(generated, posts, siteUrl)
  assert.match(markdown, /^---\ncanonical_url/)
  assert.match(markdown, /# Han（ハン）\n\nSoftware Engineer\n\nHi, I'm Han\./)
  assert.match(markdown, /## Recent posts\n\n- 2026-01-07\. \[Post 0\]\(https:\/\/hannoeru\.me\/posts\/p0\)/)
  assert.match(markdown, /\/posts\/p4\)/)
  assert.doesNotMatch(markdown, /\/posts\/p5\)/)
  assert.match(markdown, /\[All posts\]\(https:\/\/hannoeru\.me\/posts\)\n\n---\n\nConnect with me/)
  assert.doesNotMatch(markdown, /<about-me>|<recent-posts>/)
})

test('archive replaces the list component with dated links grouped by year in the given order', () => {
  const markdown = expandPageComponents('# Posts\n\n<list-posts>\n\n\n\n</list-posts>\n', posts, siteUrl)
  assert.match(markdown, /^# Posts\n\n## 2026\n\n- 2026-01-07\. \[Post 0\]/)
  assert.equal(markdown.match(/## 2025/g)?.length, 1)
  assert.ok(markdown.indexOf('/posts/p2)') < markdown.indexOf('/posts/p3)'))
  assert.doesNotMatch(markdown, /<list-posts>/)
})

test('archive link metadata cannot break labels or destinations', () => {
  const markdown = renderPostArchive([{ path: '/posts/a(b)', title: '[A]\\B\nC', description: '<ListPosts />' }], siteUrl)
  assert.match(markdown, /\(https:\/\/hannoeru\.me\/posts\/a%28b%29\)/)
  assert.match(markdown, /\\\[A\\\]\\\\B C/)
  assert.match(markdown, /\\<ListPosts \/\\>/)
})

test('real posts are read from content with Nuxt Content paths, newest first', async () => {
  const real = await readPosts(new URL('../content/posts/', import.meta.url).pathname)
  assert.equal(real.length, 35)
  assert.ok(real.some(post => post.path === '/posts/vue-js-veevalidate-3-chinese-language'))
  assert.ok(real.every(post => post.title && post.date))
  const dates = real.map(post => post.date ?? '')
  assert.deepEqual(dates, [...dates].sort().reverse())
})
