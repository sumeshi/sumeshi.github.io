<template>
  <v-card class="logo mt-5 pa-4 justify-center">
    <v-card-text>
      <h2>{{ title }}</h2>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-actions class="pr-5 pl-5">
      <v-list
        style="width: 100%;"
      >
        <v-list-item
          v-for="(postindex, i) in postindices"
          :key="i"
          :to="postindex.path"
          router
          exact
        >
          <v-list-item-action>
            <div>
              <span class="grey--text text--darken-2">
                {{ postindex.published_at.replace('T', ' ') }}
              </span>
              <h3>{{postindex.title}}</h3>
              <p>{{postindex.description}}</p>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    postindices: {
      type: Array,
      required: true
    }
  },
  setup() {
  },
})
</script>

<style lang="scss" scoped>
</style>>