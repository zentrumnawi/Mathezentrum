<template>
  <v-dialog>
    <v-btn slot="activator" color="success" @click="CHECK">
        Abschicken
    </v-btn>
    <v-card>
      <!-- <v-card-title class="center">
        <h2>Add a New Project</h2>
      </v-card-title> -->
      <v-card-text class="display-1">
          Sind deine Angaben korrekt ?
      </v-card-text>
      <v-layout justify-center>
          <v-flex xs4 pr-5>
            <v-btn class="success">Ja, alles richtig !</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn class="error">Moment mal...</v-btn>
          </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods:{
    CHECK () {
        this.$refs.overview.validate()
    }


  }
}
</script>
