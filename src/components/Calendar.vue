<template>
  <div class="calendar">
    <datepicker
      :inline="true"
      :language="zh"
      :disabled-dates="disabledDates"
      @selected="selecteDate"
      ref="planDatepicker"
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
  font-weight: 600;

  header {
    height: 50px !important;
    line-height: 50px !important;

    .prev,
    .next {
      &.disabled:after {
        border-top: 2px solid $light-gray !important;
        border-right: 2px solid $light-gray !important;
      }
    }

    .next:after,
    .prev:after {
      content: '';
      border: none !important;
      display: inline-block;
      width: 13px;
      height: 13px;
    }

    .next:after {
      margin-left: -10px !important;
      border-top: 2px solid $main-blue !important;
      border-right: 2px solid $main-blue !important;
      transform: rotate(45deg) !important;
      -webkit-transform: rotate(45deg);
    }

    .prev:after {
      margin-left: -10px !important;
      border-top: 2px solid $main-blue !important;
      border-right: 2px solid $main-blue !important;
      transform: rotate(-135deg) !important;
      -webkit-transform: rotate(-135deg);
    }

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

  &.day-header {
    font-size: 90% !important;
  }

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
    border: 1px solid transparent !important;
    border-radius: 6px;
  }
}

@media screen and (min-width: 996px) {
  .vdp-datepicker {
    width: 420px;
  }
}

@media screen and (min-width: 1263px) {
  .vdp-datepicker {
    width: 550px;
  }
}
</style>