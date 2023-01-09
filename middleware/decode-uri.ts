export default defineNuxtRouteMiddleware((to, _from) => {
  const newPath = decodeURI(to.path)

  if (to.path !== newPath)
    navigateTo({ path: newPath, replace: true })
})
