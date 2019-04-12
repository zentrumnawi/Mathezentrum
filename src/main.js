import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import App from './App.vue'
// import Router from './components/Router' // Link to Routing setup
import { store } from './components/store/store'

Vue.use(Vuetify, {
  breakpoints: {
    xs: 100
  }
})
Vue.config.productionTip = false

new Vue({
  store: store,
  el: '#app',

  beforeCreate() {
    this.$store.commit('initialiseStore')
  },
  // router: Router,
  render: h => h(App)
})