<template>
  <v-app>
    <v-toolbar app dark color="#005ea8">
      <v-toolbar-title class="headline text-uppercase">
        Anwesenheitsformular
      </v-toolbar-title>
<<<<<<< HEAD
      <v-spacer></v-spacer>
      <v-img aspect-ratio="1.5" contain max-height="100px" max-width="80px" :src="require('@/assets/Goethe-Kopf-weiss.svg')">
      </v-img>
=======
>>>>>>> 199ccd94b72d36537db111b60346627622b88fda
    </v-toolbar>
    <v-content>
    <router-view></router-view>
    </v-content>
    <v-footer app dark color="#005ea8">
      <!-- <img width=10% class="thumbnail float-center" :src="require('@/assets/LogoGUF.png')"> -->
      <v-card-actions class="justify-left">
<<<<<<< HEAD
        &copy; 2019&nbsp;&nbsp;|&nbsp;&nbsp;<img height=20px :src="require('@/assets/Icon_ZentrumNaturwissenschaften.svg')">&nbsp;&nbsp;<strong>Zentrum Naturwissenschaften</strong>
      </v-card-actions>    </v-footer>
=======
        &copy; 2019 — <strong>Starker Start</strong>
      </v-card-actions>
      <v-spacer></v-spacer>
      <v-img aspect-ratio="1.5" contain max-height="100px" max-width="100px" :src="require('@/assets/Mathezentrum.svg')">
        </v-img>
      <v-img aspect-ratio="1.5" contain max-height="100px" max-width="100px" :src="require('@/assets/Physikzentrum.svg')">
        </v-img>
        <v-spacer></v-spacer>
      <v-img aspect-ratio="3.8" contain max-height="80px" max-width="100px" :src="require('@/assets/GU-Logo-weiss.png')">
        </v-img>
      </v-footer>
>>>>>>> 199ccd94b72d36537db111b60346627622b88fda
  </v-app>
</template>

<script>

// import Form from './components/AttendeeForm.vue'
// import Admin from '@/components/Admin'

export default {
  name: 'app',
  components: {
    // Form,
    // Admin
  }
}
</script>

<style>
#app, .toolbar {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b87e2;

  /* height: 768px;
  width: 1024px */
  
}
</style>