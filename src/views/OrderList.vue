<template>
  <div class="user-container-wapper">
    <div v-if="isAuthenticated" class="user-container">
      <UserTab />
      <div class="user-content">
        <div class="user-content-title">
          訂單管理
        </div>

        <template v-if="orderList.length === 0">
          <div class="user-content-no-data">
            <div>
              <span>
                沒有訂單
              </span>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            class="order-list"
            v-for="(order, index) in orderList"
            :key="index"
          >
            <input
              type="checkbox"
              :id="index + 'orderContent'"
              class="order-input "
            />
            <label :for="index + 'orderContent'" class="top">
              <i class="icon-arrow-up"></i>
              <h4 class="mt-4">
                {{ order.bookingDetail.plan.planOption[0].title }}
              </h4>
              <div class="item">
                <i class="icon-people"></i>
                <span
                  class="inline"
                  v-for="(type, index) in order.bookingDetail.type"
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
                <span> 日期:</span>{{ order.bookingDetail.date }}
              </div>
              <div class="item">
                <i class="icon-user"></i>
                <span> 訂購人:</span>{{ order.fullName }}
              </div>
              <div class="item">
                <i class="icon-user-following"></i>
                <span> 主要聯絡人:</span>{{ order.mainPassenger }}
              </div>
              <div class="item">
                <i class="icon-phone"></i>
                <span> 聯絡電話:</span>{{ order.contactNumber }}
              </div>
              <div class="item">
                <i class="icon-note"></i>
                <span> 備註:</span> {{ order.reminder || '無' }}
              </div>
              <div class="item">
                <i class="icon-credit-card"></i>
                <span> 訂單金額:</span> {{ order.billPrice }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-else class="user-container">
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
      orderList: []
    }
  },
  created() {
    const data = JSON.parse(localStorage.getItem('orderList'))
    if (data) this.orderList = data
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/user-page.scss';
</style>