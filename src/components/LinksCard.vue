<template lang="pug">
v-container.mt-5.mb-5(fluid)
  v-flex
    v-layout.justify-center(wrap)
      v-btn.btn.mt-3.mr-2.ml-2(v-for="(link, index) in links" :key="index" outlined :href="link.url" :color="link.color") 
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
      name: 'Facebook',
      url: 'https://www.facebook.com/shinta.nakano.104',
      color: 'blue darken-4',
    },
    {
      name: 'note',
      url: 'https://note.mu/sumeshi_kun',
      color: 'green',
    },
    {
      name: 'Qiita',
      url: 'https://qiita.com/sumeshi',
      color: 'green lighten-2',
    },
  );
}
</script>

<style lang="scss" scoped>
.btn {
  width: 150px;
}
</style>
