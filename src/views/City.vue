<template>
  <div class="city-page">
    <h2 v-if="products.length === 0" class="no-data">此城市沒有資料:(</h2>
    <div v-else class="city-container">
      <div class="city-banner">
        <img :src="city.image" alt="" />
        <div class="banner-title">
          {{ city.title }}
        </div>
        <button class="city-switch">
          <i class="fas fa-globe-asia mr-1"></i> 切換目的地
        </button>
      </div>
      <div class="city-content">
        <div class="breadcrumbs">
          <router-link to="/">
            首頁
          </router-link>
          <span> > </span>
          <router-link :to="`/productlist`">
            台灣
          </router-link>
          <span> > </span>
          <router-link :to="`/cities?city=${city.city}`">
            {{ city.title }}
          </router-link>
        </div>
        <div class="city-introduction">
          {{ city.introduction }}
        </div>

        <div class="city-map" @mouseover="markerAnimation">
          <img
            class="google-map-marker"
            src="../assets/images/google-map-marker.svg"
            alt=""
          />
          <img src="../assets/images/map.png" alt="" />
        </div>
      </div>

      <div class="city-content-main">
        <ProductCard :products="products" />

        <button class="btn mb-5">更多在地行程</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ProductCard from '../components/ProductCard'
import productAPI from '../apis/product'
import GoogleMapsApiLoader from 'google-maps-api-loader'

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
    id: 5,
    title: '【限時優惠】台北 101 觀景台門票',
    image: 'https://ws.taipei-101.com.tw/upload/banner3/20200330/056db186b7534256a16e963f481aec11/056db186b7534256a16e963f481aec11.jpg',
    price: 600,
    specialPrice: 300,
    cities: 'taipei',
    location: {
      country: '台灣',
      city: '台北',
    },
    rating: 4.5,
    ratingCount: 1348,
    orderCount: 14234
  },
  {
    id: 6,
    title: '台灣宜蘭｜國立傳統藝術中心門票',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_6679_23.jpg&sizetype=3',
    price: 135,
    specialPrice: null,
    cities: 'yilan',
    location: {
      country: '台灣',
      city: '宜蘭',
    },
    rating: 4.8,
    ratingCount: 832,
    orderCount: 1334
  },
  {
    id: 7,
    title: '台北士林｜兒童新樂園一日票',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_A12-00382_1.jpg&sizetype=3',
    price: 200,
    specialPrice: 170,
    cities: 'taipei',
    location: {
      country: '台灣',
      city: '台北',
    },
    rating: 4.8,
    ratingCount: 764,
    orderCount: 15322
  },
  {
    id: 8,
    title: '【50%優惠】劍湖山世界主題樂園門票｜水陸一日通票',
    image: 'https://scontent.ftpe3-2.fna.fbcdn.net/v/t1.0-9/119663607_10158724735191425_2655505770129767774_o.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=9xWcBOeXva0AX_aOzMC&_nc_ht=scontent.ftpe3-2.fna&oh=14770bc56db558131d82525f265e4ae4&oe=5F905ADC',
    price: 899,
    specialPrice: 450,
    cities: 'yuanlin',
    location: {
      country: '台灣',
      city: '雲林',
    },
    rating: 4.8,
    ratingCount: 231,
    orderCount: 5326
  },
  {
    id: 9,
    title: '台灣台南｜奇美博物館門票 ',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_2574_1.jpg&sizetype=3',
    price: 200,
    specialPrice: null,
    cities: 'tinan',
    location: {
      country: '台灣',
      city: '台南',
    },
    rating: 4.9,
    ratingCount: 431,
    orderCount: 2445
  },
  {
    id: 10,
    title: '花蓮｜多羅滿賞鯨遊船半日遊',
    image: 'https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.0-9/118933479_3313017368789492_4873800149085235301_o.jpg?_nc_cat=104&_nc_sid=730e14&_nc_ohc=BJgnd9HnekAAX9CGzz8&_nc_ht=scontent.ftpe3-1.fna&oh=4b8b94abbeefb3cf1aff462709bcf467&oe=5F901250',
    price: 750,
    specialPrice: null,
    cities: 'hualian',
    location: {
      country: '台灣',
      city: '花蓮',
    },
    address: '',
    rating: 4.6,
    ratingCount: 752,
    orderCount: 3453
  }
]

