<template>
  <div class="top-products-content">
    <VueSlickCarousel
      v-bind="slickSettings"
      ref="carousel"
      v-if="products.length !== 0"
    >
      <div
        class="product-card"
        v-for="(product, index) in products"
        :key="product.id"
      >
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
        >
          <div class="product-card-image">
            <img v-lazy="product.image" alt="" />
          </div>
          <div class="flash-label">
            <i class="fas fa-caret-down"></i>
            <i class="fa fa-flash flash-icon"></i>立即確認
          </div>
          <div class="rank-label">
            <img
              src="https://cdn.kkday.com/pc-web/assets/img/ic_top10_label.svg"
              alt=""
            />
            <div class="rank-index-wrapper">{{ index + 1 }}</div>
          </div>
          <div class="product-card-detail">
            <div class="card-title">
              <i class="fa fa-flash title-flash"></i>{{ product.title }}
            </div>
            <div class="card-ordered">
              <i class="fab fa-hotjar"></i>
              {{ product.orderCount | orderCount }} 已訂購
            </div>
            <div class="card-place">
              <i class="fas fa-map-marker-alt"></i>
              {{ product.location.country }} {{ product.location.city }}
            </div>
            <div class="card-rating">
              <Star :rating="product.rating" />
              ({{ product.ratingCount }})
            </div>
            <div class="card-price">
              <Price
                :initial-price="{
                  price: product.price,
                  specialPrice: product.specialPrice
                }"
              />
            </div>
          </div>
        </router-link>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
/* eslint-disable */
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import { productSlide, orderCount } from './../utils/mixins'
import Star from './Star'
import Price from './Price'

export default {
  name: 'TopProducts',
  components: { VueSlickCarousel, Star, Price },
  mixins: [productSlide, orderCount],
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_base.scss';
@import '../assets/scss/product-card.scss';

.top-products-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.rank-label {
  @include flexCenter;
  position: absolute;
  top: 140px;
  right: 10px;
  color: #fff;
  width: 40px;
  z-index: 1;

  .rank-index-wrapper {
    width: 20px;
    text-align: center;
    position: absolute;
    top: 7px;
    left: 10px;
  }
}
</style>