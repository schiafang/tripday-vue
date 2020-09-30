<template>
  <div class="banner">
    <img v-lazy="banner" alt="" class="banner-img" />
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
  </div>
</template>

<script>
const bannerAll = ['https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80',
  'https://images.unsplash.com/photo-1598441173154-a7064043dc4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  'https://images.unsplash.com/photo-1568110929146-c5e9854fc7a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  'https://images.unsplash.com/photo-1591356442491-99d7775bc7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1008&q=80'
]

export default {
  data() {
    return {
      banner: '',
      searchInput: ''
    }
  },
  created() {
    this.banner = bannerAll[Math.floor(Math.random() * bannerAll.length)]
  },
  methods: {
    search() {
      if (this.searchInput.trim().length !== 0) {
        this.$router.push({ name: 'ProductList', query: { q: this.searchInput } })
        this.searchInput = ''
      } else {
        return
      }
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

.search-bar {
  display: flex;
  width: 100%;
  position: absolute;
  top: 150px;
  left: 30px;
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

@media screen and (min-width: 996px) {
  .search-bar {
    width: 400px;
    left: 130px;
  }
}
</style>