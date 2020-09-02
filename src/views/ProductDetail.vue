<template>
  <div class="container">
    <!--商品資訊(傳入一個最高分評價)-->
    <ProductInfo />

    <!--方案選擇-->
    <ProductOptionPlan />

    <!--商品下方其他資訊說明-->
    <div class="product-description">
      <div class="product-description-container">
        <h1>商品說明</h1>
        <ProductComments />
      </div>
      <div class="product-nav-tab">nav tab</div>
    </div>
  </div>
</template>

<script>
import ProductInfo from '../components/ProductInfo'
import ProductComments from '../components/ProductComments'
import ProductOptionPlan from '../components/ProductOptionPlan'

export default {
  name: 'ProductDetail',
  components: { ProductInfo, ProductComments, ProductOptionPlan }
}
</script>

<style lang="scss" scoped>
.product-nav-tab {
  display: none;
}

@media screen and (min-width: 996px) {
  .product-description {
    display: flex;
    flex-direction: row;
    background-color: rgb(211, 211, 162);
  }

  .product-description-container {
    width: calc(100% - 150px);
  }

  .product-nav-tab {
    display: block;
    width: 250px;
    background-color: rgb(199, 108, 108);
  }
}
</style>