import dayjs from 'dayjs'
import { Feed } from 'feed'
import type { FeedOptions } from 'feed'
import type { H3Event } from 'h3'
import { serverQueryContent } from '#content/server'

export const createFeed = async(event: H3Event) => {
  const config = useRuntimeConfig()

  const posts = await serverQueryContent(event)
    .where({
      type: 'post',
      _partial: false,
    })
    .sort({ _file: -1, $numeric: true })
    .find()

  const DOMAIN = config.domain

  const feedOptions: FeedOptions = {
    title: 'Han',
    description: 'Han\'s Portfolio',
    id: `${DOMAIN}/`,
    link: `${DOMAIN}/`,
    image: `${DOMAIN}/avatar.png`,
    favicon: `${DOMAIN}/logo.png`,
    copyright: `CC BY-NC-SA 4.0 ${dayjs().get('year')} © Han`,
    feedLinks: {
      json: `${DOMAIN}/feed.json`,
      atom: `${DOMAIN}/feed.atom`,
      rss: `${DOMAIN}/feed.xml`,
    },
    author: {
      name: 'Han',
      email: 'me@hanlee.co',
      link: DOMAIN,
    },
  }

  const feed = new Feed(feedOptions)

  posts.forEach((post) => {
    const postLink = new URL(post._path!, DOMAIN).toString()
    feed.addItem({
      title: post.title ?? '-',
      id: postLink,
      link: postLink,
      date: new Date(post.date),
      description: post.description,
      image: post.image.startsWith('/') ? new URL(post.image, DOMAIN).toString() : post.image,
      author: [feedOptions.author!],
    })
  })

  return feed
}
