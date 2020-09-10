<template>
  <div class="top-products-contents">
    <div
      class="product-card"
      v-for="(product, index) in products"
      :key="product.id"
    >
      <router-link to="/products/1">
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
          <h3>{{ index + 1 }}</h3>
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
            <div class="star">
              <i class="fas fa-star"></i><i class="fas fa-star"></i
              ><i class="fas fa-star"></i><i class="fas fa-star"></i
              ><i class="fas fa-star"></i>
            </div>
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
  </div>
</template>

<script>
export default {
  name: 'TopProductCard',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

.product-card {
  width: 270px;
  height: 305px;
  border: 1px solid $border-gray;
  margin: 15px 15px 15px 0;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    .product-card-image,
    .product-card-detail {
      opacity: 0.7;
    }

    .flash-label {
      top: 134px;
      opacity: 1;
    }

    .product-card-detail .card-title .title-flash {
      transform: rotate3d(0, 1, 0, 6rad);
      color: $yellow;
      opacity: 1;
    }
  }
}

.flash-label {
  position: absolute;
  top: 150px;
  left: 5px;
  padding: 5px 10px;
  font-size: 0.7rem;
  color: #fff;
  border-radius: 3px;
  background: $main-blue;
  box-shadow: 1px 2px 5px 3px rgba($color: #000000, $alpha: 0.2);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  letter-spacing: 1px;

  .flash-icon {
    margin-right: 3px;
  }

  .fa-caret-down {
    font-size: 1.5rem;
    position: absolute;
    top: 17px;
    color: $main-blue;
  }
}

.rank-label {
  @include flexCenter;
  position: absolute;
  top: 140px;
  right: 10px;
  color: #fff;
  width: 40px;

  h3 {
    position: absolute;
    top: 5px;
    left: 15px;
  }
}

.product-card-image {
  height: 160px;
  width: 100%;
  object-fit: cover;

  img {
    border-radius: 6px 6px 0 0;
  }
}

.product-card-detail {
  padding: 10px;
  font-size: 0.8rem;
  color: $main-gray;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr auto auto 30px;
  grid-gap: 3px;
  grid-template-areas:
    'title title'
    'ordered .'
    'place price'
    'rate price';

  .card-title {
    grid-area: title;
    width: 200px;
    font-size: 1rem;
    font-weight: 450;
    color: $main-black;
    letter-spacing: 0.8px;
    margin-bottom: 5px;

    .title-flash {
      transform: rotate3d(0, 0, 0, 0);
      transition: transform 0.3s ease-out;
      color: $main-blue;
      margin: 3px;
    }
  }

  .card-ordered {
    grid-area: ordered;
    i {
      color: $gray;
      margin-right: 3px;
    }
  }

  .card-place {
    grid-area: place;
    i {
      color: $gray;
      margin-right: 3px;
    }
  }

  .card-rating {
    grid-area: rate;
    height: 100%;
    display: flex;
    align-items: center;

    .star {
      background: $main-blue;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-size: 0.8rem;
      margin-right: 5px;
    }
  }

  .card-price {
    grid-area: price;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .original {
      text-decoration: line-through;
      height: 15px;
    }

    .price-now {
      font-weight: 600;
      span {
        font-size: 1.2rem;
        color: $main-blue;
      }
    }
  }
}
</style>