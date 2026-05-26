<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  blank?: boolean
}>(), {
  href: '',
  blank: false,
})

const isHttpExternal = computed(() => /^(?:https?:)?\/\//i.test(props.href))
const hasNonHttpProtocol = computed(() => /^[a-z][a-z\d+.-]*:/i.test(props.href) && !/^https?:/i.test(props.href))
const opensInNewTab = computed(() => props.blank || isHttpExternal.value)
</script>

<template>
  <a
    v-if="isHttpExternal || hasNonHttpProtocol || blank"
    :href="href"
    :target="opensInNewTab ? '_blank' : undefined"
    :rel="opensInNewTab ? 'noopener noreferrer' : undefined"
    class="text-sky-500 dark:text-sky-400 font-medium hover:underline"
  >
    <slot />
  </a>
  <NuxtLink v-else :to="href" class="text-sky-500 dark:text-sky-400 font-medium hover:underline">
    <slot />
  </NuxtLink>
</template>
