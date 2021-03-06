<template>
  <div>
    <router-link
      :to="{ name: 'ProductDetail', params: { id: product.id } }"
      v-for="product in products"
      :key="product.id"
    >
      <div class="product-list-card my-4" :id="`productListCard${product.id}`">
        <FavoriteHeart :id="product.id" @click="removeFavorite(product.id)" />
        <div class="product-list-card-image">
          <img v-lazy="product.image" alt="" />
        </div>
        <div class="product-list-card-detail">
          <div class="card-policy">
            <span v-if="product.policy.check" class="check-span">{{
              product.policy.check
            }}</span>
            <span v-if="product.policy.cancel" class="cancel-span">{{
              product.policy.cancel
            }}</span>
          </div>

          <div class="card-title">
            {{ product.title }}
          </div>

          <div class="card-introduction">
            {{ product.description.introduction }}
          </div>

          <div class="card-place">
            <i class="fas fa-map-marker-alt"></i>
            {{ product.location.country }} {{ product.location.city }}
          </div>

          <div class="card-date" v-if="product.planOption">
            最早可預定日期：{{ date }}
          </div>

          <div class="card-bottom">
            <div class="d-flex">
              <div class="card-rating mr-2">
                <Star :rating="product.rating" />
                ({{ product.ratingCount }})
              </div>
              |
              <div class="card-ordered ml-2">
                <i class="fab fa-hotjar" v-if="product.orderCount >= 1000"></i>
                {{ product.orderCount | orderCount }} 已訂購
              </div>
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
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import FavoriteHeart from '../components/FavoriteHeart'
import Star from '../components/Star'
import Price from './Price'
import moment from 'moment'
import { orderCount } from './../utils/mixins'

export default {
  name: 'ProductListCard',
  components: { FavoriteHeart, Star, Price },
  mixins: [orderCount],
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      date: null
    }
  },
  created() {
    this.date = moment(new Date()).add(2, 'days').format('YYYY-MM-DD')
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/product-card.scss';
</style>