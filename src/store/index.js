import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=845&q=80',
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
