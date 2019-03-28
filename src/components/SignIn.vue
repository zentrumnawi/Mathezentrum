<template>
  <v-container signin>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
              <img alt="Vue logo" src="@/assets/Mathezentrum.svg">
          </v-flex>
          <v-flex xs6>
              <img alt="Vue logo" src="@/assets/Physikzentrum.svg">
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="ID"
              :rules="IDRules"
              label="ID"
              placeholder="XX999999"
              hint="Ersten 2 Buchstaben des Vornamens Ihrer Mutter. 
                    2 Ziffern des Geburtstags Ihrer Mutter. 
                    2 Ziffern des eigenen Geburtsmonats. 
                    2 Ziffern der Nummer des eigenen Fachbereichs."
              required
            ></v-text-field>
          </v-flex>
          <v-btn
            color="success"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  el: 'SignIn',
  data: function() {
return {
      valid: true,
      ID: '',
      IDRules: [
        v => !!v || 'Bitte geben Sie Ihren persönlichen ID an',
        v => v.length > 8 || 'Ihr ID muss mindestens 8 Zeichen lang sein'
      ] }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      if (this.valid == true) {
        this.$refs.form.reset(),
        this.$router.push('/attendeeform')
      } 
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field{
  color:"#005ea8"
}
</style>