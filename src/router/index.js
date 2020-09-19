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
    path: '/booking/step1',
    name: 'Booking',
    component: () => import('../views/Booking')
  },
  {
    path: '/booking/step2',
    name: 'BookingSuccess',
    component: () => import('../views/BookingSuccess')
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
  linkExactActiveClass: 'active',
  scrollBehavior() { return { x: 0, y: 0 } }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const stateToken = store.state.token
  store.state.isLoading = true
  if (token !== stateToken) { store.dispatch('fetchCurrentUser') }
  store.state.isLoading = false
  next()
})

export default router
