<template>
  <div class="container">
    <div class="card mb">
      <h2>Teilnehmerliste</h2>
        <div class="attendee form">
          <tbody>
              <tr>
                <td><input type="text" class="form-control mb-2" placeholder="Vorname, Nachname"
                v-model="rows.name"></td>
                <td><input type="text" class="form-control mb-2" placeholder="Matrikelnummer"
                v-model="rows.matriculation"></td>
                <td><input type="text" class="form-control mb-2" placeholder="Studienfach"
                v-model="rows.faculty"></td>
                <td><select class="form-control" v-model="rows.semester"><option v-for="semester in 10" :key="semester.id">{{semester}}</option></select></td>
                <td><button class="btn btn-success mt-5 mb-5" v-on:click="AddNewStudentForm()">
                  Save
                  </button>
                </td>
              </tr>
            </tbody>
        </div>
        <div class="attendees_list">
          <table>
            <thead class="ui-table-header-row">
              <tr>
                <th class="ui-table-header-cell center"  v-for="tableHead in tableHeader" :key="tableHead.id">
                  <td>{{tableHead}}</td>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in attendees" :key="(row, index).id">
                <th scope="row">{{index+1}}</th>
                  <td>{{row.name}}</td>
                  <td>{{row.matriculation}}</td>
                  <td>{{row.faculty}}</td>
                  <td>{{row.semester}}</td>
                  <td><button @click="deleteStudentForm(index)" style="cursor:pointer">
                  X
                  </button>
                  </td>
              </tr>
            </tbody>
          </table>
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
      {
        name: '',
        matriculation:'',
        faculty: '',
        semester: ''
      }
    ],
    attendees: [  
    ]
  }
  },
  methods: {
    AddNewStudentForm () {
      this.attendees.push({
        name: this.rows.name,
        matriculation: this.rows.matriculation,
        faculty: this.rows.faculty,
        semester: this.rows.semester
      }),
      this.rows.name=''
      this.rows.matriculation=''
      this.rows.faculty=''
      this.rows.semester=''
    },
    deleteStudentForm (index) {
      this.attendees.splice(index, 1)
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .card{
  border: 2px solid #000000;
  border-radius: 3px;
  background-color: #fff;
} */
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}
.attendees_list thead {
  /* border: 2px solid #ffffff;
  background-color: #42b983;
  color: rgba(255,255,255,0.66); */
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.attendees_list thead td {
  padding: 0px 0 0 10px;  
}
.attendees_list tbody tbody td {
  padding: 5px 0 0 10px;
}
.ui-table-header-cell center{
  text-align:left
}
td {
  min-width: 150px;
  padding: 10px 20px;
}
</style>
