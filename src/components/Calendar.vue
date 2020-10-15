<template>
  <div class="calendar">
    <datepicker
      :inline="true"
      :language="zh"
      :disabled-dates="disabledDates"
      @selected="selecteDate"
      ref="planDatepicker"
    ></datepicker>

    <button @click="resetOption">clear</button>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { zh, en } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'

var state = {
  date: new Date(),
  disabledDates: {
    to: new Date()
  }
}

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      selectedDate: '',
      // date: {},
      disabledDates: {},
      zh: zh,
      en: en,
      date: ''
    }
  },
  created() {
    this.date = state.date
    this.disabledDates = state.disabledDates
  },
  methods: {
    selecteDate(date) {
      date = moment(date).format('YYYY-MM-DD')
      this.selectedDate = date
      this.$emit('selectedDate', this.selectedDate)
    },
    resetOption() {
      this.$refs.planDatepicker.clearDate()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/calendar.scss';
</style>