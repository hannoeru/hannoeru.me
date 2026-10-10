import assert from 'node:assert/strict'
import { test } from 'node:test'
import { matchesShortcut, siteCommands } from '../app/utils/commands.ts'
import { matchesPost } from '../app/utils/search.ts'

const keyEvent = {
  key: '/',
  ctrlKey: false,
  metaKey: false,
  altKey: false,
  shiftKey: false,
  repeat: false,
  isComposing: false,
  defaultPrevented: false,
}

test('the registry preserves the real routes and documents every shortcut', () => {
  assert.deepEqual(siteCommands.map(command => [command.label, command.key]), [
    ['Home', 'h'],
    ['Posts', 'p'],
    ['Bookmarks', 'b'],
    ['Search posts', '/'],
    ['Keyboard shortcuts', '?'],
    ['Toggle theme', 't'],
  ])
  assert.deepEqual(siteCommands.map(command => command.action), [
    { kind: 'navigate', path: '/' },
    { kind: 'navigate', path: '/posts' },
    { kind: 'navigate', path: '/bookmarks' },
    { kind: 'dialog', view: 'search' },
    { kind: 'dialog', view: 'shortcuts' },
    { kind: 'theme' },
  ])
})

test('printable keys match without browser modifiers', () => {
  assert.equal(matchesShortcut(keyEvent, '/'), true)
  assert.equal(matchesShortcut({ ...keyEvent, key: 'p' }, 'p'), true)
  assert.equal(matchesShortcut({ ...keyEvent, key: '?', shiftKey: true }, '?'), true)
  assert.equal(matchesShortcut({ ...keyEvent, key: '?' }, '?'), true)
  assert.equal(matchesShortcut({ ...keyEvent, key: 'f' }, '/'), false)
  assert.equal(matchesShortcut({ ...keyEvent, key: 'P', shiftKey: true }, 'p'), false)
})

test('browser modifiers, composition, repeats, and handled events remain untouched', () => {
  for (const flag of ['ctrlKey', 'metaKey', 'altKey', 'shiftKey', 'repeat', 'isComposing', 'defaultPrevented'])
    assert.equal(matchesShortcut({ ...keyEvent, [flag]: true }, '/'), false, flag)

  assert.equal(matchesShortcut({ ...keyEvent, key: '?', shiftKey: true, ctrlKey: true }, '?'), false)
})

test('metadata search matches titles, descriptions, and tags without changing content', () => {
  const post = { title: '在 USG 上設定 VPN', description: 'OpenVPN on Linux', tags: ['Networking', '日本'] }
  assert.equal(matchesPost(post, 'usg'), true)
  assert.equal(matchesPost(post, '日本'), true)
  assert.equal(matchesPost(post, '上設定'), true)
  assert.equal(matchesPost(post, ' vpn  LINUX '), true)
  assert.equal(matchesPost(post, 'ｖｐｎ'), true)
  assert.equal(matchesPost(post, 'VPN Kubernetes'), false)
  assert.equal(matchesPost(post, ''), true)
  assert.equal(matchesPost({}, 'VPN'), false)
  assert.equal(matchesPost({}, ' '), true)
  assert.deepEqual(post, { title: '在 USG 上設定 VPN', description: 'OpenVPN on Linux', tags: ['Networking', '日本'] })
})
