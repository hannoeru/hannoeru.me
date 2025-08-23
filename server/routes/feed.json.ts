export default defineEventHandler(async (event) => {
  const feed = await createFeed(event)
  setResponseHeader(event, 'content-type', 'application/json')
  return feed.json1()
})
