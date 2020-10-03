import { mapState } from 'vuex'

export const productSlide = {
  data() {
    return {
      slickSettings: {}
    }
  },
  created() {
    this.setSlickSetting()
  },
  methods: {
    setSlickSetting() {
      this.slickSettings = {
        infinite: false,
        arrows: true,
        focusOnSelect: true,
        slidesToShow: 5,
        touchThreshold: 5,
        speed: 700,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 1350,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            }
          },
        ]
      }
    }
  }
}

export const currency = {
  computed: {
    ...mapState(['exchangeRate', 'currentCurrency'])
  },
  filters: {
    exchange(value) {
      return Math.round(value * 100) / 100
    }
  }
}

export const orderCount = {
  filters: {
    orderCount(value) {
      if (value >= 1000) {
        let num = Math.floor(value / 1000)
        return `${num}K+`
      } else {
        return value
      }
    }
  }
}