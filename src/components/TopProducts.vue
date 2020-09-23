<template>
  <div class="top-products">
    <div class="top-products-title">
      <h2>Top 10 超熱門活動</h2>
    </div>
    <VueSlickCarousel v-bind="slickSettings" ref="carousel">
      <div
        class="product-card"
        v-for="(product, index) in products"
        :key="index"
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
import Star from './Star'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

const dummyData = [
  {
    id: 1,
    title: '桃園青埔｜Xpark 都會型水生公園門票',
    image: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/07/15/realtime/8196557.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930',
    price: 550,
    specialPrice: null,
    cities: 'taoyuan',
    location: {
      country: '台灣',
      city: '桃園',
    },
    address: '',
    rating: 4.5,
    ratingCount: 7332,
    orderCount: 233443
  },
  {
    id: 2,
    title: '台灣台中｜麗寶樂園渡假區門票【9折優惠】',
    image: 'https://img.jollybuy.com/S190625131147471/goods/879b8816f8cf403aa186d20bb8f393d4_Q50.jpg',
    price: 600,
    specialPrice: 540,
    cities: 'taichung',
    location: {
      country: '台灣',
      city: '台中',
    },
    address: '',
    rating: 4.2,
    ratingCount: 4326,
    orderCount: 34532
  },
  {
    id: 3,
    title: '【季節限定優惠】宜蘭龜山島賞鯨半日遊',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_C100_164_28.jpg&sizetype=3',
    price: 1000,
    specialPrice: 800,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '宜蘭',
    },
    address: '',
    rating: 4.4,
    ratingCount: 726,
    orderCount: 1532
  },
  {
    id: 4,
    title: '【94折優惠】屏東｜國立海洋生物博物館門票',
    image: 'https://i.imgur.com/Yo3qHVI.jpg',
    price: 420,
    specialPrice: null,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '屏東',
    },
    address: '',
    rating: 4.4,
    ratingCount: 726,
    orderCount: 1532
  },
  {
    id: 1,
    title: '桃園青埔｜Xpark 都會型水生公園門票',
    image: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/07/15/realtime/8196557.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930',
    price: 550,
    specialPrice: null,
    cities: 'taoyuan',
    location: {
      country: '台灣',
      city: '桃園',
    },
    address: '',
    rating: 4.5,
    ratingCount: 7332,
    orderCount: 233443
  },
  {
    id: 2,
    title: '台灣台中｜麗寶樂園渡假區門票【9折優惠】',
    image: 'https://img.jollybuy.com/S190625131147471/goods/879b8816f8cf403aa186d20bb8f393d4_Q50.jpg',
    price: 600,
    specialPrice: 540,
    cities: 'taichung',
    location: {
      country: '台灣',
      city: '台中',
    },
    address: '',
    rating: 4.2,
    ratingCount: 4326,
    orderCount: 34532
  },
  {
    id: 3,
    title: '【季節限定優惠】宜蘭龜山島賞鯨半日遊',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_C100_164_28.jpg&sizetype=3',
    price: 1000,
    specialPrice: 800,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '宜蘭',
    },
    address: '',
    rating: 4.4,
    ratingCount: 726,
    orderCount: 1532
  },
  {
    id: 4,
    title: '【94折優惠】屏東｜國立海洋生物博物館門票',
    image: 'https://i.imgur.com/Yo3qHVI.jpg',
    price: 420,
    specialPrice: null,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '屏東',
    },
    address: '',
    rating: 4.4,
    ratingCount: 726,
    orderCount: 1532
  },
  {
    id: 3,
    title: '【季節限定優惠】宜蘭龜山島賞鯨半日遊',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_C100_164_28.jpg&sizetype=3',
    price: 1000,
    specialPrice: 800,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '宜蘭',
    },
    address: '',
    rating: 4.4,
    ratingCount: 726,
    orderCount: 1532
  },
  {
    id: 4,
    title: '【94折優惠】屏東｜國立海洋生物博物館門票',
    image: 'https://i.imgur.com/Yo3qHVI.jpg',
    price: 420,
    specialPrice: null,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '屏東',
    },
    address: '',
    rating: 4.4,
    ratingCount: 726,
    orderCount: 1532
  }
]

export default {
  name: 'TopProducts',
  components: { VueSlickCarousel, Star },
  data() {
    return {
      products: [],
      slickSettings: {
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
  },
  created() {
    this.products = dummyData
  },
  methods: {
    showNext() {
      this.$refs.carousel.next()
    },
    showPrev() {
      this.$refs.carousel.prev()
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/_base.scss';

/** slick */
.slick-slide {
  padding: 0 5px;
}

// .carousel-btn,
.slick-arrow {
  background-color: #fff;
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  position: absolute;
  width: 45px;
  height: 45px;
  top: 150px;
  font-weight: 900;
  color: transparent;
  @include flexCenter;
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

.top-products-contents {
  display: flex;
  overflow: hidden;
}

.top-products {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.product-card {
  min-width: 270px;
  min-height: 305px;
  border: 1px solid $border-gray;
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

  img {
    object-fit: cover;
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
      font-size: 0.8rem !important;
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

@media screen and (min-width: 996px) {
  .slick-arrow {
    &.slick-next {
      margin-right: -45px;
    }

    &.slick-prev {
      margin-left: -45px;
    }
  }
}
</style>