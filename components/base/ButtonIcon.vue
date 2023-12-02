<template>
  <v-btn icon small :href="link" :color="color" target="_blank" rel="noopener noreferrer" raised>
    <v-icon>{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts" setup>
interface Props {
  iconName: string
  link: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {
})

</script>


<style lang="scss">
</style>
