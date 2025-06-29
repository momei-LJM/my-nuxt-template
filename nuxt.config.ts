// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@nuxt/eslint'],
  devtools: { enabled: true },
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
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  tailwindcss: {},
})
