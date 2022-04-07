<template>
  <v-card class="pa-4" justify="center">
    <v-row>
      <v-col>
        <v-card class="elevation-0">
          <v-card-text>
          <h3>{{name}}</h3>
          <p class="position mt-2 overline grey--text text--darken-2">
            {{position}}
          </p>
          <div v-for="link of links" :key="link.key">
            <p>{{link.name}}: <a :href="link.url">{{link.message}}</a></p>
          </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-none d-sm-flex justify-center align-center">
        <v-card class="elevation-0">
          <v-card-actions>
            <Icon :src="icon.src" :link="icon.link" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="elevation-0">
      <v-card-actions class="d-flex d-sm-none justify-center">
        <Button :message="button.message" :link="button.link" />
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    icon: {
      type: Object,
      required: true,
    },
    button: {
      type: Object,
      required: true,
    },
    links: {
      type: Array,
      required: false,
      default: []
    }
  },
  setup() {
  },
})
</script>

<style lang="scss" scoped>
.position {
  line-height: 1rem !important;
}
</style>
