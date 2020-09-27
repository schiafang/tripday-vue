<template>
  <div class="favorite-icon-wrapper">
    <i
      v-if="!isAuthenticated || !favoriteProducts.includes(id)"
      class="far fa-heart add-favorite favorite-icon"
      @click.stop.prevent="addFavorite(id)"
    ></i>
    <i
      v-else
      class="fas fa-heart remove-favorite favorite-icon"
      @click.stop.prevent="removeFavorite(id)"
    ></i>
    <div
      class="sign-tip"
      ref="signTip"
      :style="{
        opacity: 0,
        transition: 'opacity .2s ease-in-out'
      }"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['favoriteProducts', 'isAuthenticated'])
  },
  methods: {
    addFavorite(id) {
      if (this.isAuthenticated) {
        this.$store.commit('addFavorite', id)
      } else {
        this.$refs.signTip.style.opacity = 1
        setTimeout(() => { this.$refs.signTip.style.opacity = 0 }, 1500)
        return
      }
    },
    removeFavorite(id) {
      if (this.isAuthenticated) {
        this.$store.commit('removeFavorite', id)
      } else {
        this.$refs.signTip.style.opacity = 1
        setTimeout(() => { this.$refs.signTip.style.opacity = 0 }, 1500)
        return
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_base.scss';

.favorite-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  color: $gray;
  font-size: 1.2rem;
  z-index: 1;
  @include flexCenter;

  &:hover {
    cursor: pointer;
  }

  &.remove-favorite {
    color: $pink;
  }
}

.sign-tip {
  position: absolute;
  right: -15px;
  top: -15px;

  &::after {
    content: '請先登入';
    font-size: 0.9rem;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: $pink;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
  }
}

/** ProductInfo Page heart */
.heart-wrapper .favorite-icon {
  position: static;
  font-size: 1.6rem;
}
</style>