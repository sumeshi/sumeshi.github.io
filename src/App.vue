<template lang="pug">
  v-app
    header
      toolbar
    v-content.align-center
      hello-world
      links-card
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import LinksCard from '@/components/LinksCard.vue';

@Component({
  components: {
    Toolbar,
    HelloWorld,
    LinksCard,
  },
})
export default class App extends Vue {
}
</script>
