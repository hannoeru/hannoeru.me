import { resolve } from 'path'
import { UserConfig } from 'vite'
import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import PurgeIcons from 'vite-plugin-purge-icons'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import Inspect from 'vite-plugin-inspect'
import Vue from '@vitejs/plugin-vue'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import anchor from 'markdown-it-anchor'
import markdownAttr from 'markdown-it-link-attributes'
import { slugify } from './scripts/slugify'
import { codeBlockFilename } from './scripts/markdown'

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

const config: UserConfig = {
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
        const name = route.name.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '')

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

        md.use(markdownAttr, {
          pattern: /^https?:/,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(codeBlockFilename)
      },
      transforms: {
        after(code) {
          return code.replace(/src=\"(.*?)\"/g, (_, m1) => `src=\"${decodeURI(m1)}\"`)
        },
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: IconsResolver({
        componentPrefix: '',
      }),
    }),

    PurgeIcons(),
    Icons(),

    WindiCSS({
      safelist: 'prose prose-sm m-auto'.split(' '),
      preflight: {
        enableAll: true,
      },
    }),
    Inspect(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}

export default config
