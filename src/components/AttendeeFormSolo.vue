<template>
  <v-container overview>
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
          <v-flex xs12>
            <v-text-field
              v-model="code"
              :rules="codeRules"
              label="Code"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 pr-5>
            <v-text-field
              v-model="starttime"
              :rules="timeRules"
              label="Startzeit"
              required
            ></v-text-field>
          </v-flex>
          <v-flex grow pl-5>
            <v-select
              v-model="course_select"
              :items="courses"
              :menu-props="{ maxHeight: '400' }"
              :rules="courseRules"
              multiple
              hint="Pick your favorite states"
              persistent-hint
              label="Lehrveranstaltung"
              required
          ></v-select>
          </v-flex>
          <v-flex xs4 pr-5>
            <v-text-field
              v-model="semester"
              :rules="semesterRules"
              label="Fachsemester"
              required
            ></v-text-field>
          </v-flex>
          <v-flex grow pl-5>
            <v-select
              v-model="faculty_select"
              :items="faculties"
              :rules="[v => !!v || 'Bitte wähle einen Studiengang aus !']"
              label="Studiengang"
              required
          ></v-select>
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
  el: '.overview',
  data: function() {
return {
      valid: true,
      code: '',
      codeRules: [
        v => !!v || 'Bitte geben Sie Ihren persönlichen Code an',
        v => v.length > 5 || 'Ihr Code muss mindestens 6 Zeichen lang sein'
      ],
      course_select: null,
      courseRules: [
        v => !!v || 'Bitte wählen Sie mindestens eine Lehrveranstaltung aus'       
      ],
      courses: [
        'Mathe für Physiker 1',
        'Mathe für Physiker 2',
        'Mathe für Physiker 3',
        'Sonstige'
      ],
      semester:'',
      semesterRules: [
        v => !!v || 'Bitte geben Sie Ihr aktuelles Fachsemester an',
        v => (v.length <=2) || 'Falsche Eingabe'
      ],
      faculty_select: null,
      faculties: [
        'BSc Physik',
        'BSc Meteorologie',
        'BSc Biologie',
        'BSc Pharmazie',
        'Sonstige'
      ]  }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>