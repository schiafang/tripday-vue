<template>
  <div class="product-option-plan">
    <div class="product-plan-title">
      選擇方案
    </div>
    <div class="plan-content">
      <div class="plan-title">
        <div class="d-flex justify-center">
          Xpark 入園門票 <span class="title-label">6天前可免費取消</span>
        </div>
        <div class="price">TWD 550</div>
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
          <div>6天前可免費取消</div>
          <div>立即確認</div>
          <div>立即發送憑證</div>
        </div>
      </div>

      <div class="date-option">
        <div class="plan-title">
          選擇日期、選項
          <button class="redo"><i class="fas fa-redo-alt"></i> 全部重選</button>
        </div>
        <span class="caption-tag">請選擇使用日期</span>
        <Calendar @selectedDate="selectedDate" />
        <span class="caption-tag"> &#x24D8; 價格以 TWD 顯示 </span>
      </div>

      <div class="time-option">
        <span class="caption-span">場次</span>
        <div class="time-option-radio">
          <div>
            <input
              type="radio"
              id="ten"
              name="time"
              value="10:00"
              @change="selecteTime"
              v-model="bookingDetail.time"
              checked
            />
            <label for="ten" class="radio-label">10:00</label>
          </div>
          <div>
            <input
              type="radio"
              id="eleven"
              name="time"
              value="11:00"
              v-model="bookingDetail.time"
            />
            <label for="eleven" class="radio-label">11:00</label>
          </div>
          <div>
            <input
              type="radio"
              id="twenty"
              name="time"
              value="12:00"
              v-model="bookingDetail.time"
            />
            <label for="twenty" class="radio-label">12:00</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './Calendar'

export default {
  name: 'ProductOptionPlan',
  components: { Calendar },
  data() {
    return {
      bookingDetail: {
        date: '',
        time: ''
      }
    }
  },
  methods: {
    selectedDate(date) {
      this.bookingDetail.date = date
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/product-plan.scss';
</style>