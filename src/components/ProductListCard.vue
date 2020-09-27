<template>
  <div>
    <router-link to="/" v-for="product in products" :key="product.id">
      <div class="product-list-card my-4">
        <FavoriteHeart :id="product.id" />
        <div class="product-card-image">
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

          <div class="card-date">
            最早可使用日期：2020-09-27
          </div>

          <div class="card-bottom">
            <div class="d-flex">
              <div class="card-rating mr-2">
                <Star :rating="product.rating" />
                ({{ product.ratingCount }})
              </div>
              |
              <div class="card-ordered ml-2">
                <i class="fab fa-hotjar"></i> 15K+ 已訂購
              </div>
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
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import FavoriteHeart from '../components/FavoriteHeart'
import Star from '../components/Star'

export default {
  name: 'ProductListCard',
  components: { FavoriteHeart, Star },
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