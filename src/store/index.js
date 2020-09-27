import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ encodingType: "aes", isCompression: false });

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
      realname: '',
      avatar: '',
      email: '',
      tel: '',
      isAdmin: false
    },
    favoriteProducts: [],
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = {
        ...state.user,
        ...user,
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.user = {
        id: -1,
        name: '',
        realname: '',
        avatar: '',
        email: '',
        tel: '',
        isAdmin: false
      }
      state.isAuthenticated = false
      state.token = ''
      state.favoriteProducts = []
      localStorage.removeItem('token')
    },
    addFavorite(state, id) {
      if (!state.favoriteProducts.includes(id)) state.favoriteProducts.push(id)
    },
    removeFavorite(state, id) {
      if (state.favoriteProducts.includes(id)) {
        state.favoriteProducts = state.favoriteProducts.filter(i => i !== id)
      }
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await authorizationAPI.getCurrentUser()
        if (status === 'error') { throw new Error(data) }
        const { id, name, email, isAdmin, realname, avatar } = data
        commit('setCurrentUser', { id, name, email, isAdmin, realname, avatar })
      } catch (error) {
        console.error(error)
        commit('revokeAuthentication')
      }
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'userInfo',
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
})
