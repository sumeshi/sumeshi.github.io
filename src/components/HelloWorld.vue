<template lang="pug">
v-layout.text-center.justify-center(row wrap)
  div.avatar(d-flex flex-column)
    v-avatar(size="200")
      img.elevation-2(:src="avatarImage")
    p.title.pt-5 {{ name }}
    p.overline.grey--text {{ caption }}
    hr.ma-5
    article(v-for="line in comments").mb-10
      p.body-2 {{ line }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
})
export default class HelloWorld extends Vue {
  private avatarImage: File = require('../assets/images/ore3.jpg');
  private name: string = 'Shinta Nakano';
  private caption: string = 'Engineer';
  private comments: string[] = [
    '大学院生',
    '渋谷ではたらく パソコンおたく',
  ];
}
</script>

<style lang="sass">
.avatar
  padding-top: 50px
</style>