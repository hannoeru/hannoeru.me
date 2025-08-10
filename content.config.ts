import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        type: z.string().optional(),
        lang: z.string().optional(),
        date: z.coerce.date().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
