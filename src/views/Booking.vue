<template>
  <div class="booking-container-wrapper">
    <div v-if="isAuthenticated">
      <div class="booking-container">
        <div class="booking-title">
          <div
            class="step-pay"
            ref="step1"
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
            ref="step2"
            :style="{
              color: '#AAA',
              fontWeight: 350
            }"
          >
            付款完成
          </div>
        </div>

        <!--訂購人資料-->
        <div class="booking-form-block booking-user">
          <button @click="toggleDisplay" class="block-top">
            <div><span class="fold-icon"></span> 訂購人資料</div>
          </button>

          <form
            class="form-content"
            ref="userForm"
            :style="{ display: 'block' }"
            @submit.prevent.stop="checkForm"
          >
            <div class="form-item">
              <label for="" class="required-label">名字</label>
              <input
                type="text"
                placeholder="例：小明"
                v-model="orderDetail.firstName"
                required
              />
            </div>

            <div class="form-item">
              <label for="" class="required-label">姓氏</label>
              <input
                type="text"
                placeholder="例：陳"
                v-model="orderDetail.lastName"
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
        <div class="step-title">旅客資料</div>
        <div class="booking-form-block booking-guest" id="guestContent">
          <button @click="toggleDisplay" class="block-top">
            <div class="d-flex">
              <span class="fold-icon"></span>
              <div class="ticket-detail">
                <img :src="bookingDetail.image" alt="" />
                <div class="ticket-info">
                  <div class="ticket-title">
                    <div @click="windowOpen">
                      {{ bookingDetail.title }}
                    </div>
                    {{ bookingDetail.plan }}
                  </div>
                  <span>
                    {{ bookingDetail.date }}
                  </span>
                  <span>{{ bookingDetail.time }} </span>

                  <span v-for="(type, index) in type" :key="index">
                    {{ type.name }} x {{ type.quantity }}
                  </span>
                </div>
              </div>
            </div>
          </button>

          <form
            class="form-content"
            ref="guestForm"
            :style="{ display: 'block' }"
          >
            <div class="guest-form">
              <div class="sub-title">旅客代表人 <button>清空</button></div>
              <div class="form-item">
                <label for="" class="required-label">本國名</label>
                <input
                  type="text"
                  placeholder="例：小明"
                  v-model="orderDetail.firstName"
                  required
                />
              </div>

              <div class="form-item">
                <label for="" class="required-label">本國姓</label>
                <input
                  type="text"
                  placeholder="例：陳"
                  v-model="orderDetail.lastName"
                  required
                />
              </div>

              <div class="form-item">
                <label for="gender">性別</label>
                <div class="select-wrapper">
                  <select name="gender" id="gender">
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

            <div class="form-title">訂單備註 <span>(備註事項)</span></div>
            <textarea name="" id="" cols="30" rows="10"></textarea>

            <div class="form-title">使用折扣</div>
            <div class="coupon-option">
              <input type="radio" name="coupon" id="noCoupon" />
              <label for="noCoupon">不使用</label>
            </div>
            <hr />
            <div class="coupon-option">
              <input type="radio" name="coupon" id="useCoupon" />
              <label for="coupon">我有折扣券</label>
            </div>

            <div class="coupon-enter">
              <input
                type="text"
                id="coupon-number"
                class="coupon-number"
                placeholder="請輸入折扣券代碼"
              />
              <button class="coupon-btn">使用折扣代碼</button>
            </div>

            <button class="continue-btn">繼續</button>
          </form>
        </div>

        <!--付款-->
        <div class="step-title">付款</div>
        <div class="booking-form-block booking-pay" id="payContent">
          <button @click="toggleDisplay" class="block-top">
            <div><span class="fold-icon"></span> 請選擇付款方式</div>
          </button>

          <form class="form-content" ref="payForm" :style="{ display: 'none' }">
            <div class="pay-content">
              <div class="pay-option">
                <input type="radio" name="payOption" id="linePay" />
                <label for="linePay">LINE PAY</label>
              </div>
              <hr />
              <div class="pay-option">
                <input type="radio" name="payOption" id="creditCard" />
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
        <div class="booking-form-block pay-detail" id="payContent">
          <button @click="toggleDisplay" class="block-top">
            <div><span class="fold-icon"></span> 付款明細</div>
          </button>

          <div class="pay-detail-content"></div>
        </div>

        <div class="booking-form-block ">
          TWD {{ bookingDetail.totalPrice }}
          <button class="continue-btn">確認付款</button>
        </div>
      </div>
    </div>

    <div v-else>
      請先登入
    </div>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker';
import { mapState } from 'vuex'

