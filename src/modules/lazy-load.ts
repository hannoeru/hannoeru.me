import { Lazyload } from '@vant/lazyload'
import { UserModule } from '@/types'

export const install: UserModule = ({ app }) => {
  app.use(Lazyload, {
    observer: true,
  })
}
