// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { MAIN_DARK_THEME, mainDarkTheme } from '@/helpers/themes'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: MAIN_DARK_THEME,
      themes: {
        mainDarkTheme,
      },
      variations: {
        colors: ['primary', 'secondary', 'accent'],
        lighten: 9,
        darken: 9,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
