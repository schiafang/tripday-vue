import Vue from 'vue'
import Vuex from 'vuex'

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
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = {
        ...state.user,
        ...user
      }
      state.isAuthenticated = true
    }
  },
  actions: {
  },
  modules: {
  }
})
