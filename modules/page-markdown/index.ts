import { join } from 'node:path'
import { defineNuxtModule } from 'nuxt/kit'
import { expandPageComponents, readPosts } from './render'

// nuxt-ai-ready serializes Nuxt Content bodies, so Vue components such as
// <ListPosts /> become empty tags in the generated .md files.
export default defineNuxtModule({
  meta: { name: 'page-markdown' },
  setup(_, nuxt) {
    const siteUrl = String(nuxt.options.runtimeConfig.public.domain)
    let posts: ReturnType<typeof readPosts> | undefined
    nuxt.hook('ai-ready:page:markdown', async (context) => {
      if (context.route !== '/' && context.route !== '/posts')
        return
      posts ??= readPosts(join(nuxt.options.rootDir, 'content/posts'))
      context.markdown = expandPageComponents(context.markdown, await posts, siteUrl)
    })
  },
})
