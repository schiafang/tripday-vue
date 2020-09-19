<template>
  <div class="top-cities">
    <div class="top-cities-title">
      <h2>探索熱門城市</h2>
    </div>
    <div class="top-cities-content">
      <router-link
        v-for="(city, index) in cities"
        :to="{ name: 'Cities', query: { city: city.city } }"
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
/* eslint-disable */
const dummyData = [
  {
    id: 1,
    city: 'taipei',
    title: '台北',
    image: 'https://images.unsplash.com/photo-1527161949507-468bc84b280e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 2,
    city: 'newTaipei',
    title: '新北',
    image: 'https://images.unsplash.com/photo-1584813402514-203dc64e82ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    city: 'hsinchu',
    title: '新竹',
    image: 'https://taiwaneverything.cc/wp-content/uploads/2019/10/41.png'
  },
  {
    id: 4,
    city: 'hualian',
    title: '花蓮',
    image: 'https://tour-hualien.hl.gov.tw/api/1561110306642.GIF'
  },
  {
    id: 5,
    city: 'chiayi',
    title: '嘉義',
    image: 'https://www.ali-nsa.net/zh-tw/content/images/static/ali-img-2-md.jpg'
  },
  {
    id: 6,
    city: 'tainan',
    title: '台南',
    image: 'https://www.twtainan.net/image/33112/1024x768'
  },
  {
    id: 7,
    city: 'nantou',
    title: '南投',
    image: 'http://www.sunmoonlake.gov.tw/zh-tw/image/3182/1024x768'
  },
  {
    id: 8,
    city: 'taichung',
    title: '台中',
    image: 'https://i.imgur.com/SzbovBw.jpg'
  },
  {
    id: 9,
    city: 'pingtung',
    title: '屏東',
    image: 'https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_C100_318.jpg&sizetype=3'
  },
  {
    id: 10,
    city: 'keelung',
    title: '基隆',
    image: 'https://www.necoast-nsa.gov.tw/FileArtPic.ashx?id=905&w=600&h=400'
  },
]

export default {
  name: 'TopCities',
  data() {
    return {
      cities: [],
      isFocus: false,
      index: ''
    }
  },
  created() {
    function shuffle(arr) {
      let point = arr.length

      while (point) {
        let random = Math.floor(Math.random() * point--)
        let current = arr[point]
        arr[point] = arr[random]
        arr[random] = current
      }
      return arr
    }
    this.cities = shuffle(dummyData).slice(0, 5)
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

body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  width: 300px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>