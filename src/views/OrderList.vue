<template>
  <div class="user-container-wapper">
    <div class="user-container">
      <UserTab />
      <div class="user-content">
        <div class="user-content-title">
          訂單管理
        </div>
        <div class="order-detail">
          <input type="checkbox" id="orderContent" />
          <label for="orderContent" class="top">
            <i class="icon-arrow-up"></i>
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
            <div class="order-list-number">
              <h6>訂單編號 #XDEW323087</h6>
            </div>
          </label>

          <div class="content">
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
          </div>
        </div>
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
  created() {
    this.orderDetail = JSON.parse(localStorage.getItem('orderList'))
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>