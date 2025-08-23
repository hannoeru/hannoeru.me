export default defineEventHandler(async (event) => {
  const feed = await createFeed(event)
  setResponseHeader(event, 'content-type', 'text/xml')
  return feed.atom1()
})
