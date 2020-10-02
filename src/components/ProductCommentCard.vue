<template>
  <div class="comments-content">
    <div class="comment-card" v-for="(review, index) in reviews" :key="index">
      <div
        class="left"
        v-lazy-container="{
          selector: 'img',
          error: 'https://i.imgur.com/UKLLvH6.png'
        }"
      >
        <img class="editor" :data-src="review.profile_photo_url" alt="" />
      </div>
      <div class="top">
        <Star :rating="review.rating" />
      </div>
      <div class="main">
        <h4>{{ review.author_name }}</h4>

        <input
          type="checkbox"
          :id="`toggleReviewText-${index}`"
          class="toggle-review-text"
          @click="showMore"
        />
        <p class="text review-text" ref="reviewText">
          {{ review.text }}
        </p>
        <span class="date">於 {{ review.time | reviewTime }} 評價</span>
        <label
          class="show-review-text"
          :for="`toggleReviewText-${index}`"
          v-if="review.textLength"
          >more</label
        >
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
  },
  methods: {
    showMore(e) {
      if (e.target.checked) {
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

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

    .date {
      font-size: 0.8rem;
      color: #888;
    }
  }

  .review-text {
    margin: 10px 0 20px 0;
    font-size: 0.85rem;
    letter-spacing: 0.8px;
    line-height: 1.4rem;
    max-height: 46px;
    @include textOverflow(2);
    transition: all 0.3s ease;
  }

  .show-review-text {
    cursor: pointer;
    float: right;
    font-weight: 500;
    margin: -15px 15px 0 0;
    color: $main-gray;
  }

  .toggle-review-text {
    position: absolute;
    display: none;

    &:checked {
      ~ .review-text {
        max-height: 500px;
        display: block;
      }
    }
  }
}
</style>