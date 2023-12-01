<template>
  <v-app dark>
    <!--navigation menu-->
    <v-navigation-drawer v-model="drawer" fixed app >
      <v-list>
        <v-list-item
          v-for="(page, i) in pages"
          :key="i"
          :to="page.to"
          router
          exact
        >
          <v-list-item-action>
            <span>
              <v-icon>{{ page.icon }}</v-icon>
              <v-list-item-title v-text="page.title" />
            </span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--title bar-->
    <v-app-bar fixed app >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link class="toolbar-title" to="/">
        <v-toolbar-title v-text="title" />
      </router-link>
    </v-app-bar>

    <!--article-->
    <v-main>
      <v-container fill-height>
        <slot />
      </v-container>
    </v-main>

    <!--footer-->
    <v-footer app class="justify-center" >
      <span class="overline">&copy; {{ new Date().getFullYear() }}  S.Nakano</span>
    </v-footer>

  </v-app>
</template>


<script lang="ts" setup>
const drawer: Ref<boolean> = useState('drawer', () => false)
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

defineProps({
})


const siteTitle = 'sumeshi.github.io';
useHead({
  titleTemplate: (pageTitle) => {
    return pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle;
  }
})
</script>

<style lang="scss" scoped>

.toolbar-title {
  color: white;
  margin-left: 1em;
  text-decoration: none;
}

.nuxt {
  animation: fadeIn 0.3s ease 0s 1 normal;
}

@keyframes fadeIn {
  0% {opacity: 0}
  100% {opacity: 1}
}
</style>
