import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import App from './App.vue'
import Router from './components/Router' // Link to Routing setup

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
// .$mount('#app')
