import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
