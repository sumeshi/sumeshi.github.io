<template>
  <v-card class="pa-4" justify="center">
    <v-row
      class="d-flex flex-column flex-sm-row"
      align="center"
      justify="center"
    >
      <CardUserAbout />
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
useHead({
  title: 'About',
})
</script>