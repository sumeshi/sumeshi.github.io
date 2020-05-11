<template lang="pug">
v-app-bar(app dark dense)
    v-layout.justify-center
        v-toolbar-title.font-weight-light
            span sumeshi.github.io
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
})
export default class Toolbar extends Vue {
}
</script>