<template>
  <v-card class="pa-4" justify="center">
    <v-row>
      <!--namecard-->
      <v-col>
        <v-card class="elevation-0">
          <v-card-text>
            <h3> {{ name }} </h3>
            <p class="mt-2 text-caption"> {{ position }} </p>
            <div class="mt-4" v-for="(link, index) of links" :key="index">
              <BaseButtonExternal variant="outlined" class="text-caption" :message="`${link.name} | ${link.message}`" :link="link.url" :color="link.color" />
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
