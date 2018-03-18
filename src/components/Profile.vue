<template lang='pug'>
  article.container-fluid
    div.btn.btn-info hoge
    div.profile
      img.rounded(src="../assets/icon.jpg" width='30%')
      h1 {{ msg }}
</template>

<script lang='coffee' src='./Profile.coffee'></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
h1, h2 {
  font-weight: normal;
}
</style>
