import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import authorizationAPI from '../apis/authorization'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

var ls = new SecureLS({ encodingType: 'aes', isCompression: false })

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
      isAdmin: false,
    },
    favoriteProducts: [],
    isAuthenticated: false,
    token: '',
    isLoading: false,
    mobileScreen: false,
    exchangeRate: 1,
    currentCurrency: 'TWD',
    attrs: false,
    on: false,
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
        isAdmin: false,
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
        state.favoriteProducts = state.favoriteProducts.filter((i) => i !== id)
      }
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await authorizationAPI.getCurrentUser()
        if (status === 'error') {
          throw new Error(data)
        }
        const { id, name, email, isAdmin, realname, avatar, tel } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          isAdmin,
          realname,
          avatar,
          tel,
        })
      } catch (error) {
        console.error(error)
        commit('revokeAuthentication')
      }
    },
    async getCurrency(_, currency) {
      /* eslint-disable */
      // Chrome block http
      const res = await axios.get(
        `http://data.fixer.io/api/latest?access_key=acbd6972196dcf75fac8c856311702c0&symbols=${currency},TWD&format=1`
      )
      // const TWD = res.data.rates.TWD

      let TWD = 31.358573
      let USD = 1.128026

      let exchange = 28.992198027261733

      if (currency === 'USD') {
        // if (res) {
        //   exchange = TWD / res.data.rates.USD
        // }
        exchange = TWD / USD
        this.state.exchangeRate = exchange
        this.state.currentCurrency = 'USD'
      }

      if (currency === 'TWD') {
        this.state.exchangeRate = 1
        this.state.currentCurrency = 'TWD'
      }
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: 'userInfo',
      reducer(state) {
        return {
          user: state.user,
          favoriteProducts: state.favoriteProducts,
          isAuthenticated: state.isAuthenticated,
          token: state.token,
        }
      },
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
})
