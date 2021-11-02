import MarkdownIt from 'markdown-it'
import { toArray } from '@antfu/utils'

export const codeBlockFilename = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const langInfo = token.info.split(' ')
    const langName = langInfo?.length ? langInfo[0] : ''
    const filename = langName.length && langInfo[1] ? langInfo[1] : null

    // remove filename
    token.info = langName

    const rawCode = fence(...args)

    const finalCode = filename
      ? rawCode.replace(/<pre class="language-(\w+)">/, `<pre class="language-$1 with-filename"><div class="code-block-filename">${filename}</div>`)
      : rawCode

    return finalCode
  }
}

// lazy load image
export const lazyLoadImage = (md: MarkdownIt) => {
  const image = md.renderer.rules.image!
  md.renderer.rules.image = (...args) => {
    return image(...args).replace(/src="(.*?)"/g, 'v-lazy="\'$1\'"')
  }
}

type Mapping = {
  [key: string]: string | string[]
}

const mapping: Mapping = {
  h1: ['text-4xl', 'font-extrabold', 'mb-1em', 'next:mt-0'],
  h2: ['text-2xl', 'font-bold', 'mt-2em', 'mb-1em', 'next:mt-0'],
  h3: ['text-xl', 'font-semibold', 'mt-1.6em', 'mb-0.6em', 'next:mt-0'],
  h4: ['font-semibold', 'mt-1.5em', 'mb-0.5em', 'next:mt-0'],
  p: ['my-1.25em last:mt-0 first:mb-0 leading-[1.75]'],
  blockquote: ['px-5 py-2 op-80 border-l-3 my-1.6em italic last:mt-0 first:mb-0 color-inherit'],
  a: ['text-sky-500 dark:text-sky-400 font-medium hover:underline'],
  ul: ['my-1.25em', 'list-disc', 'list-inside', 'px-2'],
  li: ['my-0.5em'],
  hr: ['w-50px', 'mx-auto', 'my-2em', 'dark:border-cool-gray-300', 'border-dark-100'],
  img: ['w-full', 'my-2em', 'rounded-lg', 'md:rounded-xl'],
  strong: ['font-semibold'],
  table: ['w-full', 'my-2em', 'text-left', 'table-auto', 'font-0.875em'],
  video: ['my-2em'],
  figure: ['my-2em children:my-2em'],
}

const splitWithSpace = (s: string) => (s ? s.split(' ') : [])

const parseTokens = (tokens: any[]) => {
  tokens.forEach((token) => {
    if (/(_open$|image|hr)/.test(token.type) && mapping[token.tag]) {
      const orig = splitWithSpace(token.attrGet('class'))
      const addition = toArray(mapping[token.tag])
      token.attrSet('class', [...orig, ...addition].join(' '))
    }
    if (token.children)
      parseTokens(token.children)
  })
}

export const prose = (md: MarkdownIt) => {
  md.core.ruler.push('prose', state => parseTokens(state.tokens))
}
