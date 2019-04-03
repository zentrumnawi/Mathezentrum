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
  computed: {
      valid(){
          return this.$store.state.valid
      },
      ID(){
          return this.$store.state.ID;
      },
      IDRules(){
          return this.$store.state.IDRules;
      },
      starttime(){
          return this.$store.state.starttime;
      },
      endtime(){
          return this.$store.state.endtime;
      },
      timeRules(){
          return this.$store.state.timerules;
      },
      courseRules(){
          return this.$store.state.courseRules;
      },
      courses(){
          return this.$store.state.courses;
      },
      semester(){
          return this.$store.state.semester;
      },
      semesterRules(){
          return this.$store.state.semesterRules;
      },
      facultyRules(){
          return this.$store.state.facultyRules;
      },
      faculties(){
          return this.$store.state.faculties;
      }
  },
  methods: {
    validate: function(){
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