<template>
  <div class="product-info" v-if="Object.keys(product).length !== 0">
    <div class="breadcrumbs">
      <router-link to="/">
        首頁
      </router-link>
      <span> > </span>
      <router-link :to="`/productlist`">
        {{ product.location.country }}
      </router-link>
      <span> > </span>
      <router-link :to="`/cities?city=${product.city}`">
        {{ product.location.city }}
      </router-link>
    </div>
    <div class="product-cover">
      <img v-lazy="product.cover || product.image" alt="" />
    </div>
    <div class="product-content">
      <div class="product-title">
        {{ product.title }}
        <i
          ref="breakHeart"
          class="fas fa-heart remove-favorite"
          v-if="isFavorited"
          @click="removeFavorite(product.id)"
        ></i>
        <i
          v-else
          class="far fa-heart add-favorite"
          @click="addFavorite(product.id)"
        ></i>
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
      <div class="policy" v-if="product.planOption">
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
    <div class="product-comment" v-if="product.review">
      <div class="top">
        <h3>旅客評價</h3>
        <div class="more" @click="scrollToComments">
          更多評價 <i class="fas fa-angle-right"></i>
        </div>
      </div>
      <ProductCommentCard :reviews="product.review" />
    </div>

    <!--選購欄--->
    <div class="product-booking-col" v-if="product.planOption">
      <div class="booking-card" @click="scrollToPlanOption">
        <div class="price">
          <div class="price-now">
            TWD {{ product.specialPrice || product.price }}
          </div>
          <div class="original" v-show="product.specialPrice">
            TWD {{ product.price }}
          </div>
        </div>
        <div class="score">
          <span>{{ product.rating }} </span><Star />
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
import Star from '../components/Star'
import { mapState } from 'vuex'

export default {
  name: 'ProductInfo',
  components: { ProductCommentCard, Star },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorited: false
    }
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    scrollToComments() {
      document.querySelector("#description-reviews").scrollIntoView(true)
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
    },
    removeFavorite(id) {
      console.log(id)
      if (!this.isAuthenticated) {
        this.$refs.signTip.style.opacity = 1
        setTimeout(() => { this.$refs.signTip.style.opacity = 0 }, 1500)
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/product-info.scss';
</style>