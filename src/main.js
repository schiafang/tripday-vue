import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './assets/scss/main.scss'
import VueScrollactive from 'vue-scrollactive'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(VueLazyload)
Vue.use(VueScrollactive)
Vue.use(VueMeta)

Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
