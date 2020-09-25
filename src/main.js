import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
