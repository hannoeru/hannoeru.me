import Negotiator from 'negotiator'

export type Representation = 'html' | 'markdown'

export function selectRepresentation(accept: string | undefined): Representation {
  const selected = new Negotiator({ headers: { accept } }).mediaType(['text/html', 'text/markdown'])
  return selected === 'text/markdown' ? 'markdown' : 'html'
}

export function isContentPagePath(pathname: string): boolean {
  if (/\/[^/]*\.[^/]*\/?$/.test(pathname))
    return false
  return pathname === '/' || pathname === '/posts' || pathname.startsWith('/posts/') || pathname === '/bookmarks'
}

export function varyAccept(current: string | undefined): string {
  const tokens = (current ?? '').split(',').map(token => token.trim()).filter(Boolean)
  if (tokens.some(token => token === '*' || token.toLowerCase() === 'accept'))
    return current ?? 'Accept'
  return [...tokens, 'Accept'].join(', ')
}
