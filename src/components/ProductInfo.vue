<template>
  <div class="product-info">
    <div class="product-cover">
      <img
        src="https://images.unsplash.com/photo-1547210318-c4ab922fb3a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
        alt=""
      />
    </div>
    <div class="product-content">
      桃園青埔｜Xpark 都會型水生公園門票
    </div>
    <div class="product-right-col">選購跟廣告</div>
    <div class="product-top-comment">
      最高分的旅客評價
      <ProductComments />
    </div>
  </div>
</template>

<script>
import ProductComments from '../components/ProductComments'
export default {
  components: { ProductComments }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 996px) {
  .product-info {
    background-color: rgb(21, 117, 61);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: 280px minmax(500px, 1fr) auto;
    grid-template-areas: 'cover cover' 'content right' 'comment .';
  }
  .product-cover {
    grid-area: cover;
    img {
      object-fit: cover;
    }
  }

  .product-content {
    grid-area: content;
  }

  .product-right-col {
    grid-area: right;
    background-color: yellow;
  }

  .product-top-comment {
    grid-area: comment;
  }
}
</style>