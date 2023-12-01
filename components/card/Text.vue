<template>
  <v-card class="mt-5 pa-4" justify="center">
        <v-card class="elevation-0">
          <v-card-text>
            <h3 class="mb-4">{{title}}</h3>
            <div class="position" v-for="line of text" :key="line.id">
              <p class="lines">{{ line }}</p>
            </div>
          </v-card-text>
        </v-card>
  </v-card>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  text: Array<string>
}
const props = withDefaults(defineProps<Props>(), {
})
</script>

<style lang="scss" scoped>
.lines {
  margin: 0;
  line-height: 1.5rem !important
}
</style>
