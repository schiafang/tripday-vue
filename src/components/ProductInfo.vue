<template>
  <div class="product-info">
    <div class="product-location">
      {{ product.location.country }} > {{ product.location.city }}
    </div>
    <div class="product-cover">
      <img :src="product.cover || product.image" alt="" />
    </div>
    <div class="product-content">
      <div class="product-title">
        {{ product.title }}

        <i
          class="far fa-heart add-favorite"
          @click="addFavorite(product.id)"
        ></i>
        <i ref="breakHeart" class="fas fa-heart remove-favorite"></i>
        <div
          class="sign-tip"
          ref="signTip"
          :style="{
            opacity: 0,
            transition: 'opacity .2s ease-in-out'
          }"
        ></div>
      </div>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i> {{ product.location.country }} -
        {{ product.location.city }}
      </div>
      <div class="policy">
        <div><i class="icon-refresh"></i> 6天前可免費取消</div>
        <div><i class="icon-screen-smartphone"></i> 現場請出示 QR code</div>
      </div>
      <div class="description">
        <div class="introduction">
          {{ product.description.introduction }}
        </div>
        <ul class="hightlights">
          <li
            v-for="(hightlight, index) in product.description.highlights"
            :key="index"
          >
            {{ hightlight }}
          </li>
        </ul>
      </div>
    </div>
    <div class="product-comment">
      <div class="top">
        <h3>旅客評價</h3>
        <div class="more" @click="scrollToComments">
          更多評價 <i class="fas fa-angle-right"></i>
        </div>
      </div>
      <ProductCommentCard :reviews="product.review" />
    </div>

    <!--選購欄--->
    <div class="product-booking-col">
      <div class="booking-card" @click="scrollToPlanOption">
        <div class="price">
          <div class="price-now">
            TWD 500
          </div>
          <div class="original">
            TWD 600
          </div>
        </div>
        <div class="score">
          <span>{{ product.rating }} </span><star />
          (8063) | 已售出 18k +
        </div>
        <button class="plan-btn btn">
          選擇方案
        </button>
        <div class="bottom">
          <i class="fa fa-flash title-flash main-color"></i> 立即確認
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCommentCard from '../components/ProductCommentCard'
import star from '../components/star'
import { mapState } from 'vuex'

export default {
  name: 'ProductInfo',
  components: { ProductCommentCard, star },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    scrollToComments() {
      // const height = document.querySelector("#productComents").offsetParent
      document.querySelector("#productComents").scrollIntoView(true)
      // this.$refs.productComents.$el.scrollIntoView(true)
      // window.scrollBy(0, height)
    },
    scrollToPlanOption() {
      document.querySelector("#planOption").scrollIntoView(true)
    },
    addFavorite(id) {
      console.log(id)
      if (!this.isAuthenticated) {
        this.$refs.signTip.style.opacity = 1
        setTimeout(() => { this.$refs.signTip.style.opacity = 0 }, 1500)
        return
      }

      this.$refs.breakHeart.classList.add('popup')

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/product-info.scss';
</style>