<template>
  <div class="top-cities">
    <div class="top-cities-title">
      <h2>探索熱門城市</h2>
    </div>
    <div class="top-cities-content">
      <router-link
        v-for="city in randomCities"
        :to="{ path: '/cities', query: { city: city.city } }"
        :key="city.id"
        class="city-card"
      >
        <img :src="city.image" alt="" @mouseover="mouseover(index)" />
        <div class="city-card-bottom">
          <span class="city-title">{{ city.title }}</span>
          <div class="city-label"><span>熱門景點</span></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import productAPI from '../apis/product'

export default {
  name: 'TopCities',
  data() {
    return {
      cities: [],
      randomCities: [],
      isFocus: false,
      index: ''
    }
  },
  created() {
    this.fetchCities()
  },
  methods: {
    async fetchCities() {
      try {
        const res = await productAPI.getCities()
        this.cities = res.data
        this.randomCities = this.shuffle(this.cities).slice(0, 5)
      } catch (error) {
        console.log(error)
      }
    },
    shuffle(arr) {
      let point = arr.length

      while (point) {
        let random = Math.floor(Math.random() * point--)
        let current = arr[point]
        arr[point] = arr[random]
        arr[random] = current
      }
      return arr
    },
    mouseover(index) {
      this.index = index
    }
  }
}
</script>

<style lang="scss" scoped>
.top-cities {
  height: 350px;
  margin: 100px 0;
}

.top-cities-title {
  margin: 15px 0;
}

.top-cities-content {
  display: flex;
  grid-gap: 10px;
  width: 100%;
  overflow: hidden;
}

.city-card {
  width: 100%;
  height: 300px;
  transition: all 0.3s ease-in-out;
  position: relative;
  flex-basis: 100%;
  margin: 5px;

  img {
    border-radius: 8px;
    object-fit: cover;
  }

  .hover {
    opacity: 0.8;
    flex-basis: 200%;
    cursor: pointer;
  }

  &:hover {
    opacity: 0.8;
    flex-basis: 200%;
    cursor: pointer;

    .city-card-bottom {
      bottom: 20px;
    }

    .city-card-bottom .city-label {
      opacity: 1;
    }
  }
}

.city-card-bottom {
  position: absolute;
  bottom: -20px;
  left: 15px;
  color: #fff;
  transition: all 0.4s ease-in-out;

  .city-title {
    font-size: 1.3rem;
    font-weight: 900;
  }

  .city-label {
    margin-top: 5px;
    font-size: 0.7rem;
    border: 0.1px solid #fff;
    border-radius: 50px;
    padding: 3px 5px;
    opacity: 0;
    transition: all 0.4s ease-in-out;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>