<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <CardUserOverview 
        name="S.Nakano"
        position="DFIR Researcher / Software Developer"
        :icon="{src: 'glitchme.jpg', link: '/about'}"
        :button="{message: 'see more', link: '/about'}"
        :links="[{name: 'twitter', url: 'https://twitter.com/sum3sh1', message: '@sum3sh1'}]"
      />
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
                  <p>{{post.description}}</p>
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
  description: string
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
</style>
