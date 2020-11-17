<template>
  <div class="product-option-plan" id="planOption">
    <div class="product-plan-title">
      選擇方案
    </div>
    <div class="plan-content" v-for="plan in plan.planOption" :key="plan.id">
      <div class="plan-title">
        <div class="d-flex justify-center">
          {{ plan.title }}
          <!-- <span class="title-label">{{ plan.product.policy.refund }}</span> -->
        </div>
        <div class="price">
          {{ currentCurrency }} {{ (plan.price / exchangeRate) | exchange }}
        </div>
      </div>
      <ul class="ticket-type">
        <li>學生票：限12歲以上持有學生證之學生適用</li>
        <li>
          長者票（博愛票）：限持有身心障礙證明者與1位陪同者、孕婦、滿65歲以上長者適用（身障者和陪同者各需一張票）
        </li>
        <li>成人票：限18歲以上</li>
        <li>兒童票：限4-11歲</li>
      </ul>
      <hr />
      <div class="benifit-bar">
        <span>關於此方案</span>
        <div class="row">
          <div><i class="fa fa-flash flash-icon main-color"></i> 立即確認</div>
          <div><i class="icon-paper-plane"></i> 立即發送憑證</div>
        </div>
      </div>
      <div class="plan-subtitle">
        選擇日期、選項
        <button class="redo" @click="resetOption">
          <i class="fas fa-redo-alt"></i> 全部重選
        </button>
      </div>
      <div class="booking-content">
        <!--選擇日期-->
        <div class="date-option">
          <span class="caption-tag">請選擇使用日期</span>
          <template>
            <div class="calendar">
              <datepicker
                ref="planDatepicker"
                :inline="true"
                :language="zh"
                :disabled-dates="disabledDates"
                v-model="bookingDetail.date"
              ></datepicker>
            </div>
          </template>

          <span class="caption-tag"> &#x24D8; 價格以 TWD 顯示 </span>
        </div>

        <!--選擇時間場次-->
        <div v-if="plan.ticketTime" class="time-option">
          <span class="caption-tag">場次</span>
          <div class="time-option-radio">
            <div v-for="(time, index) in plan.ticketTime" :key="index">
              <input
                type="radio"
                :id="time"
                name="time"
                :value="time"
                v-model="bookingDetail.time"
              />
              <label :for="time" class="radio-label">{{ time }}</label>
            </div>
          </div>
        </div>

        <!--選擇票種與數量-->
        <div class="types-option" v-if="bookingDetail.type.length !== 0">
          <span class="caption-tag">選擇數量</span>
          <div class="types-option-quantity">
            <div
              v-for="(type, index) in plan.ticketTypes"
              :key="index"
              class="type-item"
            >
              <div class="type-name">
                {{ type.name }}<span>{{ type.limit }}</span>
              </div>

              <div class="type-count d-flex align-center">
                <span
                  >{{ currentCurrency }}
                  {{ (type.price / exchangeRate) | exchange }} / 每人</span
                >
                <div class="counter">
                  <button
                    class="minus-btn"
                    :disabled="bookingDetail.type[index].quantity === 0"
                    @click="counterMinus(type.price / exchangeRate, index)"
                  ></button>
                  {{ bookingDetail.type[index].quantity }}
                  <button
                    class="plus-btn"
                    @click="counterPlus(type.price / exchangeRate, index)"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--確認結帳-->
        <div class="total-booking">
          <div class="total-price">
            <span>總金額</span> {{ currentCurrency }}
            {{ bookingDetail.totalPrice }}
          </div>
          <div>
            <button class="cart-btn" disabled>加入購物車</button>
            <button class="booking-btn" @click="bookingNow(plan.title)">
              立即訂購
            </button>
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Datepicker from 'vuejs-datepicker'
import { zh, en } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'
import { currency } from './../utils/mixins'
import { round, evaluate } from 'mathjs'
import { mapState } from 'vuex'

var dateTime = new Date()
var state = {
  disabledDates: {
    to: new Date(dateTime.setDate(dateTime.getDate() + 1))
  }
}

export default {
  name: 'ProductOptionPlan',
  components: { Datepicker },
  mixins: [currency],
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedDate: '',
      disabledDates: {},
      zh: zh,
      en: en,
      bookingDetail: {
        date: '',
        time: '',
        type: [],
        totalPrice: 0,
        currency: 'TWD',
        exchangeRate: 1
      },
      alert: null,
      typeTemp: []
    }
  },
  created() {
    this.disabledDates = state.disabledDates
    this.getTicketType
  },
  watch: {
    plan: {
      handler() {
        this.getTicketType
      },
      deep: true
    },
    currentCurrency(newValue) {
      this.bookingDetail = {
        date: '',
        time: '',
        type: [],
        totalPrice: 0,
        currency: newValue,
        exchangeRate: this.$store.state.exchangeRate
      }
      this.getTicketType
    }
  },
  computed: {
    ...mapState(['isAuthenticated']),
    getTicketType() {
      let typeTemp = []
      this.plan.planOption[0].ticketTypes.forEach((item, index) => {
        return typeTemp.push({ index, name: item.name, quantity: 0, price: item.price })
      })
      this.bookingDetail.type = typeTemp.map(i => ({
        ...i,
        price: Math.round((i.price / this.$store.state.exchangeRate) * 100) / 100
      }))

      this.typeTemp = typeTemp
    }
  },
  methods: {
    counterPlus(price, index) {
      price = round(price, 2)
      let type = this.bookingDetail.type
      type[index].quantity += 1
      this.bookingDetail.totalPrice += Number(price)
      this.bookingDetail.totalPrice = round(this.bookingDetail.totalPrice, 2)
    },
    counterMinus(price, index) {
      price = round(price, 2)
      let type = this.bookingDetail.type
      if (type[index].quantity > 0) {
        type[index].quantity -= 1
        this.bookingDetail.totalPrice -= Number(price)
        this.bookingDetail.totalPrice = round(this.bookingDetail.totalPrice, 2)
      } else {
        return
      }
    },
    bookingNow(plan) {
      if (!this.isAuthenticated) {
        this.$EventBus.$emit('openSignForm', true)
        return
      }

      const { date, time, totalPrice } = this.bookingDetail

      if (!date || !totalPrice) {
        this.alert = '請選擇欄位'
        return setTimeout(() => { this.alert = null }, 3000)
      }

      if (this.plan.planOption.ticketTime && !time) {
        this.alert = '請選擇欄位'
        return setTimeout(() => { this.alert = null }, 3000)
      }

      let bookingData = {
        ...this.bookingDetail,
        date: moment(date).format('YYYY-MM-DD'),
        plan: this.plan,
        currency: this.$store.state.currentCurrency,
        exchangeRate: this.$store.state.exchangeRate,
      }

      localStorage.setItem('booking', JSON.stringify(bookingData))
      this.$router.push('/booking/step1')
    },
    resetOption() {
      this.bookingDetail = {
        ...this.bookingDetail,
        date: '',
        time: '',
        type: this.typeTemp.map(i => ({ ...i })),
        totalPrice: 0,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/product-plan.scss';
</style>
