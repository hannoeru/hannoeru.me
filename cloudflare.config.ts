import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'blog',
    compatibilityDate: '2026-05-26',
    assets: {
      htmlHandling: 'drop-trailing-slash',
      notFoundHandling: '404-page',
    },
  },
})
