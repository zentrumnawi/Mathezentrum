<template>
  <v-app>
    <v-content>
    <!-- <img alt="Vue logo" src="./assets/LogoGUF.png"> -->
    <!-- <DynamicTable_1 msg="Welcome to Your Vue.js App"/> -->
    <!-- <AttendeeForm msg="Welcome to Your Vue.js App"/> -->
    <!-- <AttendeeFormSolo msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
// import DynamicTable_1 from './components/DynamicTable_1.vue'
// import AttendeeForm from './components/AttendeeForm.vue'
// import AttendeeFormSolo from './components/AttendeeFormSolo.vue'
// import Field from './components/Field.vue'
import SignIn from './components/SignIn.vue'
export default {
  // name: 'app'
  name: 'app',
  components: {
    SignIn
    // DynamicTable_1
    // AttendeeForm
    // AttendeeFormSolo
  // }
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
  margin-top: 20px;
}
</style>