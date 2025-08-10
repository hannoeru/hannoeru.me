export default defineEventHandler(async (event) => {
  const feed = await createFeed(event)
  setResponseHeader(event, 'content-type', 'application/json')
  send(event, feed.json1())
})
