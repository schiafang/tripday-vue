<template>
  <div class="top-cities">
    <div class="top-cities-title">
      <h2>探索熱門城市</h2>
    </div>
    <div class="top-cities-content">
      <router-link
        to="/cities"
        v-for="(city, index) in cities"
        :key="city.id"
        class="city-card"
        :class="{}"
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
const dummyData = [
  {
    id: 1,
    city: 'taipei',
    title: '台北',
    // image: 'https://images.unsplash.com/photo-1515975325863-a4ceb4b7d6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80'
    // image: 'https://images.unsplash.com/photo-1512874876683-3bb985ca85c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80'
    // image: 'https://images.unsplash.com/photo-1559608958-5a1d096c2b26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    image: 'https://images.unsplash.com/photo-1527161949507-468bc84b280e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 2,
    city: 'newTaipei',
    title: '新北',
    // image: 'https://images.unsplash.com/photo-1526682847805-721837c3f83b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    // image: 'https://images.unsplash.com/photo-1561450031-20d7c3da043a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    // image: 'https://images.unsplash.com/photo-1591767589627-d4cb1b6333a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    image: 'https://images.unsplash.com/photo-1584813402514-203dc64e82ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    city: 'hsinchu',
    title: '新竹',
    image: 'https://images.unsplash.com/photo-1543069596-cc4662dbab81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: 4,
    city: 'hualian',
    title: '花蓮',
    image: 'https://www.taroko.gov.tw/Utility/DisplayImage?id=5548&prefix=original_'
  },
  {
    id: 5,
    city: 'chiayi',
    title: '嘉義',
    image: 'https://www.ali-nsa.net/zh-tw/content/images/static/ali-img-2-md.jpg'
  },
]

export default {
  data() {
    return {
      cities: [],
      isFocus: false,
      index: ''
    }
  },
  created() {
    this.cities = dummyData
  },
  methods: {
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
}

.city-card {
  width: 100%;
  height: 300px;
  transition: all 0.3s ease-in-out;
  position: relative;
  flex-basis: 100%;

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