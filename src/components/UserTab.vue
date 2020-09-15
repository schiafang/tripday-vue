<template>
  <div class="user-tab-wrapper">
    <div class="user-info"></div>
    <div class="user-tab">
      <router-link to="/user" class="router-link-exact-active">
        <div class="user-tab-item">
          帳號管理
        </div>
      </router-link>
      <router-link to="/user/orderlist">
        <div class="user-tab-item">
          訂單管理
        </div></router-link
      >
      <router-link to="/user/favorites">
        <div class="user-tab-item">
          我的收藏
        </div></router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>