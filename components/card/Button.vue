<template>
  <v-card class="mt-5 pa-4" justify="center">
        <v-card class="elevation-0">
          <v-card-text>
            <h3 class="mb-4">{{title}}</h3>
            <div class="position" v-for="line of text" :key="line.id">
              <p class="lines">{{ line }}</p>
            </div>
          </v-card-text>
          <v-card-actions class="text-center d-flex flex-wrap justify-center">
            <div class="pa-4" v-for="(link, index) of links" :key="index">
              <BaseButtonExternal variant="outlined" class="text-caption" :message="`${link.name} | ${link.message}`" :link="link.url" :color="link.color" />
            </div>
          </v-card-actions>
        </v-card>
  </v-card>
</template>

<script lang="ts" setup>
import type { Link } from '@/types/link'

interface Props {
  title: string
  text: Array<string>
  links: Array<Link>
}
const props = withDefaults(defineProps<Props>(), {
})
</script>

<style lang="scss" scoped>
.lines {
  margin: 0;
  line-height: 1.5rem !important
}
</style>
