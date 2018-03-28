<template lang='pug'>
  article.container-fluid.bg-inverse
    div.row.link-buttons
      div.col-sm.card.link-cards(v-for="button in buttons")
          div.card-body.p-4
            h4.card-title {{ button["name"] }}
            hr
            p.card-text {{ button["msg"] }}
            a.card-link.float-right(:href="button['link']") Link
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
  min-width: 100px;
}
</style>
