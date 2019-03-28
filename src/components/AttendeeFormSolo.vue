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
          <v-flex xs6>
            <v-text-field
              v-model="ID"
              :rules="IDRules"
              label="ID"
              placeholder="XX999999"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-model="starttime"
              :rules="timeRules"
              type="time"
              hint= "HH:MM"
              label="Startzeit"
              prepend-icon="access_time"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-model="endtime"
              :rules="timeRules"
              type="time"
              hint= "HH:MM"
              label="Endzeit"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-select
              attach
              v-model="course_select"
              :items="courses"
              :menu-props="{ maxHeight: '400' }"
              :rules="courseRules"
              multiple
              persistent-hint
              label="Lehrveranstaltung"
              required
          ></v-select>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-model="semester"
              :rules="semesterRules"
              label="Fachsemester"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-select
              attach
              v-model="faculty_select"
              :items="faculties"
              :rules="facultyRules"
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
      ID: '',
      IDRules: [
        v => !!v || 'Bitte geben Sie Ihren persönlichen ID an',
        v => v.length > 8 || 'Ihr ID muss mindestens 8 Zeichen lang sein'
      ],
      starttime: '',
      endtime: '',
      timeRules: [
        v => !!v || 'Bitte geben Sie Ihre Startzeit an',
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
      facultyRules: [
        v => !!v || 'Bitte geben Sie Ihren Studiengang an'       
      ],
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
      if (this.valid == true) {
        this.$refs.form.reset()
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