<template>
  <div class="container">
    <button class="btn btn-success mt-5 mb-5"
      @click="AddNewStudentForm()">
      Neuer Teilnehmer
    </button>

    <div class="card mb-3">
      <div class="card mb-3" v-for="(student, index) in students">
        <div class="card-body">
          <span class="float-right" style="cursor:pointer"
            @click="deleteStudentForm(index)">
            X
          </span>

          <h4 class="card-title">Teilnehmer hinzufügen (Nr: {{ index }})</h4>

          <div class="employee-form">
            <input type="text" class="form-control mb-2" placeholder="Vorname, Nachname"
              v-model="student.name">

            <input type="text" class="form-control mb-2" placeholder="Matrikelnummer"
              v-model="student.matriculation">

            <input type="text" class="form-control mb-2" placeholder="Studienfach"
              v-model="student.faculty">

            <input type="text" class="form-control mb-2" placeholder="Fachsemester"
              v-model="student.semester">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  el: '.container',
  data: function() {
return {
    students: [
      {
        name: '',
        matriculation:'',
        faculty: '',
        semester: '10'
      }
    ]
  }
  },
  methods: {
    AddNewStudentForm () {
      this.students.push({
        name: '',
        matriculation:'',
        faculty: '',
        semester: ''
      })
    },
    deleteStudentForm (index) {
      this.students.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
