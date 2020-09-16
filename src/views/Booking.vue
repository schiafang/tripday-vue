<template>
  <div class="booking-container-wrapper">
    <Spinner v-if="isLoading" />
    <template v-if="isAuthenticated">
      <div class="booking-container">
        <div class="booking-step">
          <div
            class="step-pay"
            :style="{
              color: '#000',
              fontWeight: 900
            }"
          >
            付款
          </div>
          <span class="mx-2"> &#62; </span>
          <div
            class="step-finish"
            :style="{
              color: '#AAA',
              fontWeight: 350
            }"
          >
            付款完成
          </div>
        </div>

        <!--訂購人資料-->
        <div class="booking-block booking-user">
          <button @click="toggleDisplay" class="block-top">
            <div class="stop-event d-flex">
              <div class="fold-icon-wrapper">
                <span
                  ref="userFoldIcon"
                  class="fold-icon"
                  :style="{
                    transform: 'rotate(135deg)'
                  }"
                ></span>
              </div>
              訂購人資料
            </div>
            <i
              v-show="checkUser"
              class="fas fa-check-circle check-form-icon"
            ></i>
          </button>

          <form
            class="form-content"
            ref="userForm"
            :style="{ display: 'block', transition: 'display .3s ease-in-out' }"
            @submit.prevent.stop="checkUserForm"
          >
            <div class="form-item">
              <label for="" class="required-label">名字</label>
              <input
                type="text"
                placeholder="例：小明"
                v-model="firstName"
                required
              />
            </div>

            <div class="form-item">
              <label for="" class="required-label">姓氏</label>
              <input
                type="text"
                placeholder="例：陳"
                v-model="lastName"
                required
              />
            </div>

            <div class="form-item">
              <label for="">國家/地區</label>
              <div class="select-wrapper">
                <select name="" id="" disabled>
                  <option value="taiwan">台灣</option>
                </select>
              </div>
            </div>

            <div class="form-item">
              <label for="" class="required-label">聯絡電話</label>
              <input
                type="text"
                placeholder="請輸入聯絡電話"
                v-model="orderDetail.contactNumber"
                required
              />
            </div>

            <div class="form-item">
              <label for="" class="required-label">電子郵件信箱</label>
              <input
                type="text"
                placeholder="請輸入常用電子郵件信箱"
                v-model="orderDetail.email"
                required
              />
            </div>

            <button class="continue-btn">繼續</button>
          </form>
        </div>

        <!--旅客資料-->
        <div class="booking-sub-title">旅客資料</div>
        <div
          class="booking-block booking-guest"
          id="guestContent"
          ref="guestContent"
        >
          <button @click="toggleDisplay" class="block-top">
            <div class="d-flex stop-event">
              <div class="fold-icon-wrapper">
                <span
                  ref="guestFoldIcon"
                  class="fold-icon"
                  :style="{ transform: 'rotate(135deg)' }"
                ></span>
              </div>
              <div class="ticket-detail">
                <img :src="bookingDetail.plan.product.image" alt="" />
                <div class="ticket-info">
                  <div class="ticket-title">
                    <div class="link-to-product" @click="windowOpen">
                      {{ bookingDetail.plan.product.title }}
                    </div>
                    {{ bookingDetail.plan.planOption[0].title }}
                  </div>

                  <div class="ticket-info-list">
                    <span>
                      <i class="icon-calendar" aria-hidden="true"></i>
                      {{ bookingDetail.date }}
                    </span>
                    <span v-if="bookingDetail.time">
                      <i class="icon-clock"></i>
                      {{ bookingDetail.time }}
                    </span>
                    <span v-for="(type, index) in type" :key="index">
                      <i class="icon-people"></i>
                      {{ type.name }} x {{ type.quantity }}
                    </span>
                  </div>
                </div>
              </div>
              <i
                v-if="checkGuest"
                class="fas fa-check-circle check-form-icon"
              ></i>
            </div>
          </button>

          <form
            class="form-content"
            ref="guestForm"
            :style="{ display: 'block' }"
            @submit.prevent.stop="checkGuestForm"
          >
            <div class="guest-form">
              <div class="guest-form-title">
                旅客代表人 <span @click="cleanPassenger">清空</span>
              </div>
              <div class="form-item">
                <label for="" class="required-label">本國名</label>
                <input
                  type="text"
                  placeholder="例：小明"
                  v-model="passengerFirstName"
                  required
                />
              </div>

              <div class="form-item">
                <label for="" class="required-label">本國姓</label>
                <input
                  type="text"
                  placeholder="例：陳"
                  v-model="passengerLastName"
                  required
                />
              </div>

              <div class="form-item">
                <label for="gender">性別</label>
                <div class="select-wrapper">
                  <select
                    name="gender"
                    id="gender"
                    v-model="orderDetail.gender"
                  >
                    <option value="" disabled selected>請選擇</option>
                    <option value="female">女性</option>
                    <option value="male">男性</option>
                  </select>
                </div>
              </div>

              <!-- <div class="form-item">
              <label for="dateOfBirth" class="required-label">出生日期</label>

              <datepicker
                placeholder="請選擇"
                class="date-of-birth"
                v-model="vmodelexample"
              ></datepicker>
            </div> -->
            </div>

            <div class="form-sub-title">訂單備註 <span>(備註事項)</span></div>
            <textarea
              name="reminder"
              id="reminder"
              cols="30"
              rows="10"
              v-model="orderDetail.reminder"
            ></textarea>

            <div class="form-sub-title">使用折扣</div>
            <div class="coupon-option">
              <input type="radio" name="coupon" id="noCoupon" />
              <label for="noCoupon" @click="hideCouponInput">不使用</label>
            </div>
            <hr />
            <div class="coupon-option">
              <input type="radio" name="coupon" id="useCoupon" />
              <label for="useCoupon" @click="displayCouponInput"
                >我有折扣券</label
              >
            </div>

            <div
              class="coupon-input"
              ref="couponInput"
              :style="{ display: 'none' }"
            >
              <input
                type="text"
                id="coupon-number"
                class="coupon-number"
                placeholder="請輸入折扣券代碼"
                v-model="coupon"
              />
              <label
                for="coupon-number"
                ref="discountTip"
                :style="{ color: 'red' }"
              >
                {{ discountTip }}
              </label>
              <div class="coupon-btn" @click="checkCoupon">
                使用折扣代碼
              </div>
            </div>

            <button class="continue-btn">繼續</button>
          </form>
        </div>

        <!--付款-->
        <div class="booking-sub-title">付款</div>
        <div class="booking-block booking-pay" id="payContent">
          <button @click="toggleDisplay" class="block-top">
            <div class="stop-event d-flex">
              <div class="fold-icon-wrapper">
                <span
                  ref="payFoldIcon"
                  class="fold-icon"
                  :style="{ transform: 'rotate(-45deg)' }"
                ></span>
              </div>
              請選擇付款方式
            </div>
          </button>

          <form class="form-content" ref="payForm" :style="{ display: 'none' }">
            <div class="pay-content">
              <div class="pay-option">
                <input
                  type="radio"
                  name="payOption"
                  id="linePay"
                  value="linePay"
                  v-model="payWay"
                />
                <label for="linePay">LINE PAY</label>
              </div>
              <hr />
              <div class="pay-option">
                <input
                  type="radio"
                  name="payOption"
                  id="creditCard"
                  value="creditCard"
                  v-model="payWay"
                />
                <label for="creditCard">信用卡</label>
              </div>
            </div>
            <p class="caption-tag">
              &#x24D8;
              請注意本平台不會向您收取任何平台交易手續費，但你下單時使用的信用卡或第三方支付平台可能會向您收取相關手續費，請參考其相關服務政策和規定，並向你所選的交易服務商取得更多資訊。
            </p>
          </form>
        </div>

        <!--付款明細-->
        <div class="booking-block bill-content" id="payContent">
          <button @click="toggleDisplay" class="block-top">
            <div class="stop-event d-flex">
              <div class="fold-icon-wrapper">
                <span
                  class="fold-icon"
                  :style="{ transform: 'rotate(135deg)' }"
                ></span>
              </div>
              付款明細
            </div>
          </button>

          <div class="pay-detail-content">
            <div class="ticket-detail pay-ticket-detail">
              <img :src="bookingDetail.plan.product.image" alt="" />
              <div class="bill-info">
                <div class="ticket-title">
                  <div class="link-to-product" @click="windowOpen">
                    {{ bookingDetail.plan.product.title }}
                  </div>
                  {{ bookingDetail.plan.planOption[0].title }}

                  <!---結帳明細--->
                  <div class="bill-detail">
                    <div class="ticket-info-list">
                      <span>
                        <i class="icon-calendar" aria-hidden="true"></i>
                        {{ bookingDetail.date }}
                      </span>
                      <span v-if="bookingDetail.time">
                        <i class="icon-clock"></i>{{ bookingDetail.time }}
                      </span>
                    </div>

                    <div class="bill-deatil-people">
                      <div
                        v-for="(type, index) in type"
                        :key="index"
                        class="item"
                      >
                        {{ type.name }} x {{ type.quantity }}
                        <span> TWD {{ type.price * type.quantity }}</span>
                      </div>
                    </div>

                    <div class="bill-total">
                      總金額 <span>{{ bookingDetail.totalPrice }}</span>
                    </div>

                    <div class="bill-discount" v-if="discount !== 0">
                      折扣 <span> - {{ discount }}</span>
                    </div>
                  </div>
                  <!------------->
                </div>
              </div>
            </div>

            <!-- <span v-for="(type, index) in type" :key="index">
                  {{ type.name }} x {{ type.quantity }}
                </span> -->
            <div class="total-price">
              支付金額<span> TWD {{ orderDetail.billPrice }}</span>
            </div>
          </div>
        </div>

        <div class="booking-block d-flex justify-end">
          <transition name="slide-fade">
            <v-alert
              v-if="alert"
              type="error"
              outlined
              color="red lighten-2"
              class="alert"
            >
              {{ alert }}
            </v-alert>
          </transition>
          <button class="pay-btn" @click="checkout">確認付款</button>
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
// import Datepicker from 'vuejs-datepicker';
import { mapState } from 'vuex'
import Spinner from '../components/Spinner'

