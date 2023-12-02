<template>
  <v-hover v-slot="{ isHovering, props }" >
    <router-link to="posts">
      <v-avatar
        :size="size"
        :elevation="isHovering ? 16 : 2"
        :class="{ 'on-hover': isHovering }"
        class="mx-auto"
        v-bind="props"
      >
        <v-img :src="src" />
      </v-avatar>
    </router-link>
  </v-hover>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  link: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
})
</script>

<style lang="sass" scoped>
.v-avatar
  opacity: 0.6
  transition: opacity .2s ease-in-out

.v-avatar:not(.on-hover)
  opacity: 1.0
</style>
