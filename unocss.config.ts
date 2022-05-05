import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  theme: {
    fontFamily: {
      sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
  },
  presets: [
    presetIcons({
      warn: true,
      scale: 1.2,
    }),
    presetAttributify({
      strict: true,
    }),
    presetUno(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  shortcuts: {
    'link': 'block text-coolgray-500 dark:text-coolgray-400 hover:text-sky-500 dark:hover:text-sky-500',
    'with-filename': ['relative', '!pt-9'],
    'code-block-filename': ['absolute', 'top-0', 'left-0', 'py-1', 'px-2', 'text-xs', 'text-coolgray-700', 'dark:text-coolgray-400', 'bg-coolgray-200', 'dark:bg-dark-300', 'rounded-br'],
  },
})
