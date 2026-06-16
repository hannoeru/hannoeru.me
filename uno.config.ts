import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  icons: {
    scale: 1.2,
    warn: true,
  },
  attributify: {
    strict: true,
  },
  preflight: true,
  theme: {
    fontFamily: {
      sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  shortcuts: {
    'icon-link': 'block text-coolgray-500 dark:text-coolgray-400 hover:text-sky-500 dark:hover:text-sky-500',
  },
  rules: [],
})
