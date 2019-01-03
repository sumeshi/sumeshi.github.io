<template lang="pug">
v-layout.text-xs-center.mt-5(row wrap)
  v-flex(xs12)
    v-btn.btn(v-for="[key, value] in Array.from(links)" :key="key" outline :href="value") 
      span.body-1 {{ key }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
})
export default class HelloWorld extends Vue {
  private links = new Map([
    ['Github', 'https://github.com/sumeshi/'],
    ['Facebook', 'https://www.facebook.com/shinta.nakano.104'],
    ['Docker Hub', 'https://hub.docker.com/u/sumeshi'],
  ]);
}
</script>

<style lang="scss" scoped>
.btn {
  width: 150px;
}
</style>
