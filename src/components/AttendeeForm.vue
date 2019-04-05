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
  computed: {
      valid: {
        get() {
          return this.$store.state.valid
        }
      },
      ID: {
        get() {
          return this.$store.state.ID;
        },
        set(value) {
          this.$store.commit('UPDATEID', value)
        }
      },
      IDRules: {
        get() {
          return this.$store.state.IDRules;
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
      timeRules: {
        get() {
          return this.$store.state.timerules;
        }
      },
      courseRules: {
        get() {
          return this.$store.state.courseRules;
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
      semesterRules: {
        get() {
          return this.$store.state.semesterRules;
        }
      },
      facultyRules: {
        get() {
          return this.$store.state.facultyRules;
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
    validate: function(){
        if (this.$ref.form.validate()){
              this.snackbar = true
          }
        this.$store.commit('VALIDATE')
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