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
                <i class="fab fa-hotjar"></i> 15K+ 已訂購
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Star from './Star'
import FavoriteHeart from '../components/FavoriteHeart'

export default {
  name: 'ProductCard',
  components: { Star, FavoriteHeart },
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