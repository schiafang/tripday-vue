<template>
  <div class="container">
    <div v-if="Object.keys(product).length !== 0">
      <ProductInfo :product="product" />

      <ProductOptionPlan :plan="plan" v-if="plan.planOption" />

      <div class="product-description" id="product-description">
        <div class="product-description-container">
          <div class="description-block" id="place-block">
            <div class="description-title">
              體驗地點
            </div>

            <div class="description-place">
              <div class="place-title">
                <span> 地點名稱：{{ product.placeTitle }} </span>
                地址：{{ product.address }}
              </div>
              <div class="place-detail">
                <iframe
                  class="google-map-frame"
                  frameborder="0"
                  :src="googleEmbed"
                  allowfullscreen
                >
                </iframe>

                <div class="place-detail-info">
                  <span>如何抵達</span>
                  <p v-for="(transit, index) in product.transit" :key="index">
                    {{ transit }}
                  </p>
                  <p>自行開車（假日車潮眾多易塞車，建議搭乘大眾交通工具前往</p>
                </div>
                <div class="place-detail-info">
                  <span>
                    開放時間
                  </span>
                  <p v-if="openingWeekday.length === 0">全年無休</p>
                  <p
                    v-else
                    v-for="(weekday, index) in openingWeekday"
                    :key="index"
                  >
                    {{ weekday }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="description-block"
            id="reviews-block"
            v-if="reviews.length !== 0"
          >
            <div class="description-title">
              旅客評價

              <div class="rating-info">
                <div class="rating-box">
                  {{ product.rating }}
                </div>

                <div class="rating-star ml-5">
                  <Star :rating="product.rating" />
                  5 則評論
                </div>
              </div>
            </div>
            <div id="description-reviews" v-if="reviews.length !== 0">
              <ProductCommentCard :reviews="reviews" />
            </div>
          </div>
        </div>

        <aside class="sidebar">
          <affix
            class="menu sidebar-menu "
            relative-element-selector="#product-description"
            :offset="{ top: 100, bottom: 0 }"
            :scroll-affix="false"
          >
            <scrollactive :offset="0">
              <a
                href="#place-block"
                class="scrollactive-item"
                onclick="return false"
                >體驗地點</a
              >
              <a href="#reviews-block" class="scrollactive-item">旅客評論</a>
            </scrollactive>
          </affix>
        </aside>
      </div>
    </div>

    <!--in-progress-->
    <div v-else class="in-progress-wrapper">
      <i class="fas fa-hammer"></i> In progress
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ProductInfo from '../components/ProductInfo'
import Star from '../components/Star'
import ProductCommentCard from '../components/ProductCommentCard'
import ProductOptionPlan from '../components/ProductOptionPlan'
import placeDetailAPI from '../apis/placeDetail'
import productAPI from '../apis/product'
import { mapState } from 'vuex'
import { Affix } from 'vue-affix'

export default {
  name: 'ProductDetail',
  components: { ProductInfo, ProductCommentCard, ProductOptionPlan, Star, Affix },
  Props: {
    offset: {
      type: Object,
      default: () => {
        return {
          top: 40,
          bottom: 40
        }
      },
      scrollAffix: {
        type: Boolean,
        default: false
      },
    }
  },
  data() {
    return {
      product: {},
      plan: {
        product: {},
        planOption: []
      },
      googleEmbed: '',
      openingWeekday: [],
      reviews: []
    }
  },
  created() {
    this.fetchProduct()
  },
  computed: {
    ...mapState(['isLoading'])
  },
  methods: {
    async fetchProduct() {
      try {
        this.$store.state.isLoading = true
        const id = Number(this.$route.params.id)
        const res = await productAPI.getProduct(id)
        this.product = res.data
        this.plan.product = this.product
        this.plan.planOption = this.product.planOption

        //取得 google map place ID
        const googlePlace = await placeDetailAPI.getPlaceID(this.product.placeTitle)
        const placeID = googlePlace.data.candidates[0].place_id

        //取得 place detail 
        const placeDetail = await placeDetailAPI.getPlaceDetail(placeID)

        if (placeDetail.data.result.opening_hours) {
          this.openingWeekday = placeDetail.data.result.opening_hours.weekday_text
        }

        this.product.rating = placeDetail.data.result.rating

        this.reviews = placeDetail.data.result.reviews.sort((a, b) => b.time - a.time)

        this.reviews = this.reviews.map(i => ({
          ...i,
          textLength: i.text.length > 50 ? true : false
        }))

        this.product.review = []
        this.product.review.push(this.reviews[0]) //最新一則評論

        let embedQuery = this.product.address || this.product.placeTitle
        this.googleEmbed = `https://www.google.com/maps/embed/v1/place?key=${process.env.VUE_APP_GOOGLEAPI}&q=${embedQuery}`

        this.$store.state.isLoading = false
      } catch {
        this.$store.state.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

.google-map {
  width: 100%;
  height: 400px;
}

.sidebar-menu {
  display: none;
}

.description-block {
  padding-bottom: 90px;
  border-bottom: 1px solid $border-gray;
}

.description-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.description-place {
  border: 1px solid $border-gray;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-content: center;

  .place-title {
    padding: 15px;
    color: $main-gray;
    font-size: 0.9rem;
    border-bottom: 1px solid $border-gray;

    span {
      color: $main-black;
      display: block;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .place-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .google-map-frame {
    width: 100%;
    height: 350px;
    border-radius: 4px;
    margin-bottom: 30px;
  }

  .place-detail-info {
    margin: 15px 0;
    width: 100%;
    display: block;
    font-size: 0.8rem;
    line-height: 0.6rem;

    span {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }
}

.rating-info {
  display: flex;
  align-items: center;
  border-bottom: 2px solid $border-gray;
  padding-bottom: 15px;

  .rating-box {
    @include flexCenter;
    @extend %userBackgroundGradient;
    width: 55px;
    height: 55px;
    border-radius: 4px;
    color: #fff;
    margin: 15px 0;
  }

  .rating-star {
    height: 55px;
    font-size: 0.9rem;
    font-weight: normal;
    color: $main-gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.in-progress-wrapper {
  height: 70vh;
  color: #c26b63;
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  padding-top: 170px;
}

@media screen and (min-width: 996px) {
  .product-description {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
  }

  .product-description-container {
    width: calc(100% - 250px);
    padding-right: 15px;
  }

  .sidebar-menu {
    display: block;
    padding-left: 30px;
    position: relative;
    top: 20px;

    &.affix {
      position: fixed;
      top: 20px;
    }
  }

  .scrollactive-item {
    color: $main-gray;
    display: block;
    padding: 0 15px;
    margin-bottom: 15px;
    border-left: 5px solid transparent;

    &:hover {
      color: $main-blue;
    }

    &.is-active {
      color: $main-blue;
      font-weight: 500;
      border-left: 5px solid $main-blue;
    }
  }
}
</style>