export default {
  name: 'booking',
  // components: { Datepicker },
  data() {
    return {
      bookingDetail: {},
      orderDetail: {
        lastName: '',
        firstName: '',
        contactNumber: '',
        email: '',
        mainPassenger: '',
        mainPassengerName: '',
        dateOfBirth: '',
        gender: ''
      },
      type: [],
      step: 1
    }
  },
  created() {
    this.bookingDetail = JSON.parse(localStorage.getItem('booking'))
    this.type = this.bookingDetail.type.filter(i => i.quantity !== 0)
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
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  },
  methods: {
    toggleDisplay(e) {
      let content = e.target.parentElement.nextElementSibling
      if (content.style.display === 'block') {
        content.style.display = 'none'
      } else {
        content.style.display = "block"
      }
    },
    windowOpen() {
      //另開新視窗
    },
    checkForm(valid) {
      if (valid) {
        this.$refs.guestContent.style.display = 'block'
        window.scroll({ top: 600, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

.date-of-birth {
  width: 100%;
  padding-left: 10px;
}

.booking-container-wrapper {
  min-height: 60vh;
  padding: 15px;
  background-color: $border-gray;
  display: flex;
  justify-content: center;
}

.booking-container {
  width: 100%;
}

.booking-title {
  display: flex;
  color: $second-gray;
  font-size: 0.9rem;
}

.step-title {
  margin-bottom: -15px;
  font-size: 1.1rem;
  color: $main-gray;
  margin-top: 30px;
}

.continue-btn {
  margin-top: 30px;
  font-size: 0.9rem;
  background-color: $main-blue;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
}

.booking-form-block {
  margin: 25px 0;
  background-color: #fff;
  border-radius: 6px;
  padding: 15px;

  .block-top {
    text-align: left;
    font-size: 1.1rem;
    font-weight: 900;
    margin-bottom: 15px;

    .fold-icon {
      pointer-events: none;

      &::after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-top: 2px solid $main-black;
        border-right: 2px solid $main-black;
        transform: rotate(-45deg);
        // transform: rotate(135deg);
        margin-right: 15px;
      }
    }
  }

  .form-content {
    border-top: 1px solid $border-gray;
    display: flex;
    flex-direction: column;

    .form-item {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        font-size: 0.85rem;
        margin: 20px 0 5px 0;
        color: $main-gray;
      }

      .required-label::after {
        position: relative;
        content: '*';
        color: $pink;
        top: -2px;
        left: 2px;
      }

      input,
      select {
        border: 1px solid $border-gray;
        height: 45px;
        padding-left: 10px;

        &:focus {
          border: 1px solid $main-blue;
        }
      }
    }

    .guest-form {
      margin: 30px 0 50px 0;
      padding: 15px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;

      .sub-title {
        display: flex;
        justify-content: space-between;
        font-weight: 900;
        margin-bottom: 15px;

        button {
          color: $main-blue;
          font-size: 0.9rem;
        }
      }
    }

    .form-title {
      font-size: 1.1rem;
      font-weight: 900;
      position: relative;
      margin: 0 0 15px 15px;

      span {
        font-size: 0.75rem;
        color: $main-gray;
      }

      &::after {
        content: '';
        height: 24px;
        width: 4px;
        border-radius: 3px;
        background-color: $main-black;
        position: absolute;
        left: -15px;
        top: 1px;
      }
    }

    textarea {
      border: 1px solid $border-gray;
      resize: none;
      border-radius: 6px;
      width: 350px;
      height: 100px;
      margin-bottom: 50px;
    }

    .coupon-option,
    .coupon-enter,
    .pay-option {
      display: flex;
      align-items: center;

      label {
        margin: 15px 0;
        padding-left: 15px;
        position: relative;
        font-size: 0.9rem;
      }

      input[type='radio'] {
        width: 15px;
      }
    }

    .coupon-enter {
      margin: 15px 0;

      .coupon-number {
        width: 200px;
      }

      .coupon-btn {
        color: $main-blue;
        font-size: 0.9rem;
        border: 1px solid $main-blue;
        border-radius: 4px;
        height: 45px;
        padding: 5px 15px;
        margin-left: 5px;
      }
    }

    .pay-content {
      margin: 15px 0;
    }
  }
}

.ticket-detail {
  display: flex;
  pointer-events: none;
  height: 80px;
  font-size: 1rem;
  font-weight: normal;

  img {
    height: 55px;
    width: 85px;
    object-fit: cover;
    border-radius: 6px;
    background-color: rgb(233, 230, 227);
    margin-right: 15px;
  }

  .ticket-title {
    display: block;
    font-weight: 700;
  }
}

@media screen and(min-width: 768px) {
  .booking-container {
    width: 700px;
  }
}

@media screen and(min-width: 996px) {
}
</style>