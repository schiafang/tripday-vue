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
            <img :src="product.image" alt="" />
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
              <i class="fab fa-hotjar"></i> 15K+ 已訂購
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
              <div v-show="product.specialPrice" class="original">
                TWD {{ product.price }}
              </div>
              <div class="price-now">
                TWD
                <span v-if="product.specialPrice">{{
                  product.specialPrice
                }}</span>
                <span v-else>{{ product.price }}</span>
              </div>
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
import Star from './Star'

export default {
  name: 'TopProducts',
  components: { VueSlickCarousel, Star },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      slickSettings: {}
    }
  },
  created() {
    this.setSlickSetting()
  },
  methods: {
    showNext() {
      this.$refs.carousel.next()
    },
    showPrev() {
      this.$refs.carousel.prev()
    },
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
</script>

<style lang="scss" scope>
@import '../assets/scss/_base.scss';
@import '../assets/scss/product-card.scss';

/** slick */
.slick-slide {
  padding: 0 5px;
}

.slick-arrow {
  @include flexCenter;
  background-color: #fff;
  opacity: 0.7;
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  position: absolute;
  width: 45px;
  height: 45px;
  top: 150px;
  font-weight: 900;
  color: transparent;
  z-index: 999;

  &.slick-disabled {
    opacity: 0;
  }

  &.slick-next:after,
  &.slick-prev:after {
    position: relative;
    top: -10px;
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid $second-gray;
    border-right: 2px solid $second-gray;
  }

  &.slick-prev:after {
    transform: rotate(-135deg);
    left: 3px;
  }

  &.slick-next:after {
    transform: rotate(45deg);
    right: 3px;
  }

  &.slick-next {
    right: 0px;
  }

  &.slick-prev {
    left: 0;
  }
}

.top-products-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.product-card {
  min-width: 270px;
  min-height: 305px;
}

.rank-label {
  @include flexCenter;
  position: absolute;
  top: 140px;
  right: 10px;
  color: #fff;
  width: 40px;

  .rank-index-wrapper {
    width: 20px;
    text-align: center;
    position: absolute;
    top: 7px;
    left: 10px;
  }
}
</style>