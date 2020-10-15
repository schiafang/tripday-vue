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
  metaInfo() {
    return {
      title: this.title,
    }
  },
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
      title: '',
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
        this.title = `tripday - ${this.product.title}`

        //fetch google map place ID
        const googlePlace = await placeDetailAPI.getPlaceID(this.product.placeTitle)
        const placeID = googlePlace.data.candidates[0].place_id

        //fetch place detail 
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
        this.product.review.push(this.reviews[0])

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
@import '../assets/scss/product-detail.scss';
</style>