import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        valid: false,
        ID: '',
        IDRules: [
          v => !!v || 'Bitte geben Sie Ihren persönlichen ID an',
          v => v.length > 8 || 'Ihr ID muss mindestens 8 Zeichen lang sein'
        ],
        starttime: [{}],
        endtime: [{}],
        timeRules: [
          v => !!v || 'Bitte geben Sie Ihre Startzeit an',
        ],
        course_select: [{}],
        courseRules: [
          v => !!v || 'Bitte wählen Sie mindestens eine Lehrveranstaltung aus'       
        ],
        courses: [
          'Mathe für Physiker 1',
          'Mathe für Physiker 2',
          'Mathe für Physiker 3',
          'Sonstige'
        ],
        semester:'',
        semesterRules: [
          v => !!v || 'Bitte geben Sie Ihr aktuelles Fachsemester an',
          v => (v.length <=2) || 'Falsche Eingabe'
        ],
        faculty_select: [{}],
        facultyRules: [
          v => !!v || 'Bitte geben Sie Ihren Studiengang an'       
        ],
        faculties: [
          'BSc Physik',
          'BSc Meteorologie',
          'BSc Biologie',
          'BSc Pharmazie',
          'Sonstige'
        ] ,
        Attendee: [
            {
            ID : '',
            starttime : '',
            endtime : '',
            courses : '',
            semester : '',
            faculty : ''
            }
        ]
    },
    mutations: {
        UPDATEID (state, ID){
          state.ID = ID
        },
        UPDATEstarttime (state, starttime){
          state.starttime = starttime
        },
        UPDATEendtime (state, endtime){
          state.endtime = endtime
        },
        UPDATEcourses (state, courses){
          state.course_select = courses
        },
        UPDATEsemester (state, semester){
          state.semester = semester
        },
        UPDATEfaculty(state, faculty){
          state.faculty_select = faculty
        },
        VALIDATE (state) {
            state.Attendee.push(
                {
                ID: this.state.ID,
                starttime: this.state.starttime,
                endtime: this.state.endtime,
                courses: this.state.course_select,
                semester: this.state.semester,
                faculty: this.state.faculty_select
                }
            )
            // if (this.$ref.form.validate()){
            //   this.validate = true
            // }
            // if (this.$refs.form.validate()) {
            //   this.valid = true
            // if (this.valid == true) {
            //   this.$refs.form.reset()
            }
            }

})
