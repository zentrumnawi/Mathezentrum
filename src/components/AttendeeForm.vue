<template>
  <v-container overview>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
        <!-- <v-layout row wrap justify-space-around> -->
          <v-flex xs6>
              <img alt="Vue logo" src="@/assets/Mathezentrum.svg">
          </v-flex>
          <v-flex xs6>
              <img alt="Vue logo" src="@/assets/Physikzentrum.svg">
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around>
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
              @input="setSelectedCourses"
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
              @input="setSelectedfaculties"
              label="Studiengang"
              required
          ></v-select>
          </v-flex>
          <v-flex>
            <!-- <PopupValidation></PopupValidation> -->
            <v-btn color="success" @click="validate">
                Abschicken
            </v-btn>
          <v-dialog v-model="dialog" persistent max-width="600">
            <!-- <template v-slot:activator="{ on }"> -->
              <!-- <v-btn slot="activator" color="success" @click="validate" v-on="on">
                  Abschicken
              </v-btn> -->
            <!-- </template> -->
            <v-card>
              <!-- <v-card-title class="center">
                <h2>Add a New Project</h2>
              </v-card-title> -->
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
// import PopupValidation from './PopupValidation'
export default {
  el: 'overview',
  // components: { PopupValidation },
  data: function() {
    return {
      dialog: false,
      valid: false,
      disabled: 0,
      IDRules: [
        v => !!v || 'Bitte geben Sie Ihren persönlichen ID an',
        v => v.length == 9 || 'Ihre ID muss 9 Zeichen lang sein'
      ],
      timeRules: [
        v => !!v || 'Bitte geben Sie Ihre Startzeit an',
      ],
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
  computed: {
      ID: {
        get() {
          return this.$store.state.ID;
        },
        set(value) {
          this.$store.commit('UPDATEID', value)
        }
      },
      starttime: {
        get() {
          return this.$store.state.starttime;
        },
        set(value) {
          this.$store.commit('UPDATEstarttime', value)
        }
      },
      endtime: {
        get() {
          return this.$store.state.endtime;
        },
        set(value) {
          this.$store.commit('UPDATEendtime', value)
        }
      },
      courses: {
        get() {
          return this.$store.state.courses;
        }
      },
      course_select: {
        set(value) {
          this.$store.commit('UPDATEcourses', value)
        }
      },
      semester: {
        get() {
          return this.$store.state.semester;
        },
        set(value) {
          this.$store.commit('UPDATEsemester', value)
        }
      },
      faculties: {
        get() {
          return this.$store.state.faculties
        }
      },
      faculty_select: {
        set(value) {
          this.$store.commit('UPDATEfaculty', value)
        }
      }
  },
  methods: {
    setSelectedCourses(value) {
      this.$store.commit('UPDATEcourses', value)
    },
    setSelectedFaculties(value) {
      this.$store.commit('UPDATEfaculty', value)
    },
    validate () {
      if (this.$refs.form.validate()){
        if (this.valid == true) {
                // this.$store.commit('VALIDATE')
                // this.$refs.form.reset()
                this.dialog = true
        }
      }
    },
      submit () {
        this.$store.commit('SUBMIT')
        // this.$refs.form.reset()
        this.dialog = false
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