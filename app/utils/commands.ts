export type SiteDialog = 'closed' | 'search' | 'shortcuts'

export type SiteCommand = {
  label: string
  key: string
  action:
    | { kind: 'navigate', path: '/' | '/posts' | '/bookmarks' }
    | { kind: 'dialog', view: Exclude<SiteDialog, 'closed'> }
    | { kind: 'theme' }
}

export const siteCommands: readonly SiteCommand[] = [
  { label: 'Home', key: 'h', action: { kind: 'navigate', path: '/' } },
  { label: 'Posts', key: 'p', action: { kind: 'navigate', path: '/posts' } },
  { label: 'Bookmarks', key: 'b', action: { kind: 'navigate', path: '/bookmarks' } },
  { label: 'Search posts', key: '/', action: { kind: 'dialog', view: 'search' } },
  { label: 'Keyboard shortcuts', key: '?', action: { kind: 'dialog', view: 'shortcuts' } },
  { label: 'Toggle theme', key: 't', action: { kind: 'theme' } },
]

type ShortcutEvent = Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'repeat' | 'isComposing' | 'defaultPrevented'>

export function matchesShortcut(event: ShortcutEvent, key: string) {
  return !event.ctrlKey
    && !event.metaKey
    && !event.altKey
    && (!event.shiftKey || key === '?')
    && !event.repeat
    && !event.isComposing
    && !event.defaultPrevented
    && event.key.toLowerCase() === key
}
