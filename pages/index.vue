<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="8">
      <v-card class="logo pa-4 justify-center">
        <v-card-text class="d-flex">
          <v-card-text>
            <h3>S.Nakano</h3>
            <p class="overline grey--text text--darken-2">
              DFIR Researcher / Software Developer
            </p>
            <p>twitter: <a href="https://twitter.com/sum3sh1">@sum3sh1</a></p>
          </v-card-text>
          <v-card-text align="center">
            <router-link to="/about">
              <v-hover v-slot="{hover}">
                <v-avatar size="120" :elevation="hover ? 12 : 2" :class="{'on-hover': hover}">
                  <img src="glitchme.jpg" alt="me">
                </v-avatar>
              </v-hover>
            </router-link>
          </v-card-text>
        </v-card-text>
      </v-card>
      <v-card class="logo mt-5 pa-4 justify-center">
        <v-card-text>
          <h2>Latest Posts</h2>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions class="pr-5 pl-5">
          <v-list
            style="width: 100%;"
          >
            <v-list-item
              v-for="(post, i) in posts"
              :key="i"
              :to="post.path"
              router
              exact
            >
              <v-list-item-action>
                <div>
                  <span class="grey--text text--darken-2">
                    {{ post.published_at.replace('T', ' ') }}
                  </span>
                  <h3>{{post.title}}</h3>
                  <p>summary (this feature is not yet implemented.)</p>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

import axios from 'axios'

interface PostIndex {
  title: string
  path: string
  published_at: string
}

@Component({
})
export default class Home extends Vue {
  private posts: Array<PostIndex> = []

  private mounted () {
    axios.get('https://sumeshi.github.io/api/posts/').then(
      (res) => {
        this.posts = res.data
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.v-avatar {
  opacity: 0.6;
  transition: opacity .2s ease-in-out;
}

.v-avatar:not(.on-hover) {
  opacity: 1.0;
 }

</style>
