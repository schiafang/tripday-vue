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
    component: Index,
    meta: { title: 'tripday - 在地旅遊體驗' }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail'),
    // meta: { title: '精選商品 - tripday' }
  },
  {
    path: '/productlist',
    name: 'ProductList',
    component: () => import('../views/ProductList'),
    // meta: { title: '精選商品 - tripday' }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User'),
    meta: { title: '帳號設定 - tripday' }
  },
  {
    path: '/user/orderlist',
    name: 'OrderList',
    component: () => import('../views/OrderList'),
    meta: { title: '訂單查詢 - tripday' }
  },
  {
    path: '/user/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites'),
    meta: { title: '收藏清單 - tripday' }
  },
  {
    path: '/cities',
    name: 'Cities',
    component: () => import('../views/City'),
    // meta: { title: 'tripday - 熱門城市' }
  },
  {
    path: '/booking/step1',
    name: 'Booking',
    component: () => import('../views/Booking'),
    meta: { title: '商品結帳 - tripday' }
  },
  {
    path: '/booking/step2',
    name: 'BookingSuccess',
    component: () => import('../views/BookingSuccess'),
    meta: { title: '訂購成功 - tripday' }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  linkExactActiveClass: 'active',
  scrollBehavior() { return { x: 0, y: 0 } }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) { document.title = to.meta.title }

  const token = localStorage.getItem('token')
  const stateToken = store.state.token
  store.state.isLoading = true
  if (token !== stateToken && token) { store.dispatch('fetchCurrentUser') }
  store.state.isLoading = false
  next()
})
export default router
