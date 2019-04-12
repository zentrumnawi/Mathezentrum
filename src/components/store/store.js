import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

export const store = new Vuex.Store({
    state: {
        // Cache version
        date: today,
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
            },
        initialiseStore(state) {
          // Check if the ID exists
          if(localStorage.getItem('store')) {
            // Replace the state object with the stored item
            this.replaceState(
              Object.assign(state, JSON.parse(localStorage.getItem('store')))
            )
          }
        }
      }

})

// Storing data whenever the store is updated
store.subscribe((mutation, state) => {
  let store = {
    date: state.date,
    Attendee: state.Attendee
  };
  localStorage.setItem('store', JSON.stringify(store))
})
