<template>
  <div class="nav">
    <!-- navbrand index link -->
    <router-link to="/"><div class="nav-brand">Logo</div></router-link>

    <!-- 離開首頁後的搜尋欄 -->
    <div v-if="$route.name !== 'Index'">
      <input
        class="nav-search-bar"
        type="text"
        placeholder="輸入目的地、景點或行程名稱"
      />
    </div>

    <!-- nav list toggle -->
    <label class="navbar-toggle-label" for="navbar-toggle"
      ><div class="hamburger">三</div></label
    >
    <input type="checkbox" class="navbar-toggle" id="navbar-toggle" />

    <!-- nav list -->
    <div class="nav-list">
      <div class="nav-item">
        登入註冊
      </div>
      <div class="nav-item">
        TWD
      </div>
      <div class="nav-item">
        繁體中文
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      notIndex: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>
