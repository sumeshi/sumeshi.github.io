<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <div v-for="post of posts" :key="post.title">
        <v-card class="logo py-4 justify-center flex-wrap ma-2">
          <v-row>
            <v-col>
              <v-card-title>
                {{ post.title }}
              </v-card-title>
            </v-col>
            <v-col>
              <v-card-text class="text-right">
                <span class="grey--text text--darken-2">
                  {{ post.published_at.replace('T', ' ') }}
                </span>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn class="btn" :href="post.path">
              <span class="caption">see more</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
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
export default class Posts extends Vue {
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

.btn {
  width: 120px;
}

</style>
