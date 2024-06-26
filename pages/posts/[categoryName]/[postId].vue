<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <v-card class="pa-5">
        <!--title bar-->
        <v-card-title class="text-overline">
          <div class="d-flex justify-space-between">
            <span class="me-auto pt-1"><NuxtLink to='/posts/'>POSTS</NuxtLink> / <NuxtLink :to="'/posts/' + $route.params.categoryName">{{ $route.params.categoryName }}</NuxtLink> / {{ $route.params.postId }}</span>
            <span class="pt-1 text-grey-darken-1">{{ post.published_at.replace('T', ' ') }}</span>
            <span>
              <BaseButtonIcon 
                class="ma-1 ml-1"
                iconName="mdi-github"
                :link="`https://github.com/sumeshi/api/blob/master/${$route.params.categoryName}/${$route.params.postId}.md`"
                color="black"
                size="18"
              />
            </span>
          </div>
        </v-card-title>

        <v-divider style="margin-bottom: 2em;" />
        <div v-for="content of post.contents" :key="content.id">
          <!--markdown-->
          <div class="html-wrapper" v-if="content.type == 'text'" v-html="content.content" ></div>

          <!--codeblock-->
          <div class="mt-2 mb-2" v-if="content.type == 'code'">
            <v-card class="pa-2" color="#1a1b26">
              <pre style="white-space: pre-wrap"><code v-html="content.content"></code></pre>
            </v-card>
          </div>
        </div>
        <v-divider style="margin: 2em 0 2em 0;" />
        <v-card-actions class="justify-center">
          <v-btn class="btn" variant="outlined" @click="$router.go(-1)">
            <span class="caption">back</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'
import sanitizeHtml from 'sanitize-html'
import hljs from 'highlight.js';
import "highlight.js/styles/tokyo-night-dark.css";

sanitizeHtml.defaults.allowedTags.push('img')
sanitizeHtml.defaults.allowedAttributes.img.push('style')

const route = useRoute()
const post = ref({
  title: '',
  path: '',
  html_text: '',
  published_at: '',
  contents: []
})

function sanitizeCode(html: string) {
  return sanitizeHtml(html);
}

function highLightCode(html: string) {
  return hljs.highlightAuto(html).value;
}

function splitByTags(html: string) {
  const splittedTags = html.split(/(<pre><code.*?>|<\/code><\/pre>)/)
  let elements = new Array()
  let isNextCode = false;
  splittedTags.forEach(t => {
    if(t.match(/<pre><code.*?>/)) {
      isNextCode = true
    } else if (t.match('</code.*?></pre>')) {
      isNextCode = false
    } else if (isNextCode) {
      elements.push({type: 'code', content: highLightCode(sanitizeCode(t))})
    } else if (!isNextCode) {
      elements.push({type: 'text', content: sanitizeCode(t)})
    }
  })
  return elements
}

onMounted(async () => {
  try {
    const url = `https://sumeshi.github.io/api/posts/${route.params.categoryName}/${route.params.postId}/index.html`
    const response = await axios.get(url)
    post.value = response.data
    post.value.contents = splitByTags(post.value.html_text)
  } catch (error) {
    console.error('Failed to fetch posts data: ', error)
  }
})

useHead({
  title: post.value.title
})
</script>

<style lang="scss">
ul {
  list-style-position: outside;

  li {
    margin-left: 1em;
  }
}

ol {
  margin-top: 0.5em;
  list-style-position: outside;

  li {
    margin-left: 1.5em;
  }
}

table, td, th {
  margin: 1em auto;
  border: 1px #555 solid;
  border-collapse: collapse;
}

td, th {
  padding: 5px 5px 5px 5px;
}

.main {
  max-width: 1200px;
}

.btn {
  width: 120px;
}
</style>
