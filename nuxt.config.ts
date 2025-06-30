// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],
  ssr: false,
  devtools: { enabled: true },
  app: {
    buildAssetsDir: '/static/',
    rootId: 'app',
    head: {
      script: [
        {
          src: 'https://cdn3.codesign.qq.com/icons/1Yyg5Zpx8DZ2lKv/latest/iconfont.js',
        },
        {
          src: 'https://cdn3.codesign.qq.com/icons/XMx86jz7rL9brz3/latest/iconfont.js',
        },
      ],
    },
  },
  css: ['~/assets/css/tailwind.css', '~/assets/index.scss'],
  spaLoadingTemplate: 'app/spa-loading-template.html',

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
      routes.clear() // 不预渲染路由 只有index/404/200 .html
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
        html: 'prettier',
      },
    },
  },
  tailwindcss: {},
})
