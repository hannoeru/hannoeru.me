export type SearchablePost = {
  title?: string
  description?: string
  tags?: string[]
}

export function matchesPost(post: SearchablePost, query: string) {
  const terms = query.normalize('NFKC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)
  const text = [post.title, post.description, ...post.tags ?? []].join(' ').normalize('NFKC').toLocaleLowerCase()
  return terms.every(term => text.includes(term))
}
