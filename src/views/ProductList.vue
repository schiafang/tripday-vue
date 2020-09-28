<template>
  <div class="product-list-container">
    <div class="breadcrumbs">
      <router-link to="/">
        首頁
      </router-link>
      <span> > </span>
      <router-link :to="`/productlist`">
        台灣
      </router-link>
    </div>
    <div class="search-result-title">
      搜尋結果 <i class="fas fa-quote-left ml-2"></i
      ><span>{{ searchString }}</span>
      <i class="fas fa-quote-right"></i>
    </div>
    <div class="product-list-banner">
      <span>{{ products.length }}</span
      >項體驗行程
    </div>
    <div class="product-list">
      <ProductListCard :products="products" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import productAPI from '../apis/product'
import { mapState } from 'vuex'
import ProductListCard from '../components/ProductListCard'

export default {
  name: 'ProductList',
  components: { ProductListCard },
  data() {
    return {
      products: [],
      searchString: ''
    }
  },
  created() {
    this.fetchData(this.$route.query.q)
  },
  computed: {
    ...mapState(['isLoading'])
  },
  watch: {
    $route(to) {
      this.fetchData(to.query.q)
    }
  },
  methods: {
    async fetchData(q) {
      try {
        this.$store.state.isLoading = true
        if (this.$route.query.q) {
          this.searchString = this.$route.query.q
          const searchProducts = await productAPI.searchProducts(q)
          this.products = searchProducts.data
          this.$store.state.isLoading = false
        } else {
          this.searchString = '台灣'
          const allProducts = await productAPI.getProducts()
          this.products = allProducts.data
          this.$store.state.isLoading = false
        }
      } catch (error) {
        this.$store.state.isLoading = false
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

.product-list-container {
  background-color: $border-gray;
  padding: 15px;
}

.search-result-title {
  font-size: 1.5rem;
  font-weight: 700;

  .fas {
    position: relative;
    top: -10px;
    font-size: 1px;
    margin: 0 1px;
  }

  span {
    color: $main-blue;
    margin: 0 3px;
  }
}

.product-list-banner,
.product-list-card {
  margin: 15px 0;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
}

.product-list-banner {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 60px;

  span {
    font-weight: 700;
    margin: 0 5px;
    color: $main-blue;
  }
}

@media screen and (min-width: 996px) {
  .product-list-container {
    padding: 15px 130px;
  }
}
</style>