<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <div>
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
          <v-layout class="wrap" style="max-width: 100%; height: auto;" >
            <v-card-text class="html-wrapper" v-html="post.html_text" />
          </v-layout>
          <v-card-actions class="justify-center">
            <v-btn class="btn" @click="$router.go(-1)">
              <span class="caption">back</span>
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

interface PostContent {
  title: string
  path: string
  html_text: string
  published_at: string
}

@Component({
})
export default class Post extends Vue {
  private post: PostContent = {
    title: '',
    path: '',
    html_text: '',
    published_at: ''
  };

  private mounted() {
    axios.get(`https://sumeshi.github.io/api/posts/${this.$route.params.id}/index.html`).then(
      (res) => {
        this.post = res.data
        this.post.html_text = this.post.html_text.replaceAll('<img', '<img style="max-width: 100%; margin: 2em 0 2em 0;"')
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
