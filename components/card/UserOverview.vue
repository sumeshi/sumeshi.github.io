<template>
  <v-card class="mt-5 pa-4" justify="center">
    <v-row>
      <v-col>
        <v-card class="elevation-0">
          <v-card-text>
          <h3>{{ name }}</h3>
          <p class="position mt-2 overline grey--text text--darken-2">
            {{ position }}
          </p>
          <div v-for="link of links" :key="link.key">
            <p>{{ link.name }}: <a :href="link.url">{{link.message}}</a></p>
          </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-none d-sm-flex justify-center align-center">
        <v-card class="elevation-0">
          <v-card-actions>
            <BaseIcon :src="icon.src" :link="icon.link" :size=120 />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="elevation-0">
      <v-card-actions class="d-flex d-sm-none justify-center">
        <BaseButton :message="button.message" :link="button.link" />
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string,
  position: string,
  icon: Object,
  button: Object,
  links: Array,
}>()
</script>

<style lang="scss" scoped>
.position {
  line-height: 1rem !important;
}
</style>
