import { Lazyload, LazyloadOptions } from '@vant/lazyload'
import { UserModule } from '@/types'

export const install: UserModule = ({ app }) => {
  app.use(Lazyload, {
    observer: true,
    adapter: {
      // set default image weight & height
      loading({ el, naturalHeight, naturalWidth }) {
        el.setAttribute('width', naturalWidth)
        el.setAttribute('height', naturalHeight)
      },
    },
  } as LazyloadOptions)
}
