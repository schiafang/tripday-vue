<template>
  <div class="calendar">
    <datepicker
      :inline="true"
      :language="zh"
      :disabled-dates="disabledDates"
      @selected="selecteDate"
    ></datepicker>
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
      date: {},
      disabledDates: {},
      zh: zh,
      en: en
    }
  },
  created() {
    this.date = state.date
    this.disabledDates = state.disabledDates
  },
  methods: {
    selecteDate(date) {
      date = moment(date).format('YYYY/MM/DD')
      this.selectedDate = date
      this.$emit('selectedDate', this.selectedDate)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_base.scss';

.calendar {
  margin: 15px 0;
}

.vdp-datepicker {
  border-radius: 6px;
  width: 100%;
  border: 1px solid $border-gray !important;
}

.vdp-datepicker__calendar {
  padding: 10px;
  width: 100% !important;
  border: none !important;

  header {
    height: 50px !important;
    line-height: 50px !important;

    .day__month_btn:hover,
    .prev:hover,
    .next:hover {
      background-color: #fff !important;
    }
  }
}

.vdp-datepicker__calendar .cell {
  height: 70px !important;
  line-height: 70px !important;
  font-weight: 500;
  color: $main-black;
  position: relative;

  &.selected {
    border-radius: 6px !important;
    background-color: $main-blue !important;
    color: #fff !important;

    &::after {
      content: '';
      position: absolute;
      top: 5px;
      right: 5px;
      border-color: #fff #fff transparent transparent;
      border-style: solid;
      border-width: 4px;
    }
  }

  &:hover {
    background-color: $light-gray;
    border: none !important;
    border-radius: 6px;
  }
}

@media screen and (min-width: 996px) {
  .vdp-datepicker {
    width: 550px;
  }
}
</style>