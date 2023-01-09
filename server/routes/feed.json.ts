import { createFeed } from '@/utils/feed'

export default defineEventHandler(async(event) => {
  const feed = await createFeed(event)
  setHeader(event, 'content-type', 'application/json')
  send(event, feed.json1())
})
