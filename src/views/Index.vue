<template>
  <div>
    <!-- Banner -->
    <Banner />

    <div class="container-wrapper">
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
.container-wrapper {
  padding: 0 15px;
}

@media screen and (min-width: 996px) {
  .container-wrapper {
    padding: 0 130px 150px 130px;
  }
}
</style>