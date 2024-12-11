<template>
  <v-row align="center" justify="center" >
    <v-col class="main d-flex flex-column flex-sm-row" >
      <CardUserAbout />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
useHead({
  title: 'About',
})
</script>

<style lang="scss" scoped>
.main {
  max-width: 900px;
}
</style>