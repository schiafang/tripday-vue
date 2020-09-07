<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="450px">
      <template v-slot:activator="{ on, attrs }">
        <div class="nav-item-sign" v-bind="attrs" v-on="on">
          登入註冊
        </div>
        <!-- <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">登入註冊 </v-btn> -->
      </template>
      <!-- dialog content -->
      <div class="dialog-content">
        <div class="dialog-top"></div>
        <div class="dialog-close" @click="dialog = !dialog">
          <i class="fas fa-times"></i>
        </div>

        <!-- sign in form -->
        <div class="sign-form sign-in-form" v-if="showSignInForm">
          <form action="">
            <div class="form-title">
              會員帳號登入
            </div>
            <div>
              <label for="sign-email" class="sign-email-lable"
                ><i class="far fa-envelope"></i
              ></label>
              <input
                type="text"
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

            <button class="sign-in-btn">登入</button>
          </form>
          <div class="sign-up-link" @click="showSignInForm = false">
            免費註冊
          </div>
        </div>

        <!-- sign up form -->
        <div class="sign-form sign-up-form" v-else>
          <form action="">
            <div class="form-title">
              免費註冊
            </div>
            <div>
              <label for="sign-email" class="sign-email-lable"
                ><i class="far fa-envelope"></i
              ></label>
              <input
                type="text"
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
                v-model="checkPassword"
                required
              />
            </div>

            <button class="sign-up-btn">註冊</button>
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

export default {
  data: () => ({
    dialog: false,
    showSignInForm: true,
    email: '',
    password: '',
    checkPassword: ''
  }),
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/sign-form.scss';
</style>