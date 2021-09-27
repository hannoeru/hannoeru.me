import { UserModule } from '@/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to, from, next) => {
    const newPath = decodeURI(to.path)

    if (to.path !== newPath)
      next({ path: newPath, replace: true })
    else
      next()
  })
}
