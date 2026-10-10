<script setup lang="ts">
const props = withDefaults(defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: () => [],
  meta: null,
  class: null,
})

const label = computed(() => props.filename || props.language || 'Code')
const copyState = shallowRef<
  | { kind: 'idle' }
  | { kind: 'pending' }
  | { kind: 'error', message: string }
>({ kind: 'idle' })
const { copy, copied, isSupported } = useClipboardItems({ read: false })

async function copyCode() {
  if (!isSupported.value) {
    copyState.value = { kind: 'error', message: 'Copy is unavailable. Select the code to copy it.' }
    return
  }
  copyState.value = { kind: 'pending' }
  try {
    const item = new ClipboardItem({ 'text/plain': new Blob([props.code], { type: 'text/plain' }) })
    await copy([item])
    copyState.value = { kind: 'idle' }
  }
  catch {
    copyState.value = { kind: 'error', message: 'Could not copy. Select the code to copy it.' }
  }
}
</script>

<template>
  <div class="code-panel">
    <div class="code-header">
      <span class="code-label">{{ label }}</span>
      <span v-if="filename && language" class="code-language">{{ language }}</span>
      <button
        type="button"
        class="code-copy"
        :aria-label="copied && copyState.kind === 'idle' ? `Copied ${label} code` : `Copy ${label} code`"
        :disabled="copyState.kind === 'pending'"
        @click="copyCode"
      >
        <span v-if="copied && copyState.kind === 'idle'" i-ri-check-line aria-hidden="true" />
        <span v-else i-ri-file-copy-line aria-hidden="true" />
        {{ copied && copyState.kind === 'idle' ? 'Copied' : 'Copy' }}
      </button>
      <span role="status" class="sr-only">{{ copied && copyState.kind === 'idle' ? 'Code copied to clipboard.' : '' }}</span>
    </div>
    <pre :class="['code-body', props.class]" tabindex="0" :aria-label="`${label} code, scroll horizontally for long lines`"><slot /></pre>
    <p v-if="copyState.kind === 'error'" role="alert" class="code-error">
      {{ copyState.message }}
    </p>
  </div>
</template>
