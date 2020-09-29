<template>
  <div>
    <div class="city-map" @click="openMapDialog">
      <img src="../assets/images/map.png" alt="" />
      <i class="fas fa-map-marker-alt google-map-marker"></i>
    </div>

    <v-dialog
      v-model="mapDialog"
      max-width="1200px"
      transition="slide-y-transition"
    >
      <div class="dialog-content">
        <div class="dialog-product-list">
          <router-link
            :to="{ name: 'ProductDetail', params: { id: product.id } }"
            v-for="product in rangeProducts"
            :key="product.id"
            target="_blank"
          >
            <div
              class="map-product-card"
              @mouseenter="toggleBounce(product.id)"
            >
              <img :src="product.image" alt="" />
              <div class="card-info">
                <span class="card-title"> {{ product.title }}</span>
                <div class="bottom">
                  <div class="rating-price">
                    <Star :rating="product.rating" />
                    <span
                      >TWD <span>{{ product.price }}</span></span
                    >
                  </div>
                  <button class="card-btn">立即訂購</button>
                </div>
              </div>
            </div>
          </router-link>

          <div class="map-tip">
            <i class="fas fa-map-marked-alt"></i>
            <p>
              目前的範圍內有
              <span>{{ rangeProducts.length }}</span>
              項活動，欲查看更多，請移動地圖範圍
            </p>
          </div>
        </div>
        <div id="map" class="dialog-map"></div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import productAPI from '../apis/product'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import Star from '../components/Star.vue'

const customMarker = {
  path:
    "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
  fillColor: '#ef7a70',
  fillOpacity: .9,
  scale: .08,
  strokeWeight: 0,
}

export default {
  name: 'GoogleMapMarker',
  components: { Star },
  props: {
    city: {
      type: Object
    }
  },
  data() {
    return {
      products: [],
      rangeProducts: [],
      map: null,
      google: null,
      mapDialog: false,
      marker: [],
      mapCenter: {
        lat: 25.033976,
        lng: 121.5645389
      }
    }
  },
  created() {
    this.fetchAllProducts()
  },
  watch: {
    mapDialog() {
      if (this.mapDialog === false) {
        this.rangeProducts = []
        this.marker = []
      }
    },
    mapCenter() {
      this.rangeProducts = []
      this.marker = []
      this.setMarker()
    }
  },
  methods: {
    async fetchAllProducts() {
      const allProducts = await productAPI.getProducts()
      this.products = allProducts.data
    },
    async openMapDialog() {
      this.mapDialog = true
      const googleMap = await GoogleMapsApiLoader({
        apiKey: process.env.VUE_APP_GOOGLEAPI,
        libraries: ['geometry']
      })
      this.google = googleMap
      this.initMap()
      this.setMarker()
    },
    initMap() {
      const currentCityGeocode = { ...this.city.geocode }
      this.mapCenter = {
        lat: currentCityGeocode.lat,
        lng: currentCityGeocode.lng
      }
      this.map = new this.google.maps.Map(document.getElementById("map"), {
        center: this.mapCenter,
        zoom: 12,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      })
    },
    setMarker() {
      this.products.forEach(i => {
        const marker = new this.google.maps.Marker({
          position: { lat: i.geocode.lat, lng: i.geocode.lng },
          map: this.map,
          icon: customMarker,
        })

        let center = this.map.getCenter()
        let markerLatLng = marker.getPosition()
        let distance = this.google.maps.geometry.spherical.computeDistanceBetween(center, markerLatLng)

        marker.distance = distance
        marker.product = i
        this.marker.push(marker)

        let colorVariables = Math.floor(i.rating / 5 * 100)
        const info = `
          <div class="map-info-window">
            <img class="map-info-image" src="${i.cover || i.image}" />
            <div class="map-info-content">
              <span class="top">${i.title}</span>
              <div class="bottom">
                <div class="d-flex">
                  <div class="star"
                    style="background: linear-gradient(90deg, #2292A4 ${colorVariables}%, #bebebe ${colorVariables}%);
                    background-clip: text;
                    -webkit-background-clip: text;"
                  >
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span class="rating-count">(${i.ratingCount})</span>
                </div>
                <span class="price"> TWD <span>${i.price}</span></span>
              </div>
            </div>
          </div>`

        const infoWindow = new this.google.maps.InfoWindow({
          content: info
        })

        marker.addListener('mouseover', () => {
          infoWindow.open(this.map, marker)
        })
        marker.addListener('mouseout', () => {
          infoWindow.close()
        })
        marker.addListener('click', () => {
          this.$router.push({ name: 'ProductDetail', params: { id: i.id } })
        })
        this.map.addListener('center_changed', () => {
          this.mapCenter = this.map.center
          marker.setMap(null)
        })
      })
      this.sortProducts()
    },
    sortProducts() {
      this.rangeProducts = this.marker.map(i => ({
        ...i.product,
        distance: i.distance
      }))

      this.rangeProducts.sort((a, z) => a.distance - z.distance)
      this.rangeProducts = this.rangeProducts.filter(i => i.distance < 16300)
    },
    toggleBounce(id) {
      let currentMarker
      this.marker.forEach(i => {
        i.setAnimation(null)
        if (i.product.id === id) {
          currentMarker = i
        }
      })
      currentMarker.setAnimation(this.google.maps.Animation.BOUNCE)
    }
  }
}
</script>

<style lang="scss" >
@import '../assets/scss/google-map-marker.scss';
</style>