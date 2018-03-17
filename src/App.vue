<template lang='pug'>
  div#app
    img(src="./assets/icon.jpg" width='30%')
    router-view
</template>

<script lang='coffee' src='./App.coffee'></script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
