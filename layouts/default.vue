<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(page, i) in pages"
            :key="i"
            :to="page.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="page.title" />
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(doc, j) in docs"
            :key="j"
            :to="doc.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ doc.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="doc.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container fill-height>
        <Nuxt class="nuxt" />
      </v-container>
    </v-main>
    <v-footer
      app
      class="justify-center"
    >
      <span class="overline">&copy; {{ new Date().getFullYear() }}  S.Nakano</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
export default {
  data () {
    return {
      drawer: false,
      pages: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-hammer-wrench',
          title: 'Works',
          to: '/works'
        },
        {
          icon: 'mdi-notebook',
          title: 'Posts',
          to: '/posts'
        },
        {
          icon: 'mdi-contacts',
          title: 'About',
          to: '/about'
        }
      ],
      docs: [
        {
          icon: 'mdi-file-document',
          title: 'Terms and Conditions',
          to: '/terms-and-conditions'
        },
        {
          icon: 'mdi-account',
          title: 'Privacy Policy',
          to: '/privacy-policy'
        }
      ],
      title: 'sumeshi.github.io'
    }
  }
}
</script>

<style lang="scss" scoped>
.nuxt {
  animation: fadeIn 0.3s ease 0s 1 normal;
}

@keyframes fadeIn {
  0% {opacity: 0}
  100% {opacity: 1}
}
</style>