const couponNumber = [['GOTRIP2020', 500], ['HELLO2WORLD', 150]]
const fold = 'rotate(-45deg)'
const unfold = 'rotate(135deg)'

export default {
  name: 'booking',
  components: { Spinner },
  data() {
    return {
      type: [],
      bookingDetail: {},
      orderDetail: {
        fullName: '',
        contactNumber: '',
        email: '',
        mainPassenger: '',
        dateOfBirth: '',
        gender: '',
        reminder: '',
        billPrice: 0
      },
      firstName: '',
      lastName: '',
      passengerFirstName: '',
      passengerLastName: '',
      coupon: '',
      discount: 0,
      discountTip: '',
      payWay: '',
      checkUser: false,
      checkGuest: false,
      alert: '',
    }
  },
  created() {
    this.bookingDetail = JSON.parse(localStorage.getItem('booking'))
    this.orderDetail.billPrice = this.bookingDetail.totalPrice
    this.orderDetail.email = this.$store.state.user.email
    this.type = this.bookingDetail.type.filter(i => i.quantity !== 0) //取出有選購的票種與數量
  },
  watch: {
    step: {
      handler(val) {
        if (val === 2) {
          this.$refs.step1.style.color = '#AAA'
          this.$refs.step1.style.fontWeight = 350
          this.$refs.step2.style.color = '#000'
          this.$refs.step2.style.fontWeight = 900
        } else {
          this.$refs.step2.style.color = '#AAA'
          this.$refs.step2.style.fontWeight = 350
          this.$refs.step1.style.color = '#000'
          this.$refs.step1.style.fontWeight = 900
        }
      }
    },
    fullName(val) {
      this.orderDetail.fullName = val
    },
    passengerName(val) {
      this.orderDetail.mainPassenger = val
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'isLoading']),
    fullName() {
      return this.lastName + ' ' + this.firstName
    },
    passengerName() {
      return this.passengerLastName + ' ' + this.passengerFirstName
    }
  },
  methods: {
    toggleDisplay(e) {
      if (e.target.classList.value === 'link-to-product') return

      let content = e.target.nextElementSibling
      let foldIcon = e.target.children[0].children[0].children[0]
      content.style.display === 'block' ? content.style.display = 'none' : content.style.display = "block"
      foldIcon.style.transform === unfold ? foldIcon.style.transform = fold : foldIcon.style.transform = unfold
    },
    windowOpen() {
      const id = this.bookingDetail.plan.product.id
      let route = this.$router.resolve({ path: `/products/${id}` })
      window.open(route.href, '_blank')
    },
    checkUserForm(valid) {
      if (valid) {
        this.$refs.userForm.style.display = 'none'
        this.$refs.userFoldIcon.style.transform = fold
        this.checkUser = true
        if (!this.checkGuest) {
          this.$refs.guestForm.style.display = 'block'
          this.$refs.guestFoldIcon.style.transform = unfold
        }
      }
    },
    checkGuestForm(valid) {
      if (valid) {
        this.$refs.guestForm.style.display = 'none'
        this.$refs.guestFoldIcon.style.transform = fold
        this.$refs.payForm.style.display = 'block'
        this.$refs.payFoldIcon.style.transform = unfold
        this.checkGuest = true
        window.scroll({ top: 100, behavior: 'smooth' })
      }
    },
    cleanPassenger() {
      this.passengerFirstName = ''
      this.passengerLastName = ''
      this.orderDetail.gender = ''
    },
    displayCouponInput() {
      this.$refs.couponInput.style.display = 'block'
    },
    hideCouponInput() {
      this.$refs.couponInput.style.display = 'none'
      this.discount = 0
      this.coupon = ''
      this.discountTip = ''
      this.orderDetail.billPrice = this.bookingDetail.totalPrice
    },
    checkCoupon() {
      let val = this.coupon.toUpperCase()
      let arr = []
      couponNumber.forEach(i => arr.push(i[0]))
      let valid = arr.includes(val)

      if (valid) {
        couponNumber.forEach(i => {
          if (i[0] === val) return this.discount = i[1]
        })

        if (this.discount >= this.bookingDetail.totalPrice) {
          this.orderDetail.billPrice = 0
        } else {
          this.orderDetail.billPrice -= this.discount
        }

        this.$refs.discountTip.style.color = 'green'
        this.discountTip = ` 折扣 ${this.discount} 元`
      } else {
        this.discountTip = '折扣碼錯誤'
        this.$refs.discountTip.style.color = 'red'
        this.discount = 0
        this.coupon = ''
        this.orderDetail.billPrice = this.bookingDetail.totalPrice
      }
    },
    checkout(e) {
      const { fullName, contactNumber, email, mainPassenger } = this.orderDetail
      if (!fullName || !contactNumber || !email || !mainPassenger) {
        this.alert = '請填寫必填欄位'
        return setTimeout(() => { this.alert = null }, 3000)
      }

      if (this.payWay !== 'linePay' && this.payWay !== 'creditCard') {
        this.alert = '請選擇付款方式'
        return setTimeout(() => { this.alert = null }, 3000)
      }

      this.orderDetail.bookingDetail = this.bookingDetail

      //TODO:金流api
      this.$store.state.isLoading = true

      localStorage.setItem('orderList', JSON.stringify(this.orderDetail))

      //模擬loading
      setTimeout(() => {
        this.$store.state.isLoading = false
        this.$router.push('/booking/step2')
      }, 3500)

      // this.$router.push('/booking/step2')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/booking.scss';
</style>