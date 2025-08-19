export async function useContent() {
  const route = useRoute()
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('content').path(route.path).first()
  })
  return {
    page,
  }
}
