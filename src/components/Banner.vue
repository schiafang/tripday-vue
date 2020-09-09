<template>
  <div class="banner">
    <img :src="banner" alt="" class="banner-img" />
    <!-- search bar -->
    <div class="search-bar">
      <input
        class="search-input"
        type="text"
        placeholder="輸入目的地、景點或行程名稱"
        v-model="search"
      />
      <div class="search-btn"><i class="fas fa-search"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80',
      // banner: 'https://images.unsplash.com/photo-1598441173154-a7064043dc4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
      search: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 380px;
  position: relative;

  .banner-img {
    object-fit: cover;
  }
}

.search-bar {
  display: flex;
  height: 45px;
  width: 250px;
  position: absolute;
  top: 150px;
  left: 30px;
}

.search-input {
  border-radius: 3px 0 0 3px;
  padding-left: 10px;
  height: 45px;
  width: 100%;
  background-color: #f5efed;
}

.search-btn {
  text-align: center;
  padding: 11.25px 0;
  height: 45px;
  width: 45px;
  border-radius: 0 3px 3px 0;
  color: #fff;
  background: #2292a4;
  // position: absolute;
  // top: 80px;
  // left: 380px;
}

@media screen and (min-width: 996px) {
  .search-bar {
    width: 350px;
    left: 130px;
  }
}
</style>