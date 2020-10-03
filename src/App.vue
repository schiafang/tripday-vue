<template>
  <div id="app">
    <v-app>
      <Navbar />

      <div class="main-container">
        <router-view />
        <Spinner v-if="isLoading" />
      </div>
      <transition name="fade">
        <button class="back-to-top" v-show="topBtn" @click.stop="scrollTop">
          <i class="icon-arrow-up"></i>
        </button>
      </transition>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: { Navbar, Footer, Spinner },
  data() {
    return {
      topBtn: false
    }
  },
  computed: {
    ...mapState(['isLoading'])
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.topBtn = window.pageYOffset > 200 ? true : false
    })
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
.back-to-top {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 50px;
  right: 15px;
  border-radius: 3px;
  background-color: rgba(180, 180, 180, 0.5);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

  i {
    font-weight: 900;
    color: #fff;
  }

  &:hover {
    background-color: #666;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>