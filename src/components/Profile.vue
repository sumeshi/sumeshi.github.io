<template lang='pug'>
  article.container-fluid
    div.profile
      img.rounded-circle(src="../assets/icon.png" width='30%')
      h1 {{ msg }}
</template>

<script lang='coffee' src='./Profile.coffee'></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
h1, h2 {
  font-weight: normal;
}
</style>
