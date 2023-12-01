<template>
  <v-card class="mt-5 pa-4" justify="center">
    <v-row>
      <v-col>
        <v-card class="elevation-0">
          <v-card-text>
          <h3>{{ name }}</h3>
          <p class="position mt-2 overline grey--text text--darken-2">
            {{ position }}
          </p>
          <div v-for="(link, index) of links" :key="index">
            <p>{{ link.name }}: <a :href="link.url"> {{ link.message }} </a></p>
          </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="d-none d-sm-flex justify-center align-center">
        <v-card class="elevation-0">
          <v-card-actions>
            <BaseIcon :src="icon.src" :link="icon.link" :size=120 />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="elevation-0">
          <v-card-actions class="d-flex d-sm-none justify-center">
            <BaseButton :message="button.message" :link="button.link" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-card>
</template>

<script setup lang="ts">
import type { Button } from '@/types/button';
import type { Icon } from '@/types/icon'
import type { Link } from '@/types/link'

interface Props {
  name: string
  position: string
  icon: Icon
  button: Button
  links: Array<Link>
}

const props = withDefaults(defineProps<Props>(), {
})

</script>

<style lang="scss" scoped>
.position {
  line-height: 1rem !important;
}
</style>