export default {
  name: 'City',
  components: { ProductCard },
  data() {
    return {
      products: [],
      city: {},
      cities: [],
      googleMap: null
    }
  },
  created() {
    this.products = dummyData  //Test
    GoogleMapsApiLoader({ apiKey: process.env.VUE_APP_GOOGLEAPI }).then(function (googleApi) {
      var autocomplete = new googleApi.maps.places.AutocompleteService()
    })

    function initMap() {
      var map = new winsow.google.maps.Map(document.querySelector('.map'), {
        zoom: 13,
        center: { lat: 59.325, lng: 18.070 }
      });

      marker = new winsow.google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: 59.327, lng: 18.067 }
      })
      marker.addListener('click', toggleBounce);
    }

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    // this.fetchCityProduct() 
    this.fetchCities()
  },
  methods: {
    async fetchCityProduct() {
      try {
        const city = this.$route.query.city
        const res = await productAPI.getCityProducts(city)
        this.products = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCities() {
      const res = await productAPI.getCities()
      this.cities = res.data
      this.city = res.data.filter(i => i.city === this.$route.query.city)[0]
    },
    markerAnimation() {
      var marker
      var map = document.querySelector('.city-map')
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: 59.327, lng: 18.067 }
      })

      console.log(marker)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/product-card.scss';
@import '../assets/scss/_base.scss';

.city-page {
  min-height: 550px;
}

.no-data {
  padding: 100px;
  text-align: center;
}

.city-banner {
  width: 100%;
  height: 300px;
  position: relative;
  color: #fff;
  font-weight: 900;
  font-size: 0.9rem;

  .banner-title {
    position: absolute;
    font-size: 36px;
    top: 100px;
    left: 15px;
  }

  .city-switch {
    position: absolute;
    border: 1px solid #fff;
    border-radius: 50px;
    padding: 7px 15px;
    top: 160px;
    left: 15px;
  }
}

.city-content,
.city-content-main {
  padding: 15px;
  font-size: 0.8rem;
  color: $main-gray;
  display: flex;
  flex-direction: column;
}

.city-content-main {
  background-color: $border-gray;
  align-items: center;
}

.breadcrumbs {
  margin: 15px 0;
  font-size: 0.8rem;

  a {
    color: $main-blue;
  }

  .router-link-active.active {
    font-weight: 900;
  }
}

.city-map {
  border: 1px solid $border-gray;
  border-radius: 6px;
  box-shadow: 1px 1px 3px 1px rgba(222, 222, 222, 0.2);
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;

  &::after {
    content: '檢視地圖';
    @include flexCenter;
    position: relative;
    bottom: 40px;
    width: 100%;
    height: 40px;
    font-weight: 900;
    font-size: 1.1rem;
    color: $main-black;
    background: rgba(255, 255, 255, 0.6);
  }

  img {
    transition: all 0.6s ease-in-out;
  }

  &:hover {
    cursor: pointer;

    img {
      transform: scale(1.5);
    }

    .google-map-marker {
      transform: scale(1);
      @keyframes bounce {
        0% {
          top: 50px;
        }
        50% {
          top: 15px;
        }
        100% {
          top: 50px;
        }
      }
      animation-name: bounce;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
  }
}

.google-map-marker {
  width: 40px;
  height: auto;
  position: absolute;
  left: calc(50% - 20px);
  top: 50px;
  z-index: 99;
}

@media screen and (min-width: 996px) {
  .city-banner {
    .banner-title,
    .city-switch {
      left: 130px;
    }
  }

  .city-content,
  .city-content-main {
    padding: 15px 130px;
  }

  .city-content {
    display: grid;
    grid-template-columns: 70% 30%;
  }

  .city-introduction {
    grid-column: 1 / 2;
  }

  .city-map {
    grid-column: 2 / 3;
  }
}
</style>