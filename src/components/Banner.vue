<template>
  <div class="banner">
    <img v-lazy="banner" alt="" class="banner-img" />
    <div class="search-block">
      <div class="mb-5">
        帶你深入探索有趣又獨特的旅遊體驗行程
      </div>
      <div class="search-bar">
        <input
          class="search-input"
          type="text"
          placeholder="輸入目的地、景點或行程名稱"
          v-model="searchInput"
          @keydown.enter="search"
        />
        <button class="search-btn" @click="search">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="keyword">
        <span>熱門關鍵字</span>
        <div class="keyword-content">
          <button
            v-for="(keyword, index) in keywords"
            :key="index"
            class="keyword-item"
            @click="searchKeyword(keyword)"
          >
            {{ keyword }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const bannerAll = [
  'https://images.unsplash.com/photo-1568110929146-c5e9854fc7a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
]

const keywords = ['Xpark', '台北', '桃園', '台中', '101', '水族館', '樂園', '宜蘭', '花蓮']

export default {
  data() {
    return {
      banner: '',
      searchInput: '',
      keywords: []
    }
  },
  created() {
    this.banner = bannerAll[Math.floor(Math.random() * bannerAll.length)]
    this.keywords = keywords
  },
  methods: {
    search() {
      if (this.searchInput.trim().length !== 0) {
        this.$router.push({ name: 'ProductList', query: { q: this.searchInput } })
        this.searchInput = ''
      } else {
        return
      }
    },
    searchKeyword(keyword) {
      this.$router.push({ name: 'ProductList', query: { q: keyword } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/banner.scss';
</style>