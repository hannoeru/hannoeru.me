<script setup lang="ts">
defineProps<{
  id: string
  level: 2 | 3 | 4 | 5 | 6
}>()
</script>

<template>
  <component :is="`h${level}`" :id="id" class="group scroll-mt-8">
    <slot />
    <a
      :href="`#${id}`"
      class="inline-block ml-2 px-1 font-mono font-400 muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100 hover:accent [@media(hover:none)]:opacity-50"
    >
      <span aria-hidden="true">#</span>
      <span class="sr-only">Link to this section</span>
    </a>
  </component>
</template>
