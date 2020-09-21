<template>
  <div class="user-container-wapper">
    <Spinner v-if="isLoading" />
    <div class="user-container" v-if="isAuthenticated">
      <UserTab />
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
            <label for="">名稱</label>
            <input type="text" v-model="formData.name" />
          </div>

          <div class="form-item">
            <label for="" class="required-label">真實姓名</label>
            <input
              type="text"
              placeholder="例：陳"
              v-model="formData.realname"
            />
          </div>

          <div class="form-item">
            <label for="">電話號碼</label>
            <input type="text" placeholder="例：陳" v-model="formData.tel" />
          </div>

          <div class="form-item">
            <label for="" class="required-label">聯絡 Email</label>
            <input type="emai;" placeholder="例：陳" v-model="formData.email" />
          </div>

          <label for="avatar">avatar</label>

          <input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            class="form-control-file"
          />

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
    }
  },
  created() {
    const { name, realname, email, tel, avatar } = this.$store.state.user
    this.formData = { name, realname, email, tel, avatar }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'isLoading'])
  },
  methods: {
    // handleFileChange(e) {
    //   const files = e.target.files
    //   if (!files.length) return
    //   const imageURL = window.URL.createObjectURL(files[0])
    //   this.formData.avatar = imageURL
    // },
    async handleSubmit(e) {
      try {
        const form = e.target
        const formData = new FormData(form)

        this.$store.state.isLoading = true

        this.formData.avatar = formData
        const res = await userAPI.putUser({ ...this.formData }) //TODO: 修改上傳圖片錯誤

        if (res.data.status !== 'success') { throw new Error(res.data.message) }

        this.$store.dispatch('fetchCurrentUser')

        this.$store.state.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>