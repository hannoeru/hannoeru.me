<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import type { SiteCommand, SiteDialog } from '~/utils/commands'
import { matchesShortcut, siteCommands } from '~/utils/commands'

const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()
const colorMode = useColorMode()
const dialog = shallowRef<SiteDialog>('closed')
const navigationError = shallowRef('')
const shortcutsEnabled = useLocalStorage('han:character-shortcuts', true, { initOnMounted: true })
const navigationCommands = siteCommands.filter(command => command.action.kind === 'navigate')
const toolCommands = siteCommands.filter(command => command.action.kind !== 'navigate')
let returnFocus: HTMLElement | null = null

function execute(command: SiteCommand) {
  const action = command.action
  switch (action.kind) {
    case 'navigate':
      void navigateTo(action.path)
      break
    case 'dialog':
      returnFocus = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null
      navigationError.value = ''
      dialog.value = action.view
      break
    case 'theme':
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      break
    default: {
      const exhaustive: never = action
      return exhaustive
    }
  }
}

function focusDialog(event: Event) {
  event.preventDefault()
  nextTick(() => {
    if (dialog.value === 'search')
      document.getElementById('post-search')?.focus()
    else
      document.getElementById('site-dialog-close')?.focus()
  })
}

function restoreFocus(event: Event) {
  event.preventDefault()
  if (returnFocus?.isConnected)
    returnFocus.focus()
  else
    document.getElementById('site-search-button')?.focus()
}

onKeyStroke((event) => {
  if (!shortcutsEnabled.value || dialog.value !== 'closed')
    return

  const editable = event.composedPath().some(target => target instanceof HTMLElement
    && (target.isContentEditable || target.closest('input, textarea, select, [role="textbox"], [role="searchbox"], [role="combobox"]')))
  if (editable)
    return

  const command = siteCommands.find(command => matchesShortcut(event, command.key))
  if (!command)
    return

  event.preventDefault()
  execute(command)
}, { dedupe: true })

function closeForNavigation() {
  returnFocus = document.getElementById('main-content')
  dialog.value = 'closed'
}

async function selectPost(path: string) {
  navigationError.value = ''
  const destination = router.resolve(path)
  if (router.currentRoute.value.fullPath === destination.fullPath) {
    closeForNavigation()
    return
  }

  let removeHook: (() => void) | undefined
  const pageReady = router.currentRoute.value.path === destination.path
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        removeHook = nuxtApp.hook('page:finish', () => resolve())
      })
  try {
    const failure = await router.push(path)
    if (failure)
      return
    await pageReady
    closeForNavigation()
  }
  catch {
    navigationError.value = 'This post could not open. Try again.'
  }
  finally {
    removeHook?.()
  }
}
</script>

<template>
  <header class="site-header">
    <a
      href="/"
      class="wordmark"
      aria-label="Han, home"
    >h<span class="accent">.</span></a>
    <nav aria-label="Main navigation" class="site-nav">
      <template v-for="command in navigationCommands" :key="command.key">
        <NuxtLink
          v-if="command.action.kind === 'navigate'"
          :to="command.action.path"
          class="nav-link"
          :aria-current="route.path === command.action.path || (command.action.path === '/posts' && route.path.startsWith('/posts/')) ? 'page' : undefined"
        >
          {{ command.label }}
        </NuxtLink>
      </template>
    </nav>
    <div class="site-tools">
      <button
        v-for="command in toolCommands"
        :id="command.action.kind === 'dialog' && command.action.view === 'search' ? 'site-search-button' : undefined"
        :key="command.key"
        type="button"
        class="tool-button"
        :aria-label="command.label"
        :title="`${command.label} (${command.key})`"
        @click="execute(command)"
      >
        <span v-if="command.key === '/'" i-ri-search-line aria-hidden="true" />
        <span v-else-if="command.key === '?'" i-ri-keyboard-line aria-hidden="true" />
        <span
          v-else
          i-ri-sun-line
          class="dark:hidden"
          aria-hidden="true"
        />
        <span
          v-if="command.action.kind === 'theme'"
          i-ri-moon-line
          class="hidden dark:block"
          aria-hidden="true"
        />
      </button>
    </div>
  </header>
  <DialogRoot :open="dialog !== 'closed'" @update:open="open => { if (!open) dialog = 'closed' }">
    <DialogPortal>
      <DialogOverlay class="dialog-overlay" />
      <DialogContent
        class="site-dialog"
        @open-auto-focus="focusDialog"
        @close-auto-focus="restoreFocus"
        @escape-key-down="event => { if (event.isComposing) event.preventDefault() }"
      >
        <div class="dialog-heading">
          <DialogTitle>{{ dialog === 'search' ? 'Search posts' : 'Keyboard shortcuts' }}</DialogTitle>
          <DialogClose as-child>
            <button
              id="site-dialog-close"
              type="button"
              class="tool-button"
              aria-label="Close dialog"
            >
              <span i-ri-close-line aria-hidden="true" />
            </button>
          </DialogClose>
        </div>
        <DialogDescription class="dialog-description">
          {{ dialog === 'search' ? 'Search titles, descriptions, and tags. Use Tab to choose a result.' : 'Use these keys when you are not typing in a field. Browser modifier shortcuts are unchanged.' }}
        </DialogDescription>
        <SearchPosts v-if="dialog === 'search'" @select="selectPost" />
        <p v-if="navigationError" role="alert" class="dialog-description">
          {{ navigationError }}
        </p>
        <dl v-if="dialog === 'shortcuts'" class="shortcut-list">
          <div v-for="command in siteCommands" :key="command.key" class="shortcut-row">
            <dt>{{ command.label }}</dt>
            <dd><kbd class="shortcut-key">{{ command.key }}</kbd></dd>
          </div>
          <div class="shortcut-row">
            <dt>Close dialog</dt>
            <dd><kbd class="shortcut-key">Esc</kbd></dd>
          </div>
        </dl>
        <label class="shortcut-setting">
          <input v-model="shortcutsEnabled" type="checkbox" class="accent-accent-light dark:accent-accent-dark">
          Enable single-key shortcuts
        </label>
        <p class="dialog-note">
          <kbd class="shortcut-key">Esc</kbd> to close
        </p>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
