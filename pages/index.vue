<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-avatar size="240">
          <img
            src="/me.jpg"
            alt="Vuetify.js"
          ></img>
        </v-avatar>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-text>
          <h1>S.Nakano</h1>
          <p>DFIR Researcher / Software Developer</p>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-text>
          <p>社畜</p>
        </v-card-text>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-actions>
          <v-btn class="btn" href="https://github.com/sumeshi">
            GitHub
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

.btn {
  width: 120px;
}

</style>