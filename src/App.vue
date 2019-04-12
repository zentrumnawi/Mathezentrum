<template>
  <v-app>
    <v-toolbar app dark color="#005ea8">
      <v-toolbar-title class="headline text-uppercase">
        <span> Anwesenheitsformular</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
    <AttendeeForm></AttendeeForm>
    <!-- <router-view></router-view> -->
    </v-content>
    <v-footer app dark color="#005ea8"></v-footer>
  </v-app>
</template>

<script>
// import SignIn from './components/SignIn.vue'
import AttendeeForm from './components/AttendeeForm.vue'

export default {
  name: 'app',
  components: {
    // SignIn
    AttendeeForm
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