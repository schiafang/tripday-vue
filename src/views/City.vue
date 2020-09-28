<template>
  <div class="city-page">
    <div class="city-container">
      <div class="city-banner">
        <img v-lazy="city.image" alt="" />
        <div class="banner-title">
          {{ city.title }}
        </div>

        <button class="city-switch" @click="cityDialog = true">
          <i class="fas fa-globe-asia mr-1"></i> 切換目的地
        </button>

        <v-dialog
          v-model="cityDialog"
          max-width="390"
          transition="slide-y-transition"
        >
          <div class="city-dialog-content">
            <div class="dialog-top"></div>
            <div class="dialog-close" @click="cityDialog = !cityDialog">
              <i class="fas fa-times"></i>
            </div>
            <div class="dialog-title">
              切換目的地
            </div>
            <div class="city-list">
              <h4 class="mb-3">台灣</h4>
              <span
                v-for="city in cities"
                :key="city.id"
                @click="switchCity(city.city)"
                >{{ city.title }}</span
              >
            </div>
          </div>
        </v-dialog>
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

        <div class="city-map" @click="openMapDialog">
          <img src="../assets/images/map.png" alt="" />
          <i class="fas fa-map-marker-alt google-map-marker"></i>
        </div>

        <!--google map-->
        <v-dialog
          v-model="mapDialog"
          max-width="800px"
          transition="slide-y-transition"
        >
          <div class="map-dialog-content" id="map"></div>
        </v-dialog>
      </div>

      <div class="city-content-main">
        <h2 v-if="products.length === 0" class="no-data">
          此城市目前沒有行程:(
        </h2>

        <div class="products-wrapper" v-else>
          <ProductCard :products="products" />
        </div>
        <button
          class="btn mb-5"
          :disabled="products.length < 10"
          v-if="products.length !== 0"
        >
          更多在地行程
        </button>

        <div class="explore-cities">
          <div class="explore-cities-title">
            探索熱門城市
          </div>

          <VueSlickCarousel
            v-bind="slickSettings"
            ref="carousel"
            v-if="Object.keys(slickSettings).length !== 0"
          >
            <router-link
              :to="{ path: '/cities', query: { city: city.city } }"
              v-for="city in cities"
              :key="city.id"
            >
              <div class="city-card">
                <img v-lazy="city.image" alt="" />
                <span> {{ city.title }}</span>
              </div>
            </router-link>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ProductCard from '../components/ProductCard'
import googleAPI from '../apis/placeDetail'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import productAPI from '../apis/product'

export default {
  name: 'City',
  components: { ProductCard, VueSlickCarousel },
  data() {
    return {
      products: [],
      city: {},
      cities: [],
      googleMap: null,
      slickSettings: {},
      cityDialog: false,
      mapDialog: false,
      restaurants: [],
      map: null,
      google: null
    }
  },
  async mounted() {
    this.fetchCities()
    this.fetchCityProduct()
  },
  watch: {
    $route(to) {
      this.city = this.cities.filter(i => i.city === to.query.city)[0]
      this.fetchCityProduct()
    }
  },
  methods: {
    async fetchCityProduct() {
      try {
        this.$store.state.isLoading = true
        const res = await productAPI.getCityProducts(this.$route.query.city)
        this.products = res.data
        this.$store.state.isLoading = false
      } catch (error) {
        console.log(error)
        this.$store.state.isLoading = false
      }
    },
    async fetchCities() {
      const res = await productAPI.getCities()
      this.cities = res.data
      this.city = res.data.filter(i => i.city === this.$route.query.city)[0]
      this.setSlickSetting()
    },
    async fetchLocation() {
      try {
        this.cities.map(i => {
          return googleAPI.getLocation(i.city).then(res => {
            i.geocode = res.data.results[0].geometry.location
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    setSlickSetting() {
      this.slickSettings = {
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
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            }
          },
          {
            breakpoint: 1350,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            }
          },
        ]
      }
    },
    switchCity(city) {
      this.cityDialog = false
      this.$router.push({ path: '/cities', query: { city: city } })
    },
    initMap() {
      const currentCityGeocode = { ...this.city.geocode }
      this.map = new this.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: currentCityGeocode.lat,
          lng: currentCityGeocode.lng
        },
        zoom: 12,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false
      })
    },
    setMarker() {

      const customMarker = {
        path:
          "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
        fillColor: '#ef7a70',
        fillOpacity: .8,
        scale: .1,
        strokeWeight: 0,
      };
      this.products.forEach(i => {
        const marker = new this.google.maps.Marker({
          position: { lat: i.geocode.lat, lng: i.geocode.lng },
          map: this.map,
        })

        const info = `<div class="ma-2"><h2 class="mb-3">${i.placeTitle}</h2><img class="map-info-image" src="${i.cover || i.image}" /></div>`

        const infoWindow = new this.google.maps.InfoWindow({
          content: info
        })

        marker.addListener('mouseover', () => infoWindow.open(map, marker))
        marker.addListener('mouseout', () => infoWindow.close())
      })

    },
    async openMapDialog() {
      this.mapDialog = true
      const googleMap = await GoogleMapsApiLoader({ apiKey: process.env.VUE_APP_GOOGLEAPI })
      this.google = googleMap
      this.initMap()
      this.setMarker()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/city.scss';
</style>