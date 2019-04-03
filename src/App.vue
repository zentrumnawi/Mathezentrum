<template>
  <v-app>
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