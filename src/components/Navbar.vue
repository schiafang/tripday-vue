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
      />
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
              {{ user.name }}
            </span>
            <i class="fas fa-cog user-setting"></i>
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

      <div class="nav-item nav-item-currency">
        <label for="dropdown-currency-toggle" class="dropdown-currency-label"
          >TWD</label
        >
        <input
          type="checkbox"
          id="dropdown-currency-toggle"
          class="dropdown-currency-toggle"
        />
        <div class="dropdown-currency-content">
          <a href="#" class="dropdown-link nav-item-link">USD 美元</a>
        </div>
      </div>
      <!-- <div class="nav-item-language dropdown">
        <label for="dropdown-language" class="dropdown-language-label"
          >繁體中文</label
        >
        <input
          type="checkbox"
          id="dropdown-language"
          class="dropdown-language"
        />
        <div class="dropdown-language-content">
          <a href="#" class="nav-item-link">English</a>
        </div>
      </div> -->

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
      isSmallWindow: false,
      showAuthNavList: false,  //切換授權後的 nav-list 的顯示狀態
      screenWidth: window.innerWidth, //監控螢幕大小
      display: 'block'
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
    //監控是否顯示授權後的nav-list
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
      this.$store.commit('revokeAuthentication')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>
