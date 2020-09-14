import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

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
    path: '/user/orderlist',
    name: 'OrderList',
    component: () => import('../views/OrderList')
  },
  {
    path: '/user/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites')
  },
  {
    path: '/cities/:id',
    name: 'Cities',
    component: () => import('../views/City')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart')
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../views/Booking')
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('../views/AdminPage')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() { return { x: 0, y: 0 } }
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
