<template lang='pug'>
  article.container-fluid
    div.row
      div.col-md-12
        img.rounded-circle.profile-img(src="../assets/icon.png" width='25%')
    div.row.profile-text
      div.col-md-12
        h1 {{ name }}
        h6 {{ position }}
    hr
    div.profile-msg.text-left
      div.col-md-12
        p {{ msg }}
</template>

<script lang='coffee' src='./Profile.coffee'></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
h1, h2 {
  font-weight: normal;
}
.profile-img {
  min-width: 250px;
}
.profile-text {
  padding: 30px 0 30px 0;
}
.profile-msg {
  padding: 0 20% 0 20%;
}
</style>
