import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import Inspect from 'vite-plugin-inspect'
import Vue from '@vitejs/plugin-vue'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'
import anchor from 'markdown-it-anchor'
import markdownLinkAttr from 'markdown-it-link-attributes'
// @ts-ignore
import markdownAttrs from 'markdown-it-attrs'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno, presetIcons } from 'unocss'
import { slugify } from './scripts/slugify'
import { codeBlockFilename, lazyLoadImage, prose } from './scripts/markdown'
import { buildBlogRSS } from './scripts/rss'
import { optimizeImages } from './scripts/image'

import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike'
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-jsdoc'

function transformCustomDirective() {
  return {
    props: [],
    needRuntime: true,
  }
}

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
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          directiveTransforms: {
            lazy: transformCustomDirective,
          },
        },
      },
    }),

    Pages({
      extensions: ['vue', 'md'],
      pagesDir: [
        { dir: 'posts', baseRoute: 'posts' },
        { dir: 'pages', baseRoute: '' },
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

    Unocss({
      theme: {
        fontFamily: {
          sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        },
      },
      presets: [
        presetIcons({ warn: true }),
        presetAttributify(),
        presetUno(),
      ],
      shortcuts: {
        'link': 'block text-coolgray-500 dark:text-coolgray-400 hover:text-sky-500 dark:hover:text-sky-500',
        'with-filename': ['relative', '!pt-9'],
        'code-block-filename': ['absolute', 'top-0', 'left-0', 'py-1', 'px-2', 'text-xs', 'text-coolgray-700', 'dark:text-coolgray-400', 'bg-coolgray-200', 'dark:bg-dark-300', 'rounded-br'],
      },
    }),

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
      resolvers: [
        IconsResolver({
          prefix: false,
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
  ssgOptions: {
    formatting: 'minify',
    async onFinished() {
      await buildBlogRSS()
      await optimizeImages()
    },
  },
})
