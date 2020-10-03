<template>
  <div class="user-container-wapper">
    <Spinner v-if="isLoading" />
    <div class="user-container" v-if="isAuthenticated">
      <UserTab :form-data="formData" />
      <div class="user-content">
        <div class="user-content-title user-setting-title">
          帳號設定

          <div class="user-setting-subtitle">
            基本資料
          </div>
        </div>

        <form
          class="form-content user-setting-form"
          @submit.prevent.stop="handleSubmit"
        >
          <div class="form-item">
            <label for="name">名稱</label>
            <input
              type="text"
              name="name"
              placeholder="使用者名稱"
              v-model="formData.name"
            />
          </div>

          <div class="form-item">
            <label for="realname" class="required-label">真實姓名</label>
            <input
              type="text"
              name="realname"
              placeholder="例：陳"
              v-model="formData.realname"
            />
          </div>

          <div class="form-item">
            <label for="tel">電話號碼</label>
            <input
              type="text"
              name="tel"
              placeholder="例：陳"
              v-model="formData.tel"
            />
          </div>

          <div class="form-item">
            <label for="email" class="required-label"
              >聯絡 Email
              <span v-if="rootAccount">(測試帳號不可修改)</span></label
            >
            <input
              type="email"
              name="email"
              placeholder="例：陳"
              v-model="formData.email"
              :disabled="rootAccount"
            />
          </div>

          <div class="form-item form-file-item">
            <img :src="formData.avatar" class="avatar-thumbnail" />
            <label for="avatar" class="form-control-file-label"
              ><i class="fas fa-camera-retro"></i
            ></label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              class="form-control-file"
              @change="handleFileChange"
            />
          </div>
          <button class="submit-btn btn">確認</button>
        </form>
      </div>
    </div>
    <div class="user-container" v-else>
      <h3>請先登入</h3>
    </div>
  </div>
</template>

<script>
import UserTab from '../components/UserTab'
import userAPI from '../apis/user'
import Spinner from '../components/Spinner'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: { UserTab, Spinner },
  data() {
    return {
      formData: {
        name: '',
        realname: '',
        email: '',
        tel: '',
        avatar: ''
      },
      rootAccount: false
    }
  },
  created() {
    const { name, realname, email, tel, avatar } = this.$store.state.user
    this.formData = { name, realname, email, tel, avatar }

    if (email === '123@123.com') this.rootAccount = true //不可修改測試帳號
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'isLoading'])
  },
  methods: {
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return
      const imageURL = window.URL.createObjectURL(files[0])
      this.formData.avatar = imageURL
    },
    async handleSubmit(e) {
      try {
        this.$store.state.isLoading = true

        const form = e.target
        const formData = new FormData(form)

        const res = await userAPI.putUser(formData)
        if (res.data.status !== 'success') { throw new Error(res.data.message) }

        this.$store.dispatch('fetchCurrentUser')

        this.$store.state.isLoading = false
      } catch (error) {
        console.log(error)
        this.$store.state.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>