<template>
  <div class="container">
      <!-- <button class="btn btn-success mt-5 mb-5"
        @click="AddNewStudentForm()">
        Neuer Teilnehmer
      </button> -->

  <div class="card mb">
      <div class="attendees">
          <tbody>
            <thead class="ui-table-header-row">
              <tr>
                <!-- <td class="ui-table-header-cell l-padding"></td> -->
                <th class="ui-table-header-cell center"  v-for="tableHead in tableHeader" :key="tableHead.id">
                  <td>{{tableHead}}</td>
                </th>
              </tr>
            </thead>
            <tbody>
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
                  <td><select class="form-control" v-model="row.semester"><option v-for="semester in 10" :key="semester.id">{{semester}}</option></select></td>
                  <td><span @click="deleteStudentForm(index)" style="cursor:pointer">
                  X
                  </span>
                  </td>
              </tr>
            </tbody>
            <button class="btn btn-success mt-5 mb-5"
            @click="AddNewStudentForm()">
            Neuer Teilnehmer
            </button>
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
.card{
  border: 2px solid #000000;
  border-radius: 3px;
  background-color: #fff;
}
.attendees thead {
  border: 2px solid #ffffff;
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
}
.attendees thead td {
  padding: 0px 0 0 10px;  
}
.attendees tbody tbody td {
  padding: 5px 0 0 10px;
}
/* .ui-table-header-cell center{
  text-align:left
} */
/* td {
  min-width: 150px;
  padding: 10px 5px;
} */
</style>
