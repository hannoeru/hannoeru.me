import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Inspect from 'vite-plugin-inspect'
import Vue from '@vitejs/plugin-vue'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'
import anchor from 'markdown-it-anchor'
import markdownLinkAttr from 'markdown-it-link-attributes'
// @ts-expect-error types
import markdownAttrs from 'markdown-it-attrs'
import Unocss from 'unocss/vite'
import { slugify } from './scripts/slugify'
import { codeBlockFilename, lazyLoadImage, prose } from './scripts/markdown'
import { buildBlogRSS } from './scripts/rss'
import { optimizeImages } from './scripts/image'

import 'prismjs/components/prism-regex.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-xml-doc.js'
import 'prismjs/components/prism-yaml.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-java.js'
import 'prismjs/components/prism-javadoclike.js'
import 'prismjs/components/prism-javadoc.js'
import 'prismjs/components/prism-jsdoc.js'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
    ],
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        { dir: 'pages', baseRoute: '' },
        { dir: 'posts', baseRoute: 'posts' },
      ],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        const routePath = route.path.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '')
        const name = route.name?.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '')

        return {
          ...route,
          name,
          path: routePath,
          alias: routePath.endsWith('/')
            ? `${routePath}index.html`
            : `${routePath}.html`,
        }
      },
    }),

    Markdown({
      wrapperComponent: 'Post',
      markdownItOptions: {
        breaks: true,
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Prism)
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.ariaHidden({
            placement: 'before',
          }),
        })

        md.use(markdownLinkAttr, {
          pattern: /^https?:/,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(markdownAttrs)

        md.use(lazyLoadImage)
        md.use(codeBlockFilename)
        md.use(prose)
      },
    }),

    Unocss(),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    Inspect(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    async onFinished() {
      await buildBlogRSS()
      await optimizeImages()
    },
  },
})
