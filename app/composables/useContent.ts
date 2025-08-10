export async function useContent() {
  const route = useRoute()
  const { data: page } = await useAsyncData(route.path, () => {
    console.log(route.path)
    return queryCollection('content').path(route.path).first()
  })
  return {
    page,
  }
}
