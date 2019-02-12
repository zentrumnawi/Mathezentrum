<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/LogoGUF.png">
    <DynamicTable_1 msg="Welcome to Your Vue.js App"/>
    <!-- <Field/> -->
  </div>
</template>

<script>
import DynamicTable_1 from './components/DynamicTable_1.vue'
// import Field from './components/Field.vue'

export default {
  name: 'app',
  components: {
    DynamicTable_1
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
