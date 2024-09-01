import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // https://nuxt.com/modules
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@unocss/nuxt', '@vueuse/nuxt', '@nuxthub/core', '@nuxt/eslint', '@nuxt/image'],

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {},

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Han',
      meta: [
        { property: 'og:title', content: 'Han' },
        { property: 'og:image', content: 'https://hannoeru.me/avatar.png' },
        { property: 'og:type', content: 'website' },
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
      noscript: [
        { children: 'Javascript is required' },
      ],
      htmlAttrs: {
        prefix: 'og: http://ogp.me/ns#',
        lang: 'en',
        class: 'font-sans',
      },
    },
  },
  runtimeConfig: {
    public: {
      domain: 'https://hannoeru.me',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
    routeRules: {
      '/': { static: true },
      '/posts/**': { static: true },
      '/images/**': { headers: { 'cache-control': 'immutable, max-age=31536000' } },
      '/_ipx/_/**': { redirect: '/:splat' },
    },
  },
  css: [
    '@/assets/styles/main.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  content: {
    documentDriven: true,
    highlight: {
      preload: ['vue', 'ts'],
      theme: {
        dark: 'vitesse-dark',
        light: 'vitesse-light',
        default: 'vitesse-light',
      },
    },
    markdown: {
      remarkPlugins: ['remark-breaks'],
    },
    experimental: {
      clientDB: false,
      stripQueryParameters: true,
    },
  },
  unocss: {
    uno: true,
    icons: {
      scale: 1.2,
      warn: true,
    },
    attributify: {
      strict: true,
    },
    preflight: true,
    theme: {
      fontFamily: {
        sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      },
    },
    transformers: [
      transformerVariantGroup(),
      transformerDirectives(),
    ],
    shortcuts: {
      'icon-link': 'block text-coolgray-500 dark:text-coolgray-400 hover:text-sky-500 dark:hover:text-sky-500',
    },
    rules: [],
  },
})
