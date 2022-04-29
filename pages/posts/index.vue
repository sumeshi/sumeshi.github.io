<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <CardText 
        title="Posts"
        :text="[
          'セキュリティとか興味のあることとか色々。',
          'ここで得た知識を悪用しないようお願いいたします。'
        ]"
      />
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

  private head() {
    return {
      title: 'Posts'
    }
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
