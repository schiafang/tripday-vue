<template>
  <div class="favorite-icon-wrapper">
    <div
      class="sign-tip"
      ref="signTip"
      :style="{
        opacity: 0,
        zIndex: 2,
        transition: 'opacity .2s ease-in-out'
      }"
    ></div>
    <i
      v-if="!isAuthenticated || !favoriteProducts.includes(id)"
      class="far fa-heart add-favorite favorite-icon"
      @click.stop.prevent="addFavorite(id)"
    ></i>
    <transition name="popup">
      <i
        v-if="isAuthenticated && favoriteProducts.includes(id)"
        class="fas fa-heart remove-favorite favorite-icon"
        @click.stop.prevent="removeFavorite(id)"
      ></i>
    </transition>
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
        setTimeout(() => {
          this.$refs.signTip.style.opacity = 0
          this.$EventBus.$emit('openSignForm', true)
        }, 800)
        return
      }
    },
    removeFavorite(id) {
      if (this.isAuthenticated) {
        this.$store.commit('removeFavorite', id)
      } else {
        this.$refs.signTip.style.opacity = 1
        setTimeout(() => {
          this.$refs.signTip.style.opacity = 0
          this.$EventBus.$emit('openSignForm', true)
        }, 800)
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
  font-size: 1rem;
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
  right: 28px;
  top: 28px;

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
.heart-wrapper {
  position: relative;
  top: -30px;
  transform: scale(1.5);
}

@keyframes popup {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-name: popup;
  animation-timing-function: ease-in-out;
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>