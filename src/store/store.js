import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    attendees: [],
    courses_phy_act: [],
    courses_math_act: [],
    faculties_act: [],
    semester_toggle: 0
  },
  actions: {
    submitForm({ commit }, formData) {
      commit("saveAttendee", formData)
    },
    clearlist({commit}) {
      commit("clearAttendees")
    },
  },
  mutations: {
    saveAttendee (state, formData) {
        state.attendees.push(formData)
    },
    clearAttendees (state) {
        state.attendees.length = 0
    },
  },
  getters: {
    attendees: state => state.attendees
  },
  plugins: [createPersistedState()]
})