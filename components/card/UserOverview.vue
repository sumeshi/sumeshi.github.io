<template>
  <v-card class="pa-4" justify="center">
    <v-row
      class="d-flex flex-column flex-sm-row"
      align="center"
      justify="center"
    >
      <v-col class="d-flex justify-center align-center mb-2 mb-sm-0" >
        <v-card class="elevation-0">
          <v-card-actions>
            <BaseIcon :src="icon.src" :link="icon.link" :size="120" />
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col class="d-flex flex-column align-center align-sm-start" >
        <v-card class="elevation-0">
          <v-card-text>
            <h3>{{ name }}</h3>
            <p class="mt-2 mb-4 text-caption">{{ position }}</p>
            <v-col class="d-flex justify-center align-center" v-for="(link, index) in links" :key="index">
              <BaseButtonExternal
                variant="outlined"
                class="text-caption"
                :message="`${link.name} | ${link.message}`"
                :link="link.url"
                :color="link.color"
              />
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import type { Icon } from '@/types/icon'
import type { Link } from '@/types/link'

interface Props {
  name: string
  position: string
  icon: Icon
  links: Array<Link>
}

const props = withDefaults(defineProps<Props>(), {
})

</script>

<style lang="scss" scoped>
</style>
