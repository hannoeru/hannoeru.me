<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'

const props = defineProps<{
  href: string
  title?: string
  newTab?: boolean
}>()

const attrs = useAttrs()
const isNewTab = computed(() => props.newTab ?? props.href.startsWith('http'))
const label = computed(() => props.title)
</script>

<template>
  <TooltipRoot v-if="label">
    <TooltipTrigger as-child>
      <a
        v-bind="attrs"
        :href="href"
        :target="isNewTab ? '_blank' : undefined"
        :rel="isNewTab ? 'noopener' : undefined"
        :aria-label="label"
        class="flex items-center justify-center p-1"
      >
        <slot />
      </a>
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        side="top"
        :side-offset="6"
        class="z-50 rounded bg-dark-900 px-2 py-1 text-xs text-white shadow dark:bg-white dark:text-dark-900"
      >
        {{ label }}
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
  <a
    v-else
    v-bind="attrs"
    :href="href"
    :target="isNewTab ? '_blank' : undefined"
    :rel="isNewTab ? 'noopener' : undefined"
    class="flex items-center justify-center p-1"
  >
    <slot />
  </a>
</template>
