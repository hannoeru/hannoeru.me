import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/load.css'
import './styles/markdown.css'
import 'uno.css'

import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import App from './App.vue'

import type { RouterScrollBehavior } from 'vue-router'

import routes from '~pages'
import { UserModule } from './types'

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
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition)
          resolve(savedPosition)
        else
          resolve({ left: 0, top: 0 })
      }, 300)
    })
  }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  (ctx) => {
    dayjs.extend(LocalizedFormat)

    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
