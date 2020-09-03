<template>
  <div>
    <!-- Banner -->
    <Banner />

    <div class="container">
      <!-- Theme -->

      <!-- top city -->
      <TopCities />

      <!-- top product -->
      <div>top-products</div>
      <div class="top-products">
        <router-link to="/products/1">
          <ProductCard />
        </router-link>
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import TopCities from '../components/TopCities'
import ProductCard from '../components/ProductCard'

export default {
  name: 'Index',
  components: {
    Banner, TopCities, ProductCard
  }
}
</script>

<style lang="scss" scoped>
.top-products {
  margin: 20px 0;
  display: flex;
  overflow-x: scroll;
}
</style>