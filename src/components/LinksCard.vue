<template lang="pug">
v-container.mt-5.mb-5(fluid)
  v-flex
    v-layout.justify-center(wrap)
      v-btn.btn.mt-3.mr-2.ml-2(v-for="(link, index) in links" :key="index" outlined :href="link.url" :color="link.color" target="_blank") 
        span.body {{ link.name }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
})
export default class HelloWorld extends Vue {
  private links: Array<{name: string; url: string}> = Array(
    {
      name: 'Github',
      url: 'https://github.com/sumeshi/',
      color: 'black',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/sum3sh1',
      color: 'blue lighten-1',
    },
    {
      name: 'Qiita',
      url: 'https://qiita.com/sumeshi',
      color: 'green lighten-1',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/sumeshi_kun',
      color: 'pink',
    },
  );
}
</script>

<style lang="scss" scoped>
.btn {
  width: 150px;
}
</style>
