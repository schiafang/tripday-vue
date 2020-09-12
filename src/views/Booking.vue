<template>
  <div class="booking-content">
    <div v-if="isAuthenticated">
      日期 {{ bookingDetail.date }} 場次 {{ bookingDetail.time }} 總金額
      <hr />
      {{ bookingDetail.totalPrice }}
      <hr />

      {{ type }}
    </div>
    <div v-else>
      請先登入
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'booking',
  data() {
    return {
      bookingDetail: {},
      type: [],
    }
  },
  created() {
    this.bookingDetail = JSON.parse(localStorage.getItem('booking'))
    this.type = this.bookingDetail.type.filter(i => i.quantity !== 0)
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
}
</script>

<style lang="scss" scoped>
.booking-content {
  min-height: 60vh;
}
</style>