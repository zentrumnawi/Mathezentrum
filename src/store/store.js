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
    }
  },
  mutations: {
    saveAttendee (state, formData) {
        state.attendees.push(formData)
    }
  },
  plugins: [createPersistedState()]
})