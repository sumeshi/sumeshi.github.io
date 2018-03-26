import Vue from 'vue'
import Router from 'vue-router'

import Profile from '@/components/Profile'
import Links from '@/components/Links'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        Profile: Profile,
        Links: Links
      }
    }
  ]
})
