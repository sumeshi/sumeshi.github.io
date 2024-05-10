// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { 
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        { 
          name: 'description',
          content: 'Providing insights into digital forensics, computer geek topics, and more.'
        },
        {
          name: 'google-site-verification',
          content: 'oKJDJNVxCY8_al6JndvVYqrjdywDE_5S6ypSCNNFKc8'
        },
        { property: "og:title", content: "sumeshi.github.io" },
        { property: "og:description", content: "Providing insights into digital forensics, computer geek topics, and more." },
        { property: "og:type", content: "blog" },
        { property: "og:url", content: "https://sumeshi.github.io" },
        { property: "og:image", content: "" },
        { property: "og:site_name", content: "sumeshi.github.io" },
        { property: "og:locale", content: "ja_JP" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@sum3sh1" },
        { name: "twitter:image", content: "https://sumeshi.github.io/img/card.png" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }
      ]
    }
  },
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
