<template>
  <div class="user-tab-wrapper">
    <div class="user-info">
      <img src="../assets/images/default-avatar.svg" alt="" />
      <div class="user-account">Carey</div>
    </div>
    <div class="user-tab">
      <router-link to="/user" class="user-tab-link">
        <div class="user-tab-item" @click="showlink">
          <i class="icon-settings"></i> 帳號管理
        </div>
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
export default {
  methods: {
    showlink() {
      console.log(this.$route)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>