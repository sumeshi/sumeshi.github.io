<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <CardPostLatests
        title="All Posts"
        :postindices="posts"
      />
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

  mounted() {
    axios.get('https://sumeshi.github.io/api/posts/').then(
      (res) => {
        this.posts = res.data.reverse()
      }
    );
  }
}
</script>

<style lang="scss" scoped>

.main {
  max-width: 900px
}

.btn {
  width: 120px;
}

</style>
