<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'hogemaru',
  },
})
</script>

<template>
  <p>index</p>
  <p>{{ text }}</p>
</template>
