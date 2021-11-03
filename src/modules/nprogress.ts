import NProgress from 'nprogress'
import { UserModule } from '@/types'

NProgress.configure({
  template: '<div class="bg-sky-400 bg-op-70 fixed z-1031 top-0 left-0 w-full h-2px pointer-none" role="bar" />',
})

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => { NProgress.start() })
    router.afterEach(() => { NProgress.done() })
  }
}
