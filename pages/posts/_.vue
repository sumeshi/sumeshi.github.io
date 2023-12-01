<template>
  <v-row justify="center" align="center">
    <v-col class="article" cols="12" sm="12" md="12">
      <div>
        <v-card class="logo pr-8 pl-8 justify-center flex-wrap">
          <v-row>
            <v-col>
              <v-card-title class="overline">
                {{ $route.params.pathMatch }}
              </v-card-title>
            </v-col>
            <v-col>
              <v-card-text class="text-right">
                <span class="grey--text text--darken-2">
                  {{ post.published_at.replace('T', ' ') }}
                </span>
                <ButtonIcon 
                  class="ml-2 mb-1"
                  iconName="mdi-github"
                  :link="'https://github.com/sumeshi/api/blob/master/' + $route.params.pathMatch + '.md'"
                  color="white"
                />
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider style="margin-bottom: 2em;" />
          <!--div class="html-wrapper" v-html="$sanitize(post.html_text)" /
          <div v-for="content of contents" :key="content.id">
            <div class="html-wrapper" v-if="content.type == 'text'" v-html="$sanitize(content.content)" ></div>
            <div v-if="content.type == 'code'">
              <pre><code v-highlight v-html="$sanitize(content.content)"></code></pre>
            </div>
          </div>
          -->
          <v-divider style="margin: 2em 0 2em 0;" />
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
import { onMounted, ref } from 'vue'
import type { PostContent, Contents } from '@/types/post'
import axios from 'axios'
import sanitizeHTML from 'sanitize-html'

sanitizeHTML.defaults.allowedTags.push('img')
sanitizeHTML.defaults.allowedAttributes.img.push('style')
Vue.prototype.$sanitize = sanitizeHTML

// const post: PostContent = {
//   title: '',
//   path: '',
//   html_text: '',
//   published_at: '',
// };

const contents: Contents[] = [
  {type: 'text', content: ''}
]

splitByTags((html: string) => {
  const splittedTags = html.split(/(<pre><code.*?>|<\/code><\/pre>)/)
  let elements = new Array()
  let isNextCode = false;
  splittedTags.forEach(t => {
    if(t.match(/<pre><code.*?>/)) {
      isNextCode = true
    } else if (t.match('</code.*?></pre>')) {
      isNextCode = false
    } else if (isNextCode) {
      elements.push({type: 'code', content: t})
    } else if (!isNextCode) {
      elements.push({type: 'text', content: t})
    }
  })
  return elements
});

const post = ref()
onMounted(async () => {
  try {
    const url = `https://sumeshi.github.io/api/posts/${this.$route.params.pathMatch}/index.html`;
    const response = await axios.get(url)
    post.value = response.data
    post.contents = this.splitByTags(this.post.html_text)
  } catch (error) {
    console.error('Failed to fetch posts data: ', error)
  }
})

useHead({
  title: this.post.title,
})

</script>

<style lang="scss">
.article {
  max-width: 1280px;
}

.btn {
  width: 120px;
}
</style>
