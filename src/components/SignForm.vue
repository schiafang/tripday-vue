<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="450px" :persistent="isLoading">
      <template v-slot:activator="{ on, attrs }">
        <div class="nav-item-sign" v-bind="attrs" v-on="on">
          登入/註冊
        </div>
      </template>
      <!-- dialog content -->
      <div class="signform-dialog-content">
        <div class="dialog-top">
          <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            absolute
            height="8px"
            color="cyan darken-1"
          ></v-progress-linear>
        </div>
        <button
          class="dialog-close"
          @click="dialog = !dialog"
          :disabled="isLoading"
        >
          <i class="fas fa-times"></i>
        </button>
        <div>
          <transition name="slide-fade">
            <v-alert
              type="error"
              outlined
              color="red lighten-2"
              class="alert"
              v-if="alert"
            >
              {{ alert }}
            </v-alert>
          </transition>
        </div>
        <!-- sign in form -->
        <div class="sign-form sign-in-form" v-if="showSignInForm">
          <form @submit.stop.prevent="handleSignInSubmit">
            <div class="form-title">
              會員帳號登入
            </div>
            <div>
              <label for="sign-email" class="sign-email-lable"
                ><i class="far fa-envelope"></i
              ></label>
              <input
                type="email"
                placeholder="Email"
                class="sign-email sign-input"
                v-model="email"
                required
              />
            </div>
            <div>
              <label for="sign-password" class="sign-password-label"
                ><i class="fas fa-lock"></i
              ></label>
              <input
                type="password"
                placeholder="Password"
                class="sign-password sign-input"
                v-model="password"
                required
              />
            </div>

            <button class="sign-in-btn" :disabled="isLoading">
              登入
              <v-progress-circular
                v-show="isLoading"
                indeterminate
                size="20"
                width="2"
                class="circular"
              ></v-progress-circular>
            </button>
          </form>
          <div class="sign-up-link" @click="showSignInForm = false">
            免費註冊
          </div>
        </div>

        <!-- sign up form -->
        <div class="sign-form sign-up-form" v-else>
          <form @submit.stop.prevent="handleSignUpSubmit">
            <div class="form-title">
              免費註冊
            </div>
            <div>
              <label for="sign-email" class="sign-email-lable"
                ><i class="far fa-envelope"></i
              ></label>
              <input
                type="email"
                placeholder="請輸入Email"
                class="sign-email sign-input"
                v-model="email"
                required
              />
            </div>
            <div>
              <label for="sign-password" class="sign-password-label"
                ><i class="fas fa-lock"></i
              ></label>
              <input
                type="password"
                placeholder="請輸入密碼"
                class="sign-password sign-input"
                v-model="password"
                required
              />
            </div>
            <div>
              <label for="sign-check-password" class="sign-check-password-label"
                ><i class="fas fa-unlock"></i
              ></label>
              <input
                type="password"
                placeholder="請再次輸入密碼"
                class="sign-check-password sign-input"
                v-model="confirmPassword"
                required
              />
            </div>
            <button class="sign-up-btn" :disabled="isLoading">
              註冊
              <v-progress-circular
                v-show="isLoading"
                indeterminate
                size="20"
                width="2"
                class="circular"
              ></v-progress-circular>
            </button>
          </form>
          <div class="sign-up-link" @click="showSignInForm = true">
            登入tripday
          </div>
        </div>
      </div>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable */
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

export default {
  name: 'SignForm',
  data: () => ({
    dialog: false,
    showSignInForm: true,
    email: '',
    password: '',
    confirmPassword: '',
    alert: '',
    isLoading: false
  }),
  watch: {
    showSignInForm() {
      return this.clearForm()
    },
    dialog() {
      return this.clearForm()
    }
  },
  mounted() {
    this.$EventBus.$on("openSignForm", e => {
      this.dialog = e ? true : false
    })
  },
  methods: {
    clearForm() {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    },
    async handleSignInSubmit() {
      try {
        this.isLoading = true
        if (!this.email || !this.password) {
          this.alert = '請輸入 Email 和 Password'
          setTimeout(() => { this.alert = null }, 3000)
          return
        }
        const res = await authorizationAPI.singIn({ email: this.email, password: this.password })

        if (res.data.status !== 'success') { throw new Error(data.message) } //攔截非200-299的錯誤

        localStorage.setItem('token', res.data.token)
        this.$store.commit('setCurrentUser', res.data.user)
        Toast.fire({ icon: 'success', title: '登入成功' })

        this.dialog = false
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        this.alert = '帳號密碼錯誤'
        setTimeout(() => { this.alert = null }, 3000)
        return
      }
    },
    async handleSignUpSubmit() {
      try {
        this.isLoading = true
        if (!this.email || !this.password || !this.confirmPassword) {
          return this.alert = '請完整填寫表單'
        }

        const res = await authorizationAPI.singUp({ email: this.email, password: this.password, confirmPassword: this.confirmPassword })

        if (res.data.status !== 'success') { throw new Error(res.data.message) }
        Toast.fire({ icon: 'success', title: '註冊成功' })

        this.dialog = false
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        this.alert = error
        setTimeout(() => { this.alert = null }, 3000)
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/sign-form.scss';
</style>