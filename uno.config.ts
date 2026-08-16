import {
  defineConfig,
  presetAttributify,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetIcons } from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify({ strict: true }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    font: {
      sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  shortcuts: {
    'icon-link': 'block text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-500',
  },
  rules: [],
})
