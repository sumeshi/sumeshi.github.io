<template lang="pug">
v-toolbar(app dark dense)
    v-layout.justify-center
        v-toolbar-title.subheading
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