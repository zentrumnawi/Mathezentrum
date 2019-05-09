<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap justify-space-around>
          <v-flex xs6>
            <v-text-field
              v-model="form.id"
              :rules="IDRules"
              maxlength="9"
              label="ID"
              placeholder="XX999999"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-model="form.start"
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
              v-model="form.end"
              disabled
              :placeholder= "today"
              label="Endzeit"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-select
              attach
              v-model="form.courses"
              :items="courses"
              :rules="courseRules"
              multiple
              persistent-hint
              label="Lehrveranstaltung"
              required
          ></v-select>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-model="form.semester"
              :rules="semesterRules"
              label="Fachsemester"
              maxlength="2"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-select
              attach
              v-model="form.faculty"
              :items="faculties"
              :rules="facultyRules"
              label="Studiengang"
              required
          ></v-select>
          </v-flex>
          <v-flex>
            <v-btn color="success" @click="validate">
                Abschicken
            </v-btn>
          <v-dialog v-model="dialog" persistent max-width="600">
            <v-card>
              <v-card-text class="display-1">
                  Sind deine Angaben korrekt ?
              </v-card-text>
              <v-card-actions>
              <v-layout justify-center>
                  <v-flex xs4 pr-5>
                    <v-btn class="success" @click="submit">Ja, alles richtig !</v-btn>
                  </v-flex>
                  <v-flex xs4>
                    <v-btn class="error" @click="dialog = false">Moment mal...</v-btn>
                  </v-flex>
              </v-layout>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>

var today = new Date();
var hh = String(today.getTime());
var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

today = hh + '/' + dd;

function initializeForm() {
  return {
    id: "",
    start: "",
    end: "",
    date: new Date(),
    courses: "",
    semester: "",
    faculty: null
  }
}

export default {
  data: function() {
    return {
      form: initializeForm(),
      courses: [
        'Mathe für Physiker 1',
        'Mathe für Physiker 2',
        'Mathe für Physiker 3',
        'Sonstige'
      ],
      faculties: [
        'BSc Physik',
        'BSc Meteorologie',
        'BSc Biologie',
        'BSc Pharmazie',
        'Sonstige'
      ] ,
      dialog: false,
      valid: false,
      disabled: 0,
      IDRules: [
        v => !!v || 'Bitte geben Sie Ihre persönlichen 9 stellige ID an',
        v => v.length == 9 || 'Ihre ID muss 9 Zeichen lang sein'
      ],
      timeRules: [
        v => !!v || 'Bitte geben Sie Ihre Anwesenheitszeit an',
      ],
      today: today,
      courseRules: [
        v => !!v || 'Bitte wählen Sie mindestens eine Lehrveranstaltung aus'       
      ],
      semesterRules: [
        v => !!v || 'Bitte geben Sie Ihr aktuelles Fachsemester an',
        v => v.length <=2 || 'Falsche Eingabe'
      ],
      facultyRules: [
        v => !!v || 'Bitte geben Sie Ihren Studiengang an'       
      ],
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()){
        if (this.valid == true) {
          this.dialog = true
        }
      }
    },
    submit () {
      this.$store.dispatch('submitForm', this.form)
      this.$refs.form.reset()
      this.form = initializeForm()
      this.dialog = false
      this.valid = false
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