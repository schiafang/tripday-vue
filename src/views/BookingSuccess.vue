<template>
  <div class="booking-container-wrapper">
    <div v-if="isAuthenticated">
      <div class="booking-container">
        <div class="booking-title">
          <div
            class="step-pay"
            :style="{
              color: '#AAA',
              fontWeight: 350
            }"
          >
            付款
          </div>
          <span class="mx-2"> &#62; </span>
          <div
            class="step-finish"
            :style="{
              color: '#000',
              fontWeight: 900
            }"
          >
            付款完成
          </div>
        </div>

        <div class="booking-form-block checkout-finish">
          {{ orderDetail }}
        </div>
      </div>
    </div>

    <div v-else>
      請先登入
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'

export default {
  name: 'bookingSuccess',
  data() {
    return {
      orderDetail: {}
    }
  },
  created() {
    this.orderDetail = JSON.parse(localStorage.getItem('orderList'))
  },
  computed: {
    ...mapState(['isAuthenticated', 'user']),
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/booking.scss';
</style>