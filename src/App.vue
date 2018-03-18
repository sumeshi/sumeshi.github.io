<template lang='pug'>
  div#app
    nav.navbar.navbar-inverse.bg-inverse
      div.navbar-brand sumeshi.github.io
    router-view
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
  color: white;
  margin-bottom: 2em;
}
</style>
