<template>
  <div>
    <!-- Banner -->
    <Banner />

    <div class="container-wrapper">
      <!-- Theme -->

      <!-- top city -->
      <TopCities />

      <!-- top product -->
      <div class="top-products-title">
        <h2 class="mb-3">Top 10 超熱門活動</h2>
        <TopProducts :products="products" />
      </div>

      <button class="btn more-products" @click="moreProducts">
        更多在地行程
      </button>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import TopCities from '../components/TopCities'
import TopProducts from '../components/TopProducts'
import productAPI from '../apis/product'

export default {
  name: 'Index',
  components: {
    Banner, TopCities, TopProducts
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await productAPI.getTopProducts()
        this.$nextTick(() => this.products = res.data)
      } catch (error) {
        console.log(error)
      }
    },
    moreProducts() {
      this.$router.push({ name: 'ProductList' })
    }
  },
}
</script>

<style lang="scss" scoped>
.container-wrapper {
  padding: 0 15px;
}

.more-products {
  float: right;
}

@media screen and (min-width: 996px) {
  .container-wrapper {
    padding: 0 130px 150px 130px;
  }
}
</style>