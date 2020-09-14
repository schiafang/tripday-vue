import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
      email: '',
      avatar: 'https://i.imgur.com/Vu6ZZac.png',
      isAdmin: false
    },
    isAuthenticated: false,
    dialog: false,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = {
        ...state.user,
        ...user
      }
      state.isAuthenticated = true
    },
    openDialog(state, payload) {
      state.dialog = payload
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await authorizationAPI.getCurrentUser()
        if (status === 'error') { throw new Error(data) }
        const { id, name, email, isAdmin } = data
        commit('setCurrentUser', { id, name, email, isAdmin })

      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
