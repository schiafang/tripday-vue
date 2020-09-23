<template>
  <div class="comments-content">
    <div class="comment-card" v-for="(review, index) in reviews" :key="index">
      <div class="left">
        <img class="editor" :src="review.profile_photo_url" alt="" />
      </div>
      <div class="top">
        <Star :rating="review.rating" /> <span>{{ review.rating }}</span>
      </div>
      <div class="main">
        <h4>{{ review.author_name }}</h4>
        <p class="text" ref="text" id="text">
          {{ review.text }}
        </p>
        <!-- <label for="text">more</label> -->
        <span class="date">於 {{ review.time | reviewTime }} 評價</span>
      </div>
    </div>
  </div>
</template>

<script>
import Star from './Star'
import moment from 'moment'

export default {
  name: 'ProductCommentCard',
  components: { Star },
  props: {
    reviews: {
      type: Array
    }
  },
  filters: {
    reviewTime: function (value) {
      if (!value) return ''
      return value = moment(value * 1000).format('YYYY-MM-DD')
    }
  }
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