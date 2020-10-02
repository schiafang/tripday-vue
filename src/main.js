import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './assets/scss/main.scss'
import VueScrollactive from 'vue-scrollactive';

Vue.use(VueScrollactive);

Vue.config.productionTip = false
Vue.use(VueLazyload)

Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
