<template>
  <div class="user-container-wapper">
    <div class="user-container" v-if="isAuthenticated">
      <UserTab />
      <div class="user-content">
        <h1>{{ user.name || user.email }}'s' Page</h1>
      </div>
    </div>
    <div class="user-container" v-else>
      <h3>請先登入</h3>
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