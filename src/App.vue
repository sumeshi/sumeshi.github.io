<template lang='pug'>
  div#app
    header
      nav.navbar.navbar-inverse.bg-inverse.text-white
        div.navbar-brand sumeshi.github.io
    router-view(name='Profile')
    router-view(name='Links')
    footer
      h6.bg-inverse.text-white ©2018 S.Nakano All Rights Reserved.
</template>

<script lang='coffee' src='./App.coffee'></script>

<style lang='scss'>
footer > h6 {
  padding-bottom: 5px;
  margin-bottom: 0;
}
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
