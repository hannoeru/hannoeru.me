import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  scrollBehavior: (to, from, savedPosition) => {
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
  },
}
