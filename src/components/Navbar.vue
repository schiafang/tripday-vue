<template >
  <div class="nav">
    <!-- navbrand -->
    <router-link to="/"><div class="nav-brand">tripday</div></router-link>

    <!-- searchbar -->
    <div v-if="$route.name !== 'Index'">
      <input
        class="nav-search-bar"
        type="text"
        placeholder="輸入目的地、景點或行程名稱"
        v-model="searchInput"
        @keydown.enter="search"
      />
      <i class="fas fa-search search-btn" @click="search"></i>
    </div>

    <!-- hambuger/nav-list-toggle -->
    <label
      class="nav-list-toggle-label"
      for="nav-list-toggle"
      @click="showNavlist"
    >
      <div class="hamburger"></div>
    </label>
    <input
      type="checkbox"
      class="nav-list-toggle"
      id="nav-list-toggle"
      v-model="checked"
    />
    <div
      v-if="showNavlistBack && isSmallWindow"
      class="nav-list-back"
      @click="hideNavList"
    ></div>

    <!-- nav list -->
    <div class="nav-list">
      <!-- isAuthenticated state-->
      <div
        class="nav-list-auth"
        v-if="isAuthenticated"
        v-bind:style="{ display }"
      >
        <router-link to="/user" @click="hideNavList">
          <div class="nav-item-user">
            <img :src="user.avatar" alt="avatar" class="user-image" />
            <span class="user-name">
              {{ user.name || user.email }}
            </span>
            <i class="icon-settings user-setting"></i>
          </div>
        </router-link>

        <router-link to="/user/orderlist" @click="hideNavList">
          <div class="nav-item-link">
            訂單管理
          </div>
        </router-link>

        <router-link to="/user/favorites" @click="hideNavList">
          <div class="nav-item-link ">
            我的收藏
          </div>
        </router-link>

        <router-link to="/admin" v-if="user.isAdmin" @click="hideNavList"
          ><div class="nav-item-link admin-link">
            管理者後台
          </div></router-link
        >

        <div class="nav-item-link nav-item-logout" @click="logout">
          登出
        </div>
      </div>

      <!-- sign form -->
      <div v-else>
        <SignForm />
      </div>

      <!-- currency -->
      <div class="nav-item nav-item-currency">
        <label for="dropdown-currency-toggle" class="dropdown-currency-label"
          >TWD</label
        >
        <input
          type="checkbox"
          id="dropdown-currency-toggle"
          class="dropdown-currency-toggle"
          v-model="currencyCheck"
        />
        <div class="dropdown-currency-content">
          <a href="#" class="dropdown-link nav-item-link">USD 美元</a>
        </div>
      </div>

      <!-- in widescreen unfold nav list -->
      <div v-if="!isSmallWindow && isAuthenticated" class="nav-item">
        <img
          :src="user.avatar"
          alt="avatar"
          class="user-image"
          @click="toggleDeskTopNavList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SignForm from './SignForm'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  components: { SignForm },
  data() {
    return {
      showSignInForm: true,
      showNavlistBack: false,
      checked: false,
      currencyCheck: false,
      isSmallWindow: false,
      showAuthNavList: false,  //切換授權後的 nav-list 的顯示狀態
      screenWidth: window.innerWidth, //監控螢幕大小
      display: 'block', //寬螢幕使用者清單block,
      searchInput: ''
    }
  },
  created() {
    if (this.screenWidth < 996) this.isSmallWindow = true
    if (this.screenWidth > 996) this.display = 'none'
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenWidth = window.innerWidth
      })()
    }

    document.addEventListener('click', e => {
      let className = e.target.className
      if (this.showAuthNavList && className !== 'user-image') this.showAuthNavList = false
      if (this.currencyCheck && className !== 'dropdown-currency-content') this.currencyCheck = false
    })
  },
  watch: {
    $route() {
      this.checked = false
      this.showNavlistBack = false
      this.showAuthNavList = false
    },
    //監控螢幕變化
    screenWidth() {
      if (this.screenWidth < 996) {
        this.isSmallWindow = true
        this.display = 'block'
      } else {
        this.isSmallWindow = false
        this.display = 'none'
      }
    },
    showAuthNavList() {
      if (this.screenWidth < 996) this.display = 'block'
      if (this.screenWidth > 996 && this.showAuthNavList) this.display = 'block'
      if (this.screenWidth > 996 && !this.showAuthNavList) this.display = 'none'
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  },
  methods: {
    //手機螢幕顯示使用者清單
    hideNavList() {
      this.checked = false
      this.showNavlistBack = false
    },
    showNavlist() {
      this.showNavlistBack = true
    },
    //寬螢幕顯示使用者清單
    toggleDeskTopNavList() {
      this.showAuthNavList = !this.showAuthNavList
    },
    openDialog() {
      this.$store.commit('openDialog', true)
    },
    logout() {
      this.$store.commit('revokeAuthentication')
    },
    search() {
      if (this.searchInput.trim().length !== 0) {
        this.$router.push({ name: 'ProductList', query: { q: this.searchInput } })
        this.searchInput = ''
      } else {
        return
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>
