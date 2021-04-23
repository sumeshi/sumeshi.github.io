<template lang="pug">
v-layout.text-center.justify-center(row wrap)
  div.avatar(d-flex flex-column)
    v-avatar(size="200")
      img.elevation-2(:src="avatarImage")
    p.title.pt-5 {{ name }}
    p.overline.grey--text {{ caption }}
    hr.ma-5
    article(v-for="line in comments").mb-3
      p.body-2 {{ line }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import axios from 'axios';
// import { Observable, from } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
})
export default class HelloWorld extends Vue {
  private avatarImage: string = 'https://avatars2.githubusercontent.com/u/35072092?v=4';
  private name: string = 'S.Nakano';
  private githubId: string = 'sumeshi';
  private twitterId: string = 'sum3sh1';
  private caption: string = 'DFIR Researcher / Software Developer';
  private comments: string[] = [
    '社畜',
  ];

  // private mounted() {
  //   from(axios.get('https://api.github.com/users/sumeshi'))
  //     .pipe(
  //       map((res) => res.data),
  //     )
  //     .subscribe((data) => {
  //       this.name = data.name;
  //       this.avatarImage = data.avatar_url;
  //     });
  // }
}
</script>

<style lang="sass">
.avatar
  padding-top: 50px
</style>