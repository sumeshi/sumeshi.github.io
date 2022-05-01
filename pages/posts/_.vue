<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <div>
        <v-card class="logo pr-8 pl-8 justify-center flex-wrap ma-2">
          <v-row>
            <v-col>
              <v-card-title>
                {{ $route.params.pathMatch }}
              </v-card-title>
            </v-col>
            <v-col>
              <v-card-text class="text-right">
                <span class="grey--text text--darken-2">
                  {{ post.published_at.replace('T', ' ') }}
                </span>
                <ButtonIcon 
                  class="ml-2"
                  iconName="mdi-github"
                  :link="'https://github.com/sumeshi/api/blob/master/' + $route.params.pathMatch + '.md'"
                  color="white"
                />
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider style="margin-bottom: 2em;" />
          <!--div class="html-wrapper" v-html="$sanitize(post.html_text)" /-->
          <div v-for="content of contents" :key="content.id">
            <div class="html-wrapper" v-if="content.type == 'text'" v-html="$sanitize(content.content)" ></div>
            <div v-if="content.type == 'code'">
              <pre><code v-highlight v-html="$sanitize(content.content)"></code></pre>
            </div>
          </div>
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
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

import axios from 'axios'
import sanitizeHTML from 'sanitize-html'

interface PostContent {
  title: string
  path: string
  html_text: string
  published_at: string
}

interface Contents {
  type: string
  content: string
}

sanitizeHTML.defaults.allowedTags.push('img')
sanitizeHTML.defaults.allowedAttributes.img.push('style')
Vue.prototype.$sanitize = sanitizeHTML

@Component({
})
export default class Post extends Vue {
  private post: PostContent = {
    title: '',
    path: '',
    html_text: '',
    published_at: '',
  };

  private contents: Contents[] = [
    {type: 'text', content: ''}
  ]

  private head() {
    return {
      title: this.post.title
    }
  }

  private splitByTags(html: string) {
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
  }

  private mounted() {
    axios.get(`https://sumeshi.github.io/api/posts/${this.$route.params.pathMatch}/index.html`).then(
      (res) => {
        this.post = res.data
        this.contents = this.splitByTags(this.post.html_text)
      }
    )
  }
}
</script>

<style lang="scss">

.btn {
  width: 120px;
}

</style>
