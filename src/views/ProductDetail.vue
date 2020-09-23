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
          <div class="description-block">
            <div class="description-title">
              體驗地點
            </div>

            <div class="description-place">
              <div class="place-title">
                <span> 地點名稱：{{ product.placeTitle }} </span>
                地址：{{ product.address }}
              </div>
              <div class="place-detail">
                <!-- <iframe
                  class="google-map-frame"
                  frameborder="0"
                  :src="googleEmbed"
                  allowfullscreen
                >
                </iframe> -->

                <div class="place-detail-info">
                  <span>如何抵達</span>
                  <p v-for="(transit, index) in product.transit" :key="index">
                    {{ transit }}
                  </p>
                  <p>自行開車（假日車潮眾多易塞車，建議搭乘大眾交通工具前往</p>
                </div>
                <div class="place-detail-info">
                  <span>
                    開放時間
                  </span>
                  <p v-for="(weekday, index) in openingWeekday" :key="index">
                    {{ weekday }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="description-block">
            <div id="description-reviews" ref="productComents">
              <ProductCommentCard :reviews="reviews" />
            </div>
          </div>
        </div>
        <div class="product-nav-tab">nav tab</div>
      </div>
    </div>

    <!--商品資料建立中-->
    <div v-else class="in-progress-wrapper">
      <i class="fas fa-hammer"></i> In progress
    </div>
  </div>
</template>

<script type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwGaoSVshfHtms96rBuE8jMM12lZ3uPsI&libraries=places"></script>

<script>
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import ProductInfo from '../components/ProductInfo'
import ProductCommentCard from '../components/ProductCommentCard'
import ProductOptionPlan from '../components/ProductOptionPlan'
import placeDetailAPI from '../apis/placeDetail'

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
    placeTitle: 'Xpark',
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
    ],
    transit: ['桃園捷運：A18 站下車，徒步約8分鐘', '高鐵：桃園站6號出口，徒步約9分鐘', '公車：高鐵桃園站下車，徒步約10分鐘']
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
    placeTitle: '麗寶樂園',
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
      },
      googleEmbed: '',
      openingWeekday: [],
      reviews: []
    }
  },
  // watch: {
  //   product: {
  //     handler(e) {
  //       console.log(e)
  //     },
  //     deep: true
  //   }
  // },
  async created() {
    this.fetchProduct()
    this.getPlaceDetail()
    this.googleEmbed = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDwGaoSVshfHtms96rBuE8jMM12lZ3uPsI&q=${this.product.address}`
  },
  methods: {
    async fetchProduct() {
      const id = Number(this.$route.params.id)
      this.product = dummyData.find(i => i.id === id) || null
      this.plan.planOption = this.product.planOption
      this.plan.product = this.product
    },
    async getPlaceDetail() {
      try {
        const res = await placeDetailAPI.getPlaceID(this.product.placeTitle)
        const placeID = res.data.candidates[0].place_id
        const placeDetail = await placeDetailAPI.getPlaceDetail(placeID)
        this.openingWeekday = placeDetail.data.result.opening_hours.weekday_text
        this.product.rating = placeDetail.data.result.rating

        this.reviews = placeDetail.data.result.reviews.sort((a, b) => b.time - a.time)


        // this.product.review = []
        // this.product.review.push(this.reviews[0]) //最新一則評論
        // this.$set(this.product, 'review', [...this.reviews[0]])
        console.log(placeDetail.data.result.reviews.time)
        let test = 1600517139 * 1000
        console.log('test', moment(test).format('YYYY-MM-DD'))
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.google-map {
  width: 100%;
  height: 400px;
}

.product-nav-tab {
  display: none;
}

.description-block {
  padding: 45px 0;
  border-bottom: 1px solid $border-gray;
}

.description-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.description-place {
  border: 1px solid $border-gray;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-content: center;

  .place-title {
    padding: 15px;
    color: $main-gray;
    font-size: 0.9rem;
    border-bottom: 1px solid $border-gray;

    span {
      color: $main-black;
      display: block;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .place-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .google-map-frame {
    width: 100%;
    height: 350px;
    border-radius: 4px;
    margin-bottom: 30px;
  }

  .place-detail-info {
    margin: 15px 0;
    width: 100%;
    display: block;
    font-size: 0.8rem;
    line-height: 0.6rem;

    span {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }
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
    // opacity: 0.2;
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