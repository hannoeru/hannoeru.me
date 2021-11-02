import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/load.css'
import './styles/markdown.css'
import 'uno.css'

import routes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import App from './App.vue'

import type { RouterScrollBehavior } from 'vue-router'

if (import.meta.env.DEV)
  // eslint-disable-next-line no-console
  console.log(routes)

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return {
      el: decodeURIComponent(to.hash),
      top: 120,
      behavior: 'smooth',
    }
  } else {
    if (savedPosition)
      return savedPosition
    else
      return { top: 0 }
  }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  (ctx) => {
    dayjs.extend(LocalizedFormat)

    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  },
)
