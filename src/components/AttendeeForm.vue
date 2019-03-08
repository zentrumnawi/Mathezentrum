<template>
  <div class="container">
    <div class="card mb">
      <h2>Teilnehmerliste</h2>
        <div class="attendee_form">
          <tbody>
              <tr>
                <td><input type="text" class="form-control mb-2" placeholder="Vorname, Nachname"
                v-model="rows.name"></td>
                <td><input type="text" class="form-control mb-2" placeholder="Matrikelnummer"
                v-model="rows.matriculation"></td>
                <td><input type="text" class="form-control mb-2" placeholder="Studienfach"
                v-model="rows.faculty"></td>
                <td><select class="form-control mb-2" v-model="semester_select">
                  <option :value="null">Fachsemester</option>
                  <option v-for="semester in 10" :key="semester.id">{{semester}}</option>
                  </select></td>
                <td><button class="btn btn-success mb-2" v-on:click="AddNewStudentForm()">
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
              <tr class="attendee_rows" v-for="(row, index) in attendees" :key="(row, index).id">
                <td scope="row">{{index+1}}</td>
                  <td>{{row.name}}</td>
                  <td>{{row.matriculation}}</td>
                  <td>{{row.faculty}}</td>
                  <td>{{row.semester}}</td>
                  <td class="delete"><button class="btn btn-success" v-on:click="deleteStudentForm(index)" style="cursor:pointer">
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
    semester_select: null,
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
.card{
  border: 2px solid #000000;
  border-radius: 3px;
  background-color: #fff;
}
.attendee_form input{
}
.attendee_form_input select{
}
.attendee_form button{
  background-color: #005ea8;
}
/* table {
  border: 2px solid #005ea8;
  border-radius: 3px;
  background-color: #fff;
} */
/* .attendees_list thead {
  background-color: #005ea8;
  color: rgba(247, 247, 247, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} */
.attendees_list thead td{
  background-color: #005ea8;
  color: rgba(247, 247, 247, 0.66);
  cursor: pointer;
  min-width: 150px;
  /* border: 2px solid #ffffff; */
  border-radius: 3px;
  }
.ui-table-header-cell center{
  text-align:center
}
.attendees_list .attendee_rows td {
  border: 2px solid #ffffff;
  border-radius: 2px;
  min-width: 150px;
  /* padding: 5px 0 0 10px; */
  background-color: #f3f3f3;
}
.attendees_list .attendee_rows button{
  /* border: 2px solid #ffffff;
  border-radius: 2px; */
  /* padding: 5px 0 0 10px; */
  background-color: #005ea8;
  color: #f3f3f3;
}
.attendees_list .attendee_rows .delete{
  /* border: 2px solid #ffffff;
  border-radius: 2px; */
  /* padding: 5px 0 0 10px; */
  background-color: #f3f3f3;
}
</style>
