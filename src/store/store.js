import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    attendees: []
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