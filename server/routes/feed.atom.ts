import { createFeed } from '@/utils/feed'

export default defineEventHandler(async(event) => {
  const feed = await createFeed(event)
  setHeader(event, 'content-type', 'text/xml')
  send(event, feed.atom1())
})
