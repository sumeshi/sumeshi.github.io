<template lang="pug">
v-layout.text-xs-center.justify-center(row wrap)
  v-flex.mt-5(xs12)
      v-avatar(size="200")
        img(:src="avatarImage")
  v-flex.mt-5(xs12)
    p.title {{ name }}
    p.caption.grey--text {{ caption }}
  v-flex(xs4)
    hr
  v-flex.mt-5(xs12)
    article(v-for="line in comments")
      p.body-1 {{ line }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
})
export default class HelloWorld extends Vue {
  private avatarImage: string = require('../assets/images/ore.jpg');
  private name: string = 'Shinta Nakano';
  private caption: string = 'Developer';
  private comments: string[] = [
    '情報系の学生です。',
    'パソコンカチャカチャするのが好きです。',
  ];
}
</script>
