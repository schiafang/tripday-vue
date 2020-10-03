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
  // 'https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80',
  // 'https://images.unsplash.com/photo-1598441173154-a7064043dc4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  'https://images.unsplash.com/photo-1568110929146-c5e9854fc7a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  // 'https://images.unsplash.com/photo-1591356442491-99d7775bc7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  // 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1008&q=80'
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
@import '../assets/scss/_base.scss';

.banner {
  width: 100%;
  height: 450px;
  position: relative;

  .banner-img {
    object-fit: cover;
  }
}

.search-block {
  width: calc(100% - 30px);
  position: absolute;
  top: 150px;
  left: 30px;
  color: #fff;
}

.keyword {
  margin-top: 15px;
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 10px;
    display: block;
    width: 100%;
  }
}

.keyword-content {
  max-width: 300px;
}

.keyword-item {
  display: inline-block;
  border: 1px solid #fff;
  padding: 0 8px;
  margin: 0 10px 10px 0;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  text-shadow: 1px 1px 5px #333;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.search-bar {
  width: 70%;
  display: flex;
}

.search-input {
  border-radius: 3px 0 0 3px;
  padding-left: 10px;
  height: 50px;
  width: 400px;
  background-color: $main-white;
  opacity: 0.9;

  &:focus {
    opacity: 1;
    border: 1px solid $main-blue;
  }
}

.search-btn {
  @include flexCenter;
  height: 50px;
  width: 50px;
  border-radius: 0 3px 3px 0;
  color: #fff;
  background: #2292a4;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
}

@media screen and (min-width: 500px) {
  .keyword {
    display: flex;
    flex-direction: row;

    span {
      display: inline-block;
      max-width: 90px;
    }
  }
}

@media screen and (min-width: 996px) {
  .search-block {
    position: absolute;
    top: 150px;
    left: 130px;
  }

  .search-bar {
    width: 400px;
  }

  .keyword-content {
    padding: 0 15px;
    max-width: 400px;
  }
}
</style>