<template>
  <div class="user-tab-wrapper">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <div class="user-account">{{ name || email }}</div>
    </div>
    <div class="user-tab">
      <router-link to="/user" class="user-tab-link">
        <div class="user-tab-item"><i class="icon-settings"></i> 帳號管理</div>
      </router-link>
      <router-link to="/user/orderlist" class="user-tab-link">
        <div class="user-tab-item">
          <i class="icon-note"></i> 訂單查詢
        </div></router-link
      >
      <router-link to="/user/favorites" class="user-tab-link">
        <div class="user-tab-item">
          <i class="icon-heart"></i> 我的收藏
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    formData: {
      type: Object
    }
  },
  data() {
    return {
      avatar: '',
      name: '',
      email: ''
    }
  },
  created() {
    const { name, email, avatar } = this.$store.state.user
    this.name = name
    this.email = email
    this.avatar = avatar ? avatar : 'https://i.imgur.com/hyCLvT0.png'
  },
  watch: {
    formData: {
      handler: function (e) {
        this.avatar = e.avatar ? e.avatar : this.$store.state.user.avatar
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>