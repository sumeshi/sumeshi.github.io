// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.scss',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: ['nuxt-gtag'],
  gtag: {
    id: 'G-DVLS4LMPGV',
    config: {
      page_title: 'sumeshi.github.io'
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
