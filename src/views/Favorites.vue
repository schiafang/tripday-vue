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

        <div class="favorites-list" v-else>
          <ProductListCard :products="favorites" />
        </div>
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
      products: []
    }
  },
  created() {
    this.fetchProducts()
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'favoriteProducts'])
  },
  watch: {
    favoriteProducts() {
      this.fetchProducts()
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
</style>