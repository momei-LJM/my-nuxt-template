// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@nuxt/eslint'],
  ssr: false,
  devtools: { enabled: true },
  app: {
    buildAssetsDir: '/static/',
  },
  css: ['~/assets/css/tailwind.css', '~/assets/index.scss'],
  srcDir: 'src',
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/element/index.scss" as element;`,
        },
      },
    },
  },
  hooks: {
    'prerender:routes'({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    },
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  eslint: {
    config: {
      stylistic: true,
      formatters: {
        css: 'prettier',
      },
    },
  },
  tailwindcss: {},
})
