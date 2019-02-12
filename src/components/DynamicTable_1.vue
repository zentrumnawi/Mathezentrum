<template>
    <div class="container">
      <button class="btn btn-success mt-5 mb-5"
        @click="AddNewStudentForm()">
        Neuer Teilnehmer
      </button>

  <div class="card mb">
      <div class="attendees">
          <tbody>
            <thead class="ui-table-header-row">
              <tr>
                <!-- <td class="ui-table-header-cell l-padding"></td> -->
                <td class="ui-table-header-cell center"  v-for="tableHead in tableHeader" :key="tableHead.id">{{tableHead}}</td>
              </tr>
            </thead>
              <tr v-for="(row, index) in rows" :key="(row, index).id">
                <th scope="row">{{index+1}}</th>
                  <td><input type="text" class="form-control mb-2" placeholder="Vorname, Nachname"
                  v-model="row.name"></td>
                  <td><input type="text" class="form-control mb-2" placeholder="Matrikelnummer"
                  v-model="row.matriculation"></td>
                  <td><input type="text" class="form-control mb-2" placeholder="Studienfach"
                  v-model="row.faculty"></td>
                  <!-- <td><input type="text" class="form-control mb-2" placeholder="Fachsemester"
                  v-model="row.semester"></td> -->
                  <select class="form-control" id="exampleFormControlSelect1"
                  v-model="row.semester"><option v-for="semester in 10" :key="semester.id">{{semester}}</option></select>
                  <span class="float-right" style="cursor:pointer"
                  @click="deleteStudentForm(index)">
                  X
                  </span>
              </tr>
          </tbody>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  el: '.container',
  data: function() {
return {
    tableHeader: [
      '#',
      'Name',
      'Matrikelnummer',
      'Studienfach',
      'Fachsemester'
    ],
    rows: [
    //   {
    //     name: '',
    //     matriculation:'',
    //     faculty: '',
    //     semester: '10'
    //   }
    ]
  }
  },
  methods: {
    AddNewStudentForm () {
      this.rows.push({
        name: '',
        matriculation:'',
        faculty: '',
        semester: ''
      })
    },
    deleteStudentForm (index) {
      this.rows.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
