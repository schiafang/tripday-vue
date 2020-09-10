<template>
  <div class="comments-content">
    <div class="comment-card">
      <div class="left">
        <img class="editor" src="../assets/images/default-avatar.svg" alt="" />
      </div>
      <div class="top"><star /> <span>Carey</span></div>
      <div class="main">
        <h4>人很多</h4>
        <p class="text" ref="text" id="text">
          很台式的水族館 ，企鵝很可愛，水母希望有魚缸式的
          不是都圓柱形的，種類也不夠多，販望多點特色商品而不是賣豆乾夠多，販賣部很弱，希望多點特色商品而不是
        </p>
        <!-- <label for="text">more</label> -->
        <span class="date">於 2020/09/10 評價</span>
      </div>
    </div>
  </div>
</template>

<script>
import star from './star'

// var cHeight = document.querySelector('.text')[1].clientHeight
// var sHeight = document.querySelector('.text')[1].scrollHeight
// if (sHeight > cHeight) {
//   console.log('overflow')
// } 

export default {
  name: 'ProductCommentCard',
  components: { star }
}
</script>

<style lang="scss" scoped>
.comment-card {
  width: auto;
  margin: 30px 0;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 40px 1fr;
  grid-template-areas:
    'left top'
    'left main';

  .left {
    grid-area: left;

    .editor {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      padding: 3px;
      border: 1px solid #e6e6e6;
    }
  }

  .top {
    grid-area: top;
    display: flex;

    span {
      font-size: 0.9rem;
      margin-left: 10px;
    }
  }

  .main {
    grid-area: main;
    border-radius: 6px;
    padding: 15px;
    background: #e6e6e6;

    .text {
      margin: 10px 0 20px 0;
      font-size: 0.85rem;
      letter-spacing: 0.8px;
      line-height: 1.4rem;
      max-height: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .date {
      font-size: 0.8rem;
      color: #888;
    }
  }
}
</style>