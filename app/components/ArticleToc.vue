<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const props = defineProps<{
  links: TocLink[]
}>()

const ids = computed(() => props.links.flatMap(link => [link.id, ...link.children?.map(child => child.id) ?? []]))
const activeId = ref<string>()
const { y } = useWindowScroll()

function updateActive() {
  const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atEnd) {
    activeId.value = ids.value.at(-1)
    return
  }
  const offset = window.innerHeight * 0.25
  activeId.value = ids.value.findLast(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= offset)
}

onMounted(updateActive)
watchThrottled(y, updateActive, { throttle: 100, trailing: true })
</script>

<template>
  <details class="xl:hidden mb-10 border line-color rounded-lg text-[.875rem] [&[open]>summary]:border-b">
    <summary class="flex items-center gap-2 py-3 px-4 cursor-pointer select-none heading-color line-color list-none [&::-webkit-details-marker]:hidden">
      <span aria-hidden="true" class="i-carbon:list size-4 muted" />
      On this page
      <span aria-hidden="true" class="i-carbon:chevron-down size-4 ml-auto muted transition-transform duration-150 [details[open]_&]:rotate-180" />
    </summary>
    <nav aria-label="On this page" class="py-2 px-4">
      <ArticleTocList :links="links" :active-id="activeId" />
    </nav>
  </details>
  <aside class="hidden xl:block absolute top-0 bottom-0 left-[calc(100%+3rem)] w-56">
    <nav aria-label="On this page" class="sticky top-8 max-h-[calc(100dvh-4rem)] overflow-y-auto text-[.8125rem] leading-[1.5]">
      <p class="mb-3 font-mono text-[.75rem] muted">
        On this page
      </p>
      <ArticleTocList :links="links" :active-id="activeId" />
      <a href="#main-content" class="inline-flex items-center gap-1 mt-4 font-mono text-[.75rem] muted hover:accent">
        <span aria-hidden="true" class="i-carbon:arrow-up size-3" />
        Back to top
      </a>
    </nav>
  </aside>
</template>
