<template >
  <div class="nav">
    <router-link to="/"><div class="nav-brand">tripday</div></router-link>

    <!-- searchbar -->
    <div v-if="$route.name !== 'Index'">
      <div class="nav-search-bar">
        <input type="checkbox" id="searchBarToggle" />
        <input
          type="text"
          class="search-input"
          placeholder="輸入目的地、景點或行程名稱"
          v-model="searchInput"
          @keydown.enter="search"
        />
        <label for="searchBarToggle"
          ><i class="fas fa-search search-btn mt-3" @click="search"></i
        ></label>
      </div>
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

      <!-- currency -->
      <div class="nav-item nav-item-currency">
        <label for="dropdown-currency-toggle" class="dropdown-currency-label">{{
          currentCurrency
        }}</label>
        <input
          type="checkbox"
          id="dropdown-currency-toggle"
          class="dropdown-currency-toggle"
          v-model="currencyCheck"
        />
        <div class="dropdown-currency-content">
          <button
            class="dropdown-link nav-item-link"
            @click="getCurrency('USD')"
          >
            USD 美元
          </button>
          <button
            class="dropdown-link nav-item-link"
            @click="getCurrency('TWD')"
          >
            TWD 新台幣
          </button>
        </div>
      </div>

      <!-- sign form -->
      <div v-if="!isAuthenticated">
        <SignForm />
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
        this.$store.state.mobileScreen = true
      } else {
        this.isSmallWindow = false
        this.display = 'none'
        this.$store.state.mobileScreen = false
      }
    },
    showAuthNavList() {
      if (this.screenWidth < 996) this.display = 'block'
      if (this.screenWidth > 996 && this.showAuthNavList) this.display = 'block'
      if (this.screenWidth > 996 && !this.showAuthNavList) this.display = 'none'
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'currentCurrency'])
  },
  methods: {
    hideNavList() {
      this.checked = false
      this.showNavlistBack = false
    },
    showNavlist() {
      this.showNavlistBack = true
    },
    toggleDeskTopNavList() {
      this.showAuthNavList = !this.showAuthNavList
    },
    openDialog() {
      this.$store.commit('openDialog', true)
    },
    logout() {
      this.hideNavList()
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
    getCurrency(currency) {
      this.hideNavList()
      if (currency === 'TWD') {
        this.$store.state.exchangeRate = 1
        this.$store.state.currentCurrency = 'TWD'
      }
      if (currency === 'USD' && this.$store.state.exchangeRate === 1) {
        this.$store.dispatch('getCurrency', currency)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>
