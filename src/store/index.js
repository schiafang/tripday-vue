import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
      avatar: '',
      email: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: '',
    dialog: false,
    isLoading: false
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = {
        ...state.user,
        ...user,
        avatar: 'https://i.imgur.com/Vu6ZZac.png',
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    openDialog(state, payload) {
      state.dialog = payload
    },
    revokeAuthentication(state) {
      state.user = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
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
        commit('revokeAuthentication')
      }
    }
  },
  modules: {
  }
})
