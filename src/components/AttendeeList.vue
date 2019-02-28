<script>
export default {
  el: '',
  data: function() {
return {
    rows: [
// leere Liste
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
/* .attendees thead {
  border: 2px solid #ffffff;
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
}
.attendees thead td {
  padding: 0px 0 0 10px;  
}
.attendees tbody tbody td {
  padding: 5px 0 0 10px;
} */
/* .ui-table-header-cell center{
  text-align:left
} */
/* td {
  min-width: 150px;
  padding: 10px 5px;
} */
</style>
