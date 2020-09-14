<template>
  <div class="booking-container-wrapper">
    <!-- <div v-if="isAuthenticated"> -->

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

      <div class="booking-form-block booking-user my-5">
        <button @click="toggleDisplay" class="block-top">
          <div><span class="fold-icon"></span> 訂購人資料</div>
        </button>
        <form
          class="form-content"
          ref="userContent"
          :style="{ display: 'block' }"
          @submit.prevent.stop="checkForm"
        >
          <div class="form-item">
            <label for="" class="required-label">名字</label>
            <input type="text" placeholder="例：小明" required />
          </div>

          <div class="form-item">
            <label for="" class="required-label">姓氏</label>
            <input type="text" placeholder="例：陳" required />
          </div>

          <div class="form-item">
            <label for="" class="required-label">國家/地區</label>
            <!-- <input type="text" /> -->
            <select name="" id="">
              <option value="taiwan">台灣</option>
              <option value="taiwan">台灣</option>

              <option value="taiwan">台灣</option>
            </select>
          </div>

          <div class="form-item">
            <label for="" class="required-label">聯絡電話</label>
            <input type="text" placeholder="請輸入聯絡電話" required />
          </div>

          <div class="form-item">
            <label for="" class="required-label">電子郵件信箱</label>
            <input
              type="text"
              placeholder="請輸入常用電子郵件信箱"
              :value="user.email"
              required
            />
          </div>

          <button class="continue-btn">繼續</button>
        </form>
      </div>

      <div class="booking-form-block booking-guest my-5">
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

        <div
          class="form-content"
          ref="userContent"
          :style="{ display: 'block' }"
        >
          <label for="">名字</label>
          <input type="text" />
        </div>
      </div>
      總金額 {{ bookingDetail.totalPrice }}
    </div>

    <!-- </div> -->

    <!-- <div v-else>
        請先登入
      </div> -->
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
      step: 1
    }
  },
  created() {

    this.bookingDetail = JSON.parse(localStorage.getItem('booking'))
    this.type = this.bookingDetail.type.filter(i => i.quantity !== 0)

    console.log(this.bookingDetail)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

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

.booking-form-block {
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

    .continue-btn {
      margin-top: 30px;
      font-size: 0.9rem;
      background-color: $main-blue;
      color: #fff;
      border-radius: 4px;
      padding: 8px 20px;
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