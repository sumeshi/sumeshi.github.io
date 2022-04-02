<template>
  <router-link :to="link">
    <v-hover v-slot="{hover}">
      <v-avatar :size="size" :elevation="hover ? 12 : 2" :class="{'on-hover': hover}">
        <img :src="src">
      </v-avatar>
    </v-hover>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 120
    }
  },

  setup() {
  },
})
</script>


<style lang="sass">
.v-avatar
  opacity: 0.6
  transition: opacity .2s ease-in-out

.v-avatar:not(.on-hover)
  opacity: 1.0

</style>
