<template>
  <v-btn class="btn" :to="link" :color="color" raised>{{message}}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    message: {
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
.btn {
  width: 120px;
}
</style>
