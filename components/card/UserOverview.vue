<template>
  <v-card class="pa-4" justify="center">
    <v-row>
      <!--namecard-->
      <v-col>
        <v-card class="elevation-0">
          <v-card-text>
            <h3>{{ name }}</h3>
            <p class="position mt-2 text-caption grey-lighten-2"> {{ position }} </p>
            <div v-for="(link, index) of links" :key="index" class="mt-4">
              <BaseButtonExternal variant="outlined" class="text-caption" :message="`${link.name} | ${link.message}`" :link="link.url" :color="link.color"/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!--for pc display-->
      <v-col class="d-none d-sm-flex justify-center align-center">
        <v-card class="elevation-0">
          <v-card-actions>
            <BaseIcon :src="icon.src" :link="icon.link" :size=120 />
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
