<template>
  <v-btn
    class="btn"
    :href="link"
    :color="color"
    target="_blank"
    rel="noopener noreferrer"
    raised
  >
    {{ message }}
  </v-btn>
</template>

<script lang="ts" setup>
interface Props {
  message: string
  link: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black'
})

</script>

<style lang="scss">
.btn {
  width: 180px;
}
</style>
