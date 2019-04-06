import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        ID: '',
        starttime: [{}],
        endtime: [{}],
        course_select: [{}],
        courses: [
          'Mathe für Physiker 1',
          'Mathe für Physiker 2',
          'Mathe für Physiker 3',
          'Sonstige'
        ],
        semester:'',
        faculty_select: [{}],
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
        SUBMIT (state) {
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
            // if (this.$refs.form.validate()) {
            //   this.valid = true
            // if (this.valid == true) {
            //   this.$refs.form.reset()
            }
            }

})
