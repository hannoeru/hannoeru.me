import { isContentPagePath, selectRepresentation, varyAccept } from './negotiation'

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

function markdownPath(path: string): string {
  return path === '/' ? '/index.md' : `${path}.md`
}

function decodedPath(pathname: string): string | undefined {
  try {
    return decodeURIComponent(pathname)
  }
  catch {
    return undefined
  }
}

function withVaryAccept(response: Response): Response {
  const result = new Response(response.body, response)
  result.headers.set('Vary', varyAccept(result.headers.get('Vary') ?? undefined))
  return result
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = decodedPath(url.pathname)
    const negotiates = (request.method === 'GET' || request.method === 'HEAD')
      && path !== undefined
      && (path === '/' || !path.endsWith('/'))
      && isContentPagePath(path)
    if (!negotiates)
      return env.ASSETS.fetch(request)

    if (selectRepresentation(request.headers.get('Accept') ?? undefined) === 'markdown') {
      const markdown = await env.ASSETS.fetch(new Request(new URL(markdownPath(path), url), { method: request.method }))
      if (markdown.ok) {
        const response = withVaryAccept(markdown)
        response.headers.set('Content-Type', 'text/markdown; charset=utf-8')
        return response
      }
    }
    return withVaryAccept(await env.ASSETS.fetch(request))
  },
}
