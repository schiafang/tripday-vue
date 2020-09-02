<template>
  <div class="banner">
    banner

    <!-- search bar -->
    <input
      class="banner-search-bar"
      type="text"
      placeholder="輸入目的地、景點或行程名稱"
    />
  </div>
</template>

<style scoped>
.banner {
  background-color: rgb(201, 195, 191);
  width: 100%;
  height: 200px;
  position: relative;
}

.banner-search-bar {
  height: 40px;
  width: 200px;
  position: absolute;
  top: 80px;
  left: 80px;
  background-color: rgb(255, 255, 255);
}
</style>