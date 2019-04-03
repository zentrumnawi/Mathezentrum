import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        valid: true,
        ID: '',
        IDRules: [
          v => !!v || 'Bitte geben Sie Ihren persönlichen ID an',
          v => v.length > 8 || 'Ihr ID muss mindestens 8 Zeichen lang sein'
        ],
        starttime: '',
        endtime: '',
        timeRules: [
          v => !!v || 'Bitte geben Sie Ihre Startzeit an',
        ],
        course_select: null,
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
        faculty_select: null,
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
        VALIDATE (state) {
            state.Attendee.push(
                {
                ID: this.ID,
                starttime: this.starttime,
                endtime: this.endtime,
                courses: this.courses,
                semester: this.semester,
                faculty: this.faculties
                }
            )
            // if (this.$refs.form.validate()) {
            //   this.valid = true
            // if (this.valid == true) {
            //   this.$refs.form.reset()
            }
            }

})
