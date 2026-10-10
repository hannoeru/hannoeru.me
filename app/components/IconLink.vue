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
        class="icon-link flex items-center justify-center p-1"
      >
        <slot />
      </a>
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        side="top"
        :side-offset="6"
        class="tooltip-panel"
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
    class="icon-link flex items-center justify-center p-1"
  >
    <slot />
  </a>
</template>
