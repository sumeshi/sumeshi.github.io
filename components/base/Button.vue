<template>
  <v-btn class="btn" :to="link" :color="color" raised>{{ message }}</v-btn>
</template>

<script lang="ts" setup>
interface Props {
  message: string
  link: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white'
})

</script>

<style lang="scss">
.btn {
  width: 120px;
}
</style>
