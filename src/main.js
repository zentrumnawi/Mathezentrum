import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import { store } from './store/store'

import App from './App.vue'
import Admin from '@/components/Admin'
import Form from '@/components/AttendeeForm'

Vue.use(Vuetify, {
  breakpoints: {
    xs: 100
  }
});
Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
      {
          path: '/admin',
          name: 'Admin',
          component: Admin
      },
      {
          path: '/',
          name: 'Form',
          component: Form
      }
  ];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store: store,
  beforeCreate() {
    this.$store.commit('initialiseStore')
  },
  router: router,
  render: h => h(App),
});
