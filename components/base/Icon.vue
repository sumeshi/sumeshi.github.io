<template>
  <router-link :to="link">
    <v-hover v-slot="{ hover }">
      <v-avatar :size="size" :elevation="hover ? 12 : 2" :class="{'on-hover': hover}">
        <img :src="src">
      </v-avatar>
    </v-hover>
  </router-link>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  link: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
})
</script>

<style lang="sass">
.v-avatar
  opacity: 0.6
  transition: opacity .2s ease-in-out

.v-avatar:not(.on-hover)
  opacity: 1.0
</style>
