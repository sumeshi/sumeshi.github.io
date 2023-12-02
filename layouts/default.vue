<template>
  <v-app dark>
    <!--navigation menu-->
    <v-navigation-drawer v-model="drawer" fixed app>
      <div class="navmenu d-flex flex-column">
        <v-list>
          <v-list-item
            v-for="(page, i) in pages"
            :key="i"
            :to="page.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon :icon="page.icon" size="16" />
              <v-list-item-title class="ml-2 text-caption" v-text="page.title" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider vertical/>
        <div class="text-caption text-center pa-4">
          <p>Privacy Policy</p>
        </div>
      </div>
    </v-navigation-drawer>

    <!--title bar-->
    <v-app-bar fixed app >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <!--article-->
    <v-main>
      <v-container fill-height>
        <slot />
      </v-container>
    </v-main>

    <!--footer-->
    <v-footer app class="justify-center" >
      <span class="text-caption">&copy; {{ new Date().getFullYear() }} S.Nakano</span>
    </v-footer>

  </v-app>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)

const pages = [
  {
    icon: 'mdi-apps',
    title: 'Home',
    to: '/'
  },
  {
    icon: 'mdi-notebook',
    title: 'Posts',
    to: '/posts'
  }
];

const siteTitle = 'sumeshi.github.io';
useHead({
  titleTemplate: (pageTitle) => {
    return pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle;
  }
})
</script>

<style lang="scss" scoped>
.navmenu {
  height: 100vh;
  max-height: 100vh;
}
.nuxt {
  animation: fadeIn 0.3s ease 0s 1 normal;
}

@keyframes fadeIn {
  0% {opacity: 0}
  100% {opacity: 1}
}
</style>
