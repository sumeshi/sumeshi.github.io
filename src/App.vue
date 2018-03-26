<template lang='pug'>
  div#app
    nav.navbar.navbar-inverse.bg-inverse.text-white
      div.navbar-brand sumeshi.github.io
    router-view(name='Profile')
    router-view(name='Links')
</template>

<script lang='coffee' src='./App.coffee'></script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.navbar {
  width: 100%;
  position: fixed;
  z-index: 3;
}
</style>
