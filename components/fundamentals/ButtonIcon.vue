<template>
  <v-btn icon :href="link" :color="color" raised>
    <v-icon>{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: ""
    }
  },

  setup() {
  },
})
</script>


<style lang="scss">
</style>
