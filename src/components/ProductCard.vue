<template>
  <div class="products-card-content">
    <v-row class="mb-6" no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-2"
        v-for="product in products"
        :key="product.id"
      >
        <div class="product-card">
          <router-link
            :to="{ name: 'ProductDetail', params: { id: product.id } }"
          >
            <FavoriteHeart :id="product.id" />

            <div class="product-card-image">
              <img v-lazy="product.image" alt="" />
            </div>

            <div class="flash-label" v-if="product.policy.check">
              <i class="fas fa-caret-down"></i>
              <i class="fa fa-flash flash-icon"></i>立即確認
            </div>

            <div class="product-card-detail">
              <div class="card-title">
                <i
                  class="fa fa-flash title-flash"
                  v-if="product.policy.check"
                ></i
                >{{ product.title }}
              </div>
              <div class="card-ordered">
                <i class="fab fa-hotjar" v-if="product.orderCount >= 1000"></i>
                {{ product.orderCount | orderCount }} 已訂購
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Star from './Star'
import FavoriteHeart from '../components/FavoriteHeart'
import Price from '../components/Price'
import { orderCount } from './../utils/mixins'

export default {
  name: 'ProductCard',
  components: { Star, FavoriteHeart, Price },
  mixins: [orderCount],
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/product-card.scss';
</style>