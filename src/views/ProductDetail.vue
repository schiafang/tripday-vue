<template>
  <div class="container">
    <div v-if="product">
      <!--商品資訊(隨機一個高分評價)-->
      <ProductInfo :product="product" />

      <!--方案選擇-->
      <ProductOptionPlan :plan="plan" />

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

    <div v-else class="in-progress-wrapper">
      <i class="fas fa-hammer"></i> In progress
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import ProductInfo from '../components/ProductInfo'
import ProductCommentCard from '../components/ProductCommentCard'
import ProductOptionPlan from '../components/ProductOptionPlan'

const dummyData = [
  {
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
    planOption: [
      {
        id: uuidv4(),
        title: 'Xpark 入園門票',
        price: 550, //標價
        ticketTime: ['10:00', '11:00', '12:00', '13:00', '14:00'],
        ticketTypes: [
          {
            name: '成人',
            limit: '18 - 64 歲',
            price: '550'
          },
          {
            name: '兒童',
            limit: '4 - 11 歲',
            price: '250'
          }, {
            name: '學生',
            limit: '12 歲以上(含)',
            price: '450'
          }, {
            name: '長者',
            limit: '65 歲以上(含)',
            price: '200'
          },
        ],
      }
    ]
  },
  {
    id: 2,
    title: '【9折優惠】台灣台中｜麗寶樂園渡假區門票',
    image: 'https://img.jollybuy.com/S190625131147471/goods/879b8816f8cf403aa186d20bb8f393d4_Q50.jpg',
    cover: 'https://www.lihpaoresort.com/LihpaolandApp/LihpaolandUi_Discover/images/pban_ticket.jpg',
    description: {
      introduction: '即訂即用台中麗寶樂園門票，不必排隊購票直接至票亭兌換，輕鬆入場！海陸雙樂園探索世界・馬拉灣・ 天空之夢摩天輪，無論大人、小孩都能盡情玩樂，享受美好時光',
      highlights: ['親臨全台最大海陸空主題樂園，一票玩到底 High翻天', '探索樂園內多種刺激遊樂設施，體驗斷軌雲霄飛車的快感', '不用去海邊也能享受沖浪般的清涼刺激，盡在馬拉灣大海嘯']
    },
    price: 600,
    specialPrice: 590,
    cities: 'taichung',
    location: {
      country: '台灣',
      city: '台中',
    },
    address: '臺中市后里區福容路8號',
    rating: 4.1,
    ratingCount: 1321,
    orderCount: 123223,
    planOption: [
      {
        id: uuidv4(),
        title: '馬拉灣 1 日票 - 水樂園',
        price: 540, //標價
        ticketTime: null,
        ticketTypes: [
          {
            name: '人數',
            limit: '',
            price: '590'
          }
        ],
      }
    ]
  },
]

export default {
  name: 'ProductDetail',
  components: { ProductInfo, ProductCommentCard, ProductOptionPlan },
  data() {
    return {
      product: {},
      plan: {
        product: {},
        planOption: {}
      }
    }
  },
  created() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      const id = Number(this.$route.params.id)
      this.product = dummyData.find(i => i.id === id) || null
      this.plan.planOption = this.product.planOption
      this.plan.product = this.product
    }
  }
}
</script>

<style lang="scss" scoped>
.product-nav-tab {
  display: none;
}

.in-progress-wrapper {
  height: 70vh;
  color: #c26b63;
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  padding-top: 170px;
}

@media screen and (min-width: 996px) {
  .product-description {
    opacity: 0.2;
    margin-top: 100px;
    display: flex;
    flex-direction: row;
  }

  .product-description-container {
    width: calc(100% - 150px);
  }

  .product-nav-tab {
    display: block;
    width: 250px;
  }
}
</style>