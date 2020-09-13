<template>
  <div class="city-page">
    <div class="city-content">
      <h2 class="no-data">此城市沒有資料:(</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'City'
}
</script>

<style lang="scss" scoped>
.city-page {
  min-height: 550px;
}

.no-data {
  padding: 100px;
  text-align: center;
}
</style>