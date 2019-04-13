<template lang="pug">
v-layout.text-xs-center.mt-5(row wrap)
  v-flex(xs12)
    v-btn.btn(v-for="(link, index) in links" :key="index" outline :href="link.url" :color="link.color") 
      span.body-1 {{ link.name }}
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
      color: 'blue',
    },
    {
      name: 'DockerHub',
      url: 'https://hub.docker.com/u/sumeshi',
      color: 'green',
    },
  );
}
</script>

<style lang="scss" scoped>
.btn {
  width: 150px;
}
</style>
