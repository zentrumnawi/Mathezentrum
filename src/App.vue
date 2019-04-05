<template>
  <v-app>
    <v-toolbar app dark color="#005ea8">
      <v-toolbar-title class="headline text-uppercase">
        <span> Mathe- und Physikzentrum</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
    <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import SignIn from './components/SignIn.vue'
export default {
  name: 'app',
  components: {
    SignIn
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b87e2;
}
</style>