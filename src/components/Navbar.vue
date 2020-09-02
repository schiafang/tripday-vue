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

    <!-- hambuger -->
    <label
      class="navlist-toggle-label"
      for="navlist-toggle"
      @click="showNavlist"
    >
      <div class="hamburger"></div>
    </label>
    <input
      type="checkbox"
      class="navlist-toggle"
      id="navlist-toggle"
      v-model="checked"
    />

    <div v-if="showNavlistBack" class="navlist-back" @click="hideNavList"></div>
    <!-- nav list -->
    <div class="navlist">
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
      showNavlistBack: false,
      checked: false
    }
  },
  methods: {
    hideNavList() {
      this.checked = false
      this.showNavlistBack = false
    },
    showNavlist() {
      this.showNavlistBack = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>
