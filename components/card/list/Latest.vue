<template>
  <v-card class="mt-5 pa-4 justify-center">
    <v-card-title class="pb-2 font-weight-black">{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-actions class="pr-5 pl-5">
      <v-list class="w-100">
        <v-list-item
          v-for="(postIndex, i) in postIndices"
          :key="i"
          :to="postIndex.path"
          router
          exact
        >
          <v-list-item-action>
            <div class="pb-2">
              <span class="text-caption">{{ postIndex.published_at.replace('T', ' ') }}</span>
              <h3>{{postIndex.heading ? postIndex.heading : postIndex.title}}</h3>
              <p class="text-body-2">{{postIndex.description}}</p>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { PostIndex } from '@/types/post'

interface Props {
  title: string
  postIndices: Array<PostIndex>
}
const props = withDefaults(defineProps<Props>(), {
})
</script>

<style lang="scss" scoped>
</style>>