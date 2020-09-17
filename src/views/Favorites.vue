<template>
  <div class="user-container-wapper">
    <div class="user-container">
      <UserTab />
      <div class="user-content">
        <div class="user-content-title">
          我的收藏
        </div>

        <template v-if="favorites.length === 0">
          <div class="user-content-no-data">
            <div>
              <span>
                沒有收藏
              </span>
            </div>
          </div>
        </template>

        <div class="favorites-list" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserTab from '../components/UserTab'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: { UserTab },
  data() {
    return {
      favorites: []
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>