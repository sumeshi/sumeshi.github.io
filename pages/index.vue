<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <CardUserOverview 
        name="S.Nakano"
        position="DFIR Researcher / Software Developer"
        :icon="{src: 'glitchme.jpg', link: '/about'}"
        :button="{message: 'see more', link: '/about'}"
        :links="[{name: 'twitter', url: 'https://twitter.com/sum3sh1', message: '@sum3sh1'}]"
      />
      <CardPostLatests
        :postindices="posts"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    axios.get('https://sumeshi.github.io/api/posts/')
      .then((res) => {
        this.posts = res.data
      });
  }
});
</script>


<style lang="scss" scoped>
.main {
  max-width: 900px;
}
</style>
