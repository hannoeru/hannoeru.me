import type { NuxtConfig } from 'nuxt/schema'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { legacyRedirects } from './shared/legacy-redirects'

// Do not emit static HTML for old URLs: Cloudflare assets can otherwise
// shadow the redirects. Keep URL moves permanent and out of the sitemap.
const legacyRouteRules = Object.fromEntries(
  Object.entries(legacyRedirects).map(([path, to]) => [path, {
    redirect: { to, statusCode: 301 },
    prerender: false,
  }]),
) satisfies NonNullable<NuxtConfig['nitro']>['routeRules']

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // https://nuxt.com/modules
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@unocss/nuxt', '@vueuse/nuxt', '@nuxt/eslint', '@nuxt/image', '@nuxtjs/seo'],

  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { property: 'og:title', content: 'Han' },
        { property: 'og:image', content: 'https://hannoeru.me/avatar.png' },
        { name: 'description', content: 'Han\'s Portfolio' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@hannoeru' },
        { name: 'msapplication-TileColor', content: '#000' },
        { name: 'theme-color', content: '#000' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'alternate', type: 'application/rss+xml', title: 'Han\'s Blog', href: '/feed.xml',
        },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@200;400;600&display=swap' },
        {
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@200;400;600&display=swap',
          rel: 'stylesheet',
          media: 'print',
          onload: 'this.media=\'all\'',
        },
      ],
      // noscript: [
      //   { children: 'Javascript is required' },
      // ],
      htmlAttrs: {
        prefix: 'og: http://ogp.me/ns#',
        lang: 'en',
      },
    },
  },
  // https://nuxtseo.com/docs/nuxt-seo/getting-started/installation
  site: {
    url: 'https://hannoeru.me',
    name: 'Han',
    trailingSlash: false,
  },
  colorMode: {
    classSuffix: '',
  },
  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        remarkPlugins: {
          'remark-breaks': {},
        },
        highlight: {
          theme: {
            dark: 'github-dark-default',
            light: 'github-light',
            default: 'github-light',
          },
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      domain: 'https://hannoeru.me',
    },
  },
  // reka-ui imports Vue directly. Bundling it into the server build keeps
  // that Vue the same instance as the renderer. Otherwise SSR calls
  // renderSlot() with no current instance and prerender crashes.
  build: {
    transpile: ['reka-ui'],
  },
  routeRules: {
    '/': { prerender: true },
    '/posts/**': { prerender: true },
    '/feed.*': { prerender: true },
    ...legacyRouteRules,
  },
  compatibilityDate: '2026-05-26',
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
      routes: ['/feed.xml', '/feed.atom', '/feed.json', '/sitemap.xml', '/robots.txt'],
    },
    hooks: {
      async compiled(nitro) {
        const redirects = Object.entries(legacyRedirects)
          .flatMap(([path, to]) => {
            const encoded = encodeURI(path)
            return [...new Set([encoded, encoded.replace(/%[\dA-F]{2}/g, escape => escape.toLowerCase())])]
              .map(source => `${source} ${to} 301`)
          })
          .join('\n')
        await writeFile(join(nitro.options.output.publicDir, '_redirects'), `${redirects}\n`)
      },
    },
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  image: {
    provider: import.meta.env.PROD ? 'cloudflare' : 'ipx',
    quality: 76,
    format: ['avif', 'webp'],
    cloudflare: {
      baseURL: 'https://hoyudesign.com',
    },
  },

  // https://nuxtseo.com/docs/sitemap/getting-started/installation
  sitemap: {
    zeroRuntime: true,
    exclude: Object.keys(legacyRedirects).flatMap(path => [path, encodeURI(path)]),
  },
})
