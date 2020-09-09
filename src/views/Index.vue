<template>
  <div>
    <!-- Banner -->
    <Banner />

    <div class="container">
      <!-- Theme -->

      <!-- top city -->
      <TopCities />

      <!-- top product -->
      <TopProducts />
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import TopCities from '../components/TopCities'
import TopProducts from '../components/TopProducts'

export default {
  name: 'Index',
  components: {
    Banner, TopCities, TopProducts
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