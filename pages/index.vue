<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <CardUserOverview
        name="S.Nakano"
        position="DFIR Researcher / Software Developer"
        :icon="{ src: '/_nuxt/assets/glitchme.jpg', link: '/posts' }"
        :links="[
          { name: 'GitHub', url: 'https://github.com/sumeshi', message: '@sumeshi', color: 'white' },
          { name: 'X', url: 'https://twitter.com/sum3sh1', message: '@sum3sh1', color: 'white' },
        ]"
      />
      <CardUserAbout
      />
      <CardListLatest
        title="Latest Posts"
        :postIndices="posts"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

const posts = ref([])

onMounted(() => {
  axios.get('https://sumeshi.github.io/api/posts/')
    .then((res) => {
      posts.value = res.data.slice(-5).reverse()
    });
})

useHead({
  title: 'Home',
})
</script>

<style lang="scss" scoped>
.main {
  max-width: 900px;
}
</style>
