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
      <CardListLatest
        title="All Posts"
        :postindices="posts"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface PostIndex {
  title: string
  path: string
  published_at: string
}

const posts: Ref<Array<PostIndex>> = ref([])
onMounted(async () => {
  try {
    const response = await axios.get('https://sumeshi.github.io/api/posts/')
    posts.value = response.data.reverse()
  } catch (error) {
    console.error('Failed to fetch posts data: ', error)
  }
})

useHead({
  title: 'Posts',
})
</script>

<style lang="scss" scoped>

.main {
  max-width: 900px
}

.btn {
  width: 120px;
}

</style>
