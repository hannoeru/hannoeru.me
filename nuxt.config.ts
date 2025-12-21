import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import type { NuxtConfig } from 'nuxt/schema'

const redirects: NonNullable<NuxtConfig['nitro']>['routeRules'] = {
  '/posts/在usg上將vlan流量導向openvpn': { redirect: '/posts/unifi-usg-vlan-openvpn' },
  '/posts/在vestacp的mail-server設定兩個ssl憑證': { redirect: '/posts/vestacp-mail-server-two-ssl-certificates' },
  '/posts/如何使用vpn觀看日本netflix？': { redirect: '/posts/how-to-watch-japanese-netflix-with-vpn' },
  '/posts/macosおすすめのアプリ「istat-mini」': { redirect: '/posts/macos-recommended-app-istat-mini' },
  '/posts/超快速！在日本-amazon-ec2-架設-openvpn-server！！': { redirect: '/posts/fast-deploy-openvpn-server-on-japan-amazon-ec2' },
  '/posts/【javascript】javascript-入門篇-學徒的試煉-最終作業': { redirect: '/posts/javascript-introduction-apprentice-trial-final-work' },
  '/posts/【javascript】js地下城-1f-9x9乘法表': { redirect: '/posts/javascript-dungeon-1f-9x9-multiplication-table' },
  '/posts/【javascript】js地下城-2f-時鐘': { redirect: '/posts/javascript-dungeon-2f-clock' },
  '/posts/【javascript】js地下城-3f-計算機': { redirect: '/posts/javascript-dungeon-3f-calculator' },
  '/posts/【javascript】js地下城-4f-時區': { redirect: '/posts/javascript-dungeon-4f-timezone' },
  '/posts/xmlhttprequest與fetch-api：2019年最適合ajax的是什麼？': { redirect: '/posts/xmlhttprequest-and-fetch-api-what-is-the-best-ajax-in-2019' },
  '/posts/【javascript】js地下城-5f-全台空氣指標儀表板': { redirect: '/posts/javascript-dungeon-5f-taiwan-air-quality-dashboard' },
  '/posts/【javascript】js地下城-6f-60秒算數遊戲': { redirect: '/posts/javascript-dungeon-6f-60-seconds-math-game' },
  '/posts/【javascript】js地下城-7f-畫版': { redirect: '/posts/javascript-dungeon-7f-paint-board' },
  '/posts/【JavaScript】js地下城-8f-井字遊戲': { redirect: '/posts/javascript-dungeon-8f-tic-tac-toe' },
  '/posts/日本-line-moblie-申請流程必備書類文件講解！': { redirect: '/posts/japan-line-mobile-application-process' },
  '/posts/【日本留學】台灣駕照換日本駕照！': { redirect: '/posts/taiwan-japan-driver-license-exchange' },
  '/posts/【javascript】js地下城-9f-抽獎轉盤': { redirect: '/posts/javascript-dungeon-9f-lucky-draw-wheel' },
  '/posts/【vue-js】veevalidate-3-0-使用方法＆導入中文語系': { redirect: '/posts/vue-js-veevalidate-3-chinese-language' },
  '/posts/proxmox-lxc-安裝-docker-docker-compose': { redirect: '/posts/proxmox-lxc-install-docker-compose' },
  '/posts/使用-iphone-透過無線傳輸當作-webcam！！mac、pc通用': { redirect: '/posts/use-iphone-as-webcam-via-wireless' },
  '/posts/美波新曲「アメヲマツ、」中文翻譯': { redirect: '/posts/minami-ame-womatsu-chinese-translation' },
  '/posts/Windi CSS：次世代 Tailwind CSS コンパイラ': { redirect: '/posts/windi-css-next-generation-tailwind-css-compiler' },
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // https://nuxt.com/modules
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@unocss/nuxt', '@vueuse/nuxt', '@nuxthub/core', '@nuxt/eslint', '@nuxt/image'],

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
      // noscript: [
      //   { children: 'Javascript is required' },
      // ],
      htmlAttrs: {
        prefix: 'og: http://ogp.me/ns#',
        lang: 'en',
        class: 'font-sans',
      },
    },
  },
  css: [
    '@/assets/styles/main.css',
  ],
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
            dark: 'vitesse-dark',
            light: 'vitesse-light',
            default: 'vitesse-light',
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
  compatibilityDate: '2024-07-30',
  nitro: {
    prerender: {
      crawlLinks: true,
    },
    routeRules: {
      '/': { prerender: true },
      '/posts/**': { prerender: true },
      '/feed.*': { prerender: true },
      ...Object.fromEntries(Object.entries(redirects).map(([key, value]) => [encodeURI(key), value])),
    },
  },

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
  image: {
    dir: '../public',
  },
  unocss: {
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
