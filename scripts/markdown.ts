import MarkdownIt from 'markdown-it'

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
    return image(...args).replace(/src="(.*?)"/g, `v-lazy="'$1'"`)
  }
}
