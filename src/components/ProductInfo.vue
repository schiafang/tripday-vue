<template>
  <div class="product-info">
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
        <span>
          {{ product.title }}
        </span>

        <div class="heart-wrapper">
          <FavoriteHeart :id="product.id" />
        </div>
      </div>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i> {{ product.location.country }} -
        {{ product.location.city }}
      </div>
      <div class="policy" v-if="product.planOption">
        <div v-if="product.policy.time">
          <i class="icon-clock"></i> {{ product.policy.time }}
        </div>
        <div v-if="product.policy.refund">
          <i class="icon-refresh"></i> {{ product.policy.refund }}
        </div>
        <div v-if="product.policy.rule">
          <i class="icon-screen-smartphone"></i> {{ product.policy.rule }}
        </div>
        <div v-if="product.policy.cancel">
          <i class="icon-close"></i> {{ product.policy.cancel }}
        </div>
      </div>
      <div v-else class="no-plan-option"><span>目前沒有行程</span></div>
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
    <div class="product-comment" v-if="product.planOption">
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
            {{ currentCurrency }}
            {{
              ((product.specialPrice || product.price) / exchangeRate)
                | exchange
            }}
          </div>
          <div class="original" v-show="product.specialPrice">
            {{ currentCurrency }}
            {{ (product.price / exchangeRate) | exchange }}
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
import FavoriteHeart from '../components/FavoriteHeart'
import Star from '../components/Star'
import { mapState } from 'vuex'
import { currency } from './../utils/mixins'

export default {
  name: 'ProductInfo',
  components: { ProductCommentCard, Star, FavoriteHeart },
  mixins: [currency],
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
      if (this.isAuthenticated) {
        this.$store.commit('addFavorite', id)
      } else {
        this.$refs.signTip.style.opacity = 1
        setTimeout(() => { this.$refs.signTip.style.opacity = 0 }, 1500)
        return
      }
    },
    removeFavorite(id) {
      if (this.isAuthenticated) {
        this.$store.commit('removeFavorite', id)
      } else {
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