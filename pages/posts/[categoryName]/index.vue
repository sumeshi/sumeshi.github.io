
<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <CardListLatest
        :title="'Posts/' + $route.params.categoryName + ' (' + posts.length + ' items)'"
        :postIndices="posts"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { PostIndex } from '@/types/post'

const route = useRoute()

const posts: Ref<Array<PostIndex>> = ref([])
onMounted(async () => {
  try {
    const response = await axios.get(`https://sumeshi.github.io/api/posts/${route.params.categoryName}`)
    posts.value = response.data.reverse()
  } catch (error) {
    console.error('Failed to fetch posts data: ', error)
  }
})

useHead({
  title: `Posts/${route.params.categoryName}`,
})
</script>

<style lang="scss" scoped>
.main {
  max-width: 900px
}

.btn {
  width: 180px;
}
</style>
