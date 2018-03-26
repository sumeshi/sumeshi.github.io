<template lang='pug'>
  article.container-fluid.bg-inverse
    div.row.link-buttons
      div.col.card.link-cards(v-for="(link, button) in buttons")
          div.card-body.p-4
            h4.card-title {{ button }}
            hr
            p.card-text uoaaaa
            a.card-link.float-right(:href="link") Link
</template>

<script lang='coffee' src='./Links.coffee'></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
article {
  height: 100vh;
}
.link-buttons {
  padding-top: 5em;
}
.link-cards {
  margin: 1em 1em 1em 1em;
}
</style>
