<template>
  <div class="booking-container-wrapper">
    <template v-if="isAuthenticated">
      <div class="booking-container ">
        <div class="booking-step">
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
        <div class="booking-block checkout-finish">
          <h2 class="mb-3">訂購成功 🎉</h2>

          <div class="order-detail">
            <h3>訂單編號 #XDEW323087</h3>

            <h4 class="mt-4">
              {{ orderDetail.bookingDetail.plan.planOption[0].title }}
            </h4>

            <div class="item">
              <i class="icon-people"></i>
              <span
                class="inline"
                v-for="(type, index) in orderDetail.bookingDetail.type"
                :key="index"
              >
                {{ type.name }} x {{ type.quantity }}
              </span>
            </div>
            <hr />

            <div class="item">
              <i class="icon-calendar"></i>
              <span> 日期:</span>{{ orderDetail.bookingDetail.date }}
            </div>

            <div class="item">
              <i class="icon-user"></i>
              <span> 訂購人:</span>{{ orderDetail.fullName }}
            </div>

            <div class="item">
              <i class="icon-user-following"></i>
              <span> 主要聯絡人:</span>{{ orderDetail.mainPassenger }}
            </div>

            <div class="item">
              <i class="icon-phone"></i>
              <span> 聯絡電話:</span>{{ orderDetail.contactNumber }}
            </div>

            <div class="item">
              <i class="icon-note"></i>
              <span> 備註:</span> {{ orderDetail.reminder || '無' }}
            </div>

            <div class="item">
              <i class="icon-credit-card"></i>
              <span> 訂單金額:</span> {{ orderDetail.billPrice }}
            </div>

            <router-link to="/user/orderlist">
              <button class="btn orderlist-link">查看訂單</button>
            </router-link>
          </div>
        </div>
      </div>
    </template>

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