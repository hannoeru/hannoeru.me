import { queryCollection } from '@nuxt/content/nitro'
import dayjs from 'dayjs'
import type { FeedOptions } from 'feed'
import { Feed } from 'feed'
import type { H3Event } from 'h3'

export const createFeed = async (event: H3Event) => {
  const domain = useRuntimeConfig(event).public.domain

  const posts = await queryCollection(event, 'content')
    .where('type', '=', 'post')
    .order('date', 'DESC')
    .all()

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
    const postLink = new URL(post.path!, domain).toString()
    feed.addItem({
      title: post.title ?? '-',
      id: postLink,
      link: postLink,
      date: new Date(post.date || ''),
      description: post.description,
      image: post.image?.startsWith('/') ? new URL(post.image, domain).toString() : post.image,
      author: [feedOptions.author!],
    })
  })

  return feed
}
