import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parseFrontMatter } from 'remark-mdc'

export interface ListedPost {
  path: string
  title?: string
  date?: string
  description?: string
}

const recentPostCount = 5

function escapeLabel(value: string): string {
  return value.replace(/([\\`*_[\]<>])/g, '\\$1').replace(/\r?\n/g, ' ')
}

function isoDate(post: ListedPost): string {
  return post.date ? new Date(post.date).toISOString().slice(0, 10) : ''
}

function postLine(post: ListedPost, siteUrl: string): string {
  const date = isoDate(post)
  const destination = new URL(post.path, siteUrl).href.replace(/\(/g, '%28').replace(/\)/g, '%29')
  return `- ${date ? `${date}. ` : ''}[${escapeLabel(post.title ?? post.path)}](${destination})${post.description ? `\n  ${escapeLabel(post.description)}` : ''}`
}

export function renderPostArchive(posts: ListedPost[], siteUrl: string): string {
  const groups = new Map<string, string[]>()
  for (const post of posts) {
    const year = isoDate(post).slice(0, 4) || 'Undated'
    groups.set(year, [...groups.get(year) ?? [], postLine(post, siteUrl)])
  }
  return [...groups].map(([year, entries]) => `## ${year}\n\n${entries.join('\n')}`).join('\n\n')
}

export function renderRecentPosts(posts: ListedPost[], siteUrl: string): string {
  const lines = posts.slice(0, recentPostCount).map(post => postLine(post, siteUrl))
  return `## Recent posts\n\n${lines.join('\n')}\n\n[All posts](${new URL('/posts', siteUrl).href})`
}

export function expandPageComponents(markdown: string, posts: ListedPost[], siteUrl: string): string {
  return markdown
    .replace(/<about-me>\s*<\/about-me>/, '# Han（ハン）\n\nSoftware Engineer')
    .replace(/<recent-posts>\s*<\/recent-posts>/, () => renderRecentPosts(posts, siteUrl))
    .replace(/<list-posts>\s*<\/list-posts>/, () => renderPostArchive(posts, siteUrl))
}

export async function readPosts(directory: string): Promise<ListedPost[]> {
  const names = (await readdir(directory)).filter(name => name.endsWith('.md'))
  const posts = await Promise.all(names.map(async (name) => {
    const { data } = parseFrontMatter(await readFile(join(directory, name), 'utf8'))
    return {
      type: data.type,
      path: `/posts/${name.replace(/^\d+\./, '').replace(/\.md$/, '')}`,
      title: typeof data.title === 'string' ? data.title : undefined,
      date: data.date ? new Date(data.date).toISOString() : undefined,
      description: typeof data.description === 'string' ? data.description : undefined,
    }
  }))
  return posts
    .filter(({ type }) => type === 'post')
    .map(({ type: _, ...post }) => post)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}
