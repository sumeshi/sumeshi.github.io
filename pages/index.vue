<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-avatar size="240">
          <img
            src="/me.jpg"
            alt="Vuetify.js"
          ></img>
        </v-avatar>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-text>
          <h1>S.Nakano</h1>
          <p>DFIR Researcher / Software Developer</p>
          <v-divider />
        </v-card-text>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-text>
          <p>社畜</p>
        </v-card-text>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-actions v-for="item of items" :key="item.name">
          <v-btn class="btn" :href="item.link">
            {{ item.name }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

interface LinkButton {
  name: string,
  link: string,
  color: string,
}

@Component({
})
export default class Home extends Vue {
  private items: Array<LinkButton> = [
    {
      name: 'GitHub',
      link: 'https://github.com/sumeshi',
      color: 'black'
    }
  ]
}
</script>

<style lang="scss" scoped>

.btn {
  width: 120px;
}

</style>
