<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <CardButton
        title="Posts"
        :text="[
          'セキュリティとか興味のあることとか色々。ここで得た知識を悪用しないように。',
          'まとまった内容はdevとかzennに書きます。',
        ]"
        :links="[
          { name: 'dev.to', url: 'https://dev.to/sum3sh1', message: '@sum3sh1', color: 'white' },
          { name: 'zenn.dev', url: 'https://zenn.dev/sum3sh1', message: '@sum3sh1', color: 'blue-lighten-2' },
          { name: 'Qiita', url: 'https://qiita.com/sumeshi', message: '@sumeshi', color: 'green-lighten-2' },
          { name: 'note', url: 'https://note.com/sumeshi_kun/', message: '@sumeshi_kun', color: 'white-darken-2' },
        ]"
      />
      <CardListLatest
        title="All Posts"
        :postIndices="posts"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { PostIndex } from '@/types/post'

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
  width: 180px;
}
</style>
