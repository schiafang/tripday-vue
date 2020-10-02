<template>
  <div class="user-container-wapper">
    <div class="user-container" v-if="isAuthenticated">
      <UserTab />
      <div class="user-content">
        <div class="user-content-title">
          我的收藏
        </div>

        <template v-if="favorites.length === 0">
          <div class="user-content-no-data">
            <div>
              <span>
                沒有收藏
              </span>
            </div>
          </div>
        </template>

        <transition name="fade">
          <div class="favorites-list" v-if="favorites.length !== 0">
            <ProductListCard
              :products="favorites"
              v-if="favorites.length !== 0"
            />
          </div>
        </transition>
      </div>
    </div>
    <div class="user-container" v-else>
      <h3>請先登入</h3>
    </div>
  </div>
</template>

<script>
import UserTab from '../components/UserTab'
import productAPI from '../apis/product'
import { mapState } from 'vuex'
import ProductListCard from '../components/ProductListCard'

export default {
  name: 'User',
  components: { UserTab, ProductListCard },
  data() {
    return {
      favorites: [],
      products: [],
    }
  },
  created() {
    this.fetchProducts()
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'favoriteProducts'])
  },
  watch: {
    favoriteProducts(a, b) {
      let remove = a.filter(i => !(b.indexOf(i) > -1)).concat(b.filter(i => !(a.indexOf(i) > -1)))
      let target = document.querySelector(`#productListCard${remove}`)
      target.style.height = 0
      target.style.opacity = 0

      setTimeout(() => {
        this.fetchProducts()
      }, 500)

    }
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await productAPI.getProducts()
        this.products = res.data
        this.favorites = this.products.filter(i => {
          return this.favoriteProducts.includes(i.id)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>