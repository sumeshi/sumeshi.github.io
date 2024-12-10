<template>
  <v-row>
    <v-col v-for="button in buttons" class="d-flex flex-row justify-space-evenly mt-6">
      <v-btn variant="tonal" class="text-caption" :to="button.link">{{ button.message }}</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Button } from '@/types/button'

interface Props {
  buttons: Array<Button>
}

const props = withDefaults(defineProps<Props>(), {
})

</script>