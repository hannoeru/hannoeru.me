import dayjs from 'dayjs'
import { Feed } from 'feed'
import type { FeedOptions } from 'feed'
import type { H3Event } from 'h3'
import { serverQueryContent } from '#content/server'

export const createFeed = async(event: H3Event) => {
  const domain = useRuntimeConfig().public.domain

  const posts = await serverQueryContent(event)
    .where({
      type: 'post',
      _partial: false,
    })
    .sort({ _file: -1, $numeric: true })
    .find()

  const feedOptions: FeedOptions = {
    title: 'Han',
    description: 'Han\'s Portfolio',
    id: `${domain}/`,
    link: `${domain}/`,
    image: `${domain}/avatar.png`,
    favicon: `${domain}/logo.png`,
    copyright: `CC BY-NC-SA 4.0 ${dayjs().get('year')} © Han`,
    feedLinks: {
      json: `${domain}/feed.json`,
      atom: `${domain}/feed.atom`,
      rss: `${domain}/feed.xml`,
    },
    author: {
      name: 'Han',
      email: 'me@hanlee.co',
      link: domain,
    },
  }

  const feed = new Feed(feedOptions)

  posts.forEach((post) => {
    const postLink = new URL(post._path!, domain).toString()
    feed.addItem({
      title: post.title ?? '-',
      id: postLink,
      link: postLink,
      date: new Date(post.date),
      description: post.description,
      image: post.image.startsWith('/') ? new URL(post.image, domain).toString() : post.image,
      author: [feedOptions.author!],
    })
  })

  return feed
}
