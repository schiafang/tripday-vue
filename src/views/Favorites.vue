<template>
  <div class="user-container-wapper">
    <div class="user-container">
      <UserTab />
      <div class="user-content">
        <h1>{{ user.name || user.email }}'s 收藏清單 Page</h1>
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