<template>
  <div>
    日期 {{ bookingDetail.date }} 場次 {{ bookingDetail.time }} 總金額
    <hr />
    {{ bookingDetail.totalPrice }}
    <hr />

    {{ type }}
  </div>
</template>

<script>
export default {
  name: 'booking',
  data() {
    return {
      bookingDetail: {},
      type: []
    }
  },
  created() {
    this.bookingDetail = JSON.parse(localStorage.getItem('booking'))
    console.log('booking', this.bookingDetail)
    this.type = this.bookingDetail.type.filter(i => i.quantity !== 0)
  }
}
</script>