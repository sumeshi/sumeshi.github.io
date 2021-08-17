<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-for="repo of repositories" :key="repo.name">
        <v-card class="logo py-4 justify-center flex-wrap ma-2">
          <v-card-title>
            {{ repo.name }}<span v-if="repo.isArchived" class="pa-2 caption grey--text">Archived</span>
            <v-spacer />
            <v-btn icon text disabled>
              <v-icon>mdi-star</v-icon>
              <span class="caption">{{ repo.stargazers }}</span>
            </v-btn>
          </v-card-title>
          <v-card-text>{{ repo.description }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="btn" :href="repo.link">
              <span class="caption">Open Repo</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

import axios from 'axios'

interface Repository {
  name: string,
  description: string,
  link: string,
  language: string,
  stargazers: number,
  isArchived: boolean,
}

@Component({
})
export default class Works extends Vue {
  private repositories: Array<Repository> = [
    {
      name: 'evtx2es',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    },
    {
      name: 'mft2es',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    },
    {
      name: 'reg2es',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    },
    {
      name: 'prefetch2es',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    },
    {
      name: 'pyprefetch-rs',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    },
    {
      name: 'ntfsfind',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    },
    {
      name: 'ntfsdump',
      description: '',
      link: '',
      language: '',
      stargazers: 0,
      isArchived: false
    }
  ]

  private mounted () {
    axios.get('https://api.github.com/users/sumeshi/repos').then(
      (res) => {
        const repositories = res.data.filter((repo: any) => {
          return this.repositories.map(v => v.name).includes(repo.name)
        })
        repositories.forEach((repo: any) => {
          const target = this.repositories.find(v => v.name === repo.name)
          if (target) {
            target.description = repo.description
            target.link = repo.html_url
            target.language = repo.language
            target.stargazers = repo.stargazers_count
            target.isArchived = repo.archived
          }
        })
      }
    )
  }
}
</script>

<style lang="scss" scoped>

.btn {
  width: 120px;
}

</style>
