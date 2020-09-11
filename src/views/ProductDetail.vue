<template>
  <div class="container">
    <!--商品資訊(隨機一個高分評價)-->
    <ProductInfo :product="product" />

    <!--方案選擇-->
    <ProductOptionPlan :ticket="ticket" />

    <!--商品下方其他資訊說明-->
    <div class="product-description">
      <div class="product-description-container">
        <h1>商品說明</h1>
        <div id="productComents" ref="productComents">
          <ProductCommentCard />
        </div>
      </div>
      <div class="product-nav-tab">nav tab</div>
    </div>
  </div>
</template>

<script>
import ProductInfo from '../components/ProductInfo'
import ProductCommentCard from '../components/ProductCommentCard'
import ProductOptionPlan from '../components/ProductOptionPlan'

const dummyData = {
  id: 1,
  title: '桃園青埔｜Xpark 都會型水生公園門票',
  image: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/07/15/realtime/8196557.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930',
  cover: 'https://images.unsplash.com/photo-1547210318-c4ab922fb3a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
  description: {
    introduction: '由日本橫濱八景島首度跨海來台桃園開設分館「Xpark」，Xpark主打新都會型水族館，驅使最先端的科技，營造出環境的溫度、濕度、氣味、聲音，帶您到地球上每個不可思議的角落，受到啟發、感受療癒、洗滌心靈。在KKday訂購電子票即可掃QRcode入園，不必排隊購票・輕鬆入場！',
    highlights: ['由日本高人氣八景島團隊首度跨海來台，打造日系都會型水族館，全台首見', '在Tripday訂購Xpark入園門票，當日掃QRcode即可入館', '結合當地商場，鄰近高鐵站、機場捷運，交通方便，吃喝玩樂一次滿足']
  },
  price: 550,
  specialPrice: null,
  cities: 'taoyuan',
  location: {
    country: '台灣',
    city: '桃園',
  },
  address: '320台灣桃園市中壢區春德路105號',
  rating: 4.5,
  ratingCount: 7332,
  orderCount: 233443,
  ticketTime: ['10:00', '11:00', '12:00', '13:00', '14:00'],
  ticketTypes: [
    {
      name: '成人',
      limit: '(18 - 64 歲)',
      price: '550'
    },
    {
      name: '兒童',
      limit: '(4 - 11 歲)',
      price: '250'
    }, {
      name: '學生',
      limit: '(12 歲以上（含）)',
      price: '450'
    }, {
      name: '長者',
      limit: '(65 歲以上（含）)',
      price: '200'
    },
  ]
}

export default {
  name: 'ProductDetail',
  components: { ProductInfo, ProductCommentCard, ProductOptionPlan },
  data() {
    return {
      product: {},
      highlights: [],
      ticket: {
        ticketTime: [],
        ticketTypes: []
      }
    }
  },
  created() {
    this.product = dummyData
    this.ticket.ticketTime = dummyData.ticketTime
    this.ticket.ticketTypes = dummyData.ticketTypes
    this.highlights = dummyData.description.highlights
  }
}
</script>

<style lang="scss" scoped>
.product-nav-tab {
  display: none;
}

@media screen and (min-width: 996px) {
  .product-description {
    display: flex;
    flex-direction: row;
    background-color: rgb(211, 211, 162);
  }

  .product-description-container {
    width: calc(100% - 150px);
  }

  .product-nav-tab {
    display: block;
    width: 250px;
    background-color: rgb(199, 108, 108);
  }
}
</style>