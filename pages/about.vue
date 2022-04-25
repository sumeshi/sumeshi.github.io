<template>
  <v-row justify="center" align="center">
    <v-col class="main">
      <v-card class="logo py-4 d-flex justify-center">
        <Icon src="glitchme.jpg" link="/" :size="240" />
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-text>
          <h2>S.Nakano</h2>
          <p class="caption">
            DFIR Researcher / Software Developer
          </p>
          <v-divider />
        </v-card-text>
      </v-card>
      <v-card class="logo pa-4 d-flex justify-center">
        <v-card-text>
          <p>I am a security engineer working in Japan.</p>

          <p>In my daily work, I do forensics and malware analysis.<br>
          I am interested in many things, not only security, but also new programming languages, design patterns, and technologies.</p>

          <p>If you have any questions or want to talk, please feel free to talk to me as I am mainly active on twitter.</p>
          <p>Thank you.</p>
        </v-card-text>
      </v-card>
      <v-card class="logo py-4 justify-center d-flex flex-wrap">
        <v-card-actions v-for="item of items" :key="item.name">
          <v-btn class="btn" :href="item.link" :color="item.color">
            <span class="caption">{{ item.name }}</span>
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
export default class About extends Vue {
  private items: Array<LinkButton> = [
    {
      name: 'GitHub',
      link: 'https://github.com/sumeshi',
      color: '#333333'
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/sum3sh1',
      color: '#1da1f2'
    },
    {
      name: 'Instagram',
      link: 'https://instagram.com/sumeshi_kun',
      color: '#e1306c'
    }
  ]

  private head() {
    return {
      title: 'About'
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  max-width: 900px;
}

.btn {
  width: 120px;
}

</style>
