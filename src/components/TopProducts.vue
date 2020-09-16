<template>
  <div class="top-products">
    <div class="top-products-title">
      <h2>Top 10 超熱門活動</h2>
    </div>
    <TopProductCard :products="products" />
  </div>
</template>

<script>
import TopProductCard from '../components/TopProductCard'

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
  }
]

export default {
  name: 'TopProducts',
  components: { TopProductCard },
  data() {
    return {
      products: []
    }
  },
  created() {
    this.products = dummyData
  }
}
</script>

<style lang="scss" scoped>
.top-products {
  display: flex;
  flex-direction: column;
}

.top-products-contents {
  display: flex;
  flex: row nowrap;
  overflow-x: scroll;
  width: 100%;
  height: 400px;
}
</style>