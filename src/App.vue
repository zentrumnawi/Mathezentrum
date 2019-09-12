<template>
  <v-app>
    <v-toolbar app dark color="primary darken-1">
      <v-toolbar-title class="headline text-uppercase">Anwesenheitsformular</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        aspect-ratio="1.5"
        contain
        max-height="100px"
        max-width="80px"
        :src="require('@/assets/Goethe-Kopf-weiss.svg')"
      ></v-img>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app dark color="primary darken-1">
      <v-layout text-left ml-4>
        <v-flex xs12>
          &copy; 2019&nbsp;&nbsp;|&nbsp;&nbsp;
          <router-link to="/admin">
            <img height="20px" :src="require('@/assets/Icon_ZentrumNaturwissenschaften.svg')" />
          </router-link>&nbsp;&nbsp;
          <strong>Zentrum Naturwissenschaften</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app"
};
</script>
