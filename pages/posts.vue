<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-for="post of posts" :key="post.title">
        <v-card class="logo py-4 justify-center flex-wrap ma-2">
          <v-card-title>
            {{ post.title }}
          </v-card-title>
          <v-card-text>{{ post.publishedAt }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="btn" :href="post.path">
              <span class="caption">Open</span>
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
  publishedAt: string
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
