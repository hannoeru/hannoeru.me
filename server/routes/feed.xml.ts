import { createFeed } from '~~/server/utils/feed'

export default defineEventHandler(async (event) => {
  const feed = await createFeed(event)
  setResponseHeader(event, 'content-type', 'text/xml')
  send(event, feed.rss2())
})
