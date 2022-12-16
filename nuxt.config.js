import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sumeshi.github.io',
    title: 'sumeshi.github.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'DFIR Blog' },
      { hid: 'keywords', name: 'keywords', content: 'Security,DigitalForensics,Python' },

      { hid: 'og:site_name', property: 'og:site_name', content: 'sumeshi.github.io' },
      { hid: 'og:type', property: 'og:type', content: 'blog' },
      { hid: 'og:url', property: 'og:url', content: 'https://sumeshi.github.io' },
      { hid: 'og:title', property: 'og:title', content: 'sumeshi.github.io' },
      { hid: 'og:description', property: 'og:description', content: 'DFIR Blog' },
      // { hid: 'og:image', property: 'og:image', content: '' },

      // { hid: 'twitter:card', name: 'twitter:card', content: '' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@sum3sh1' },
      { name: 'google-site-verification', content: 'oKJDJNVxCY8_al6JndvVYqrjdywDE_5S6ypSCNNFKc8' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '@/components/',
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/google-gtag',
    '@nuxtjs/sitemap',
    ['nuxt-highlightjs', {
      style: 'a11y-dark'
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  'google-gtag': {
    id: 'G-DVLS4LMPGV',
    debug: false
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.lighten4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    base: '/'
  },

  generate: {
    dir: 'docs',
    async routes () {
      const articles = await axios.get('https://sumeshi.github.io/api/posts/')
      return articles.data.map((post) => post.path.replace(/^\//, ''))
    },
    fallback: true
  }
}
