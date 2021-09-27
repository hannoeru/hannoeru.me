import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  extract: {
    include: [
      'index.html',
      'posts/**/*.md',
      'pages/**/*.md',
      'src/**/*.{vue,ts}',
    ],
  },
  darkMode: 'class',
  plugins: [
    typography(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      },
      typography: {
        DEFAULT: {
          css: [{
            color: 'inherit',
            a: {
              color: '#48B0F1',
              textDecoration: 'none',
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
            pre: { color: 'inherit', fontSize: '.9rem' },
            thead: { color: 'inherit' },
            blockquote: { color: 'inherit' },
            table: {
              borderCollapse: 'collapse',
            },
          }],
        },
      },
    },
  },
})
