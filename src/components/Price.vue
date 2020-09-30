<template>
  <div>
    <div v-show="initialPrice.specialPrice" class="original">
      {{ currentCurrency }} {{ (initialPrice.price / exchangeRate) | exchange }}
    </div>
    <div class="price-now">
      {{ currentCurrency }}
      <span v-if="initialPrice.specialPrice">{{
        (initialPrice.specialPrice / exchangeRate) | exchange
      }}</span>
      <span v-else>{{ (initialPrice.price / exchangeRate) | exchange }}</span>
    </div>
  </div>
</template>

<script>
import { currency } from './../utils/mixins'

export default {
  name: 'Price',
  mixins: [currency],
  props: {
    initialPrice: {
      type: Object
    }
  }
}
</script>