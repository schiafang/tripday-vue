<template>
  <div id="app">
    <v-app>
      <Navbar />

      <div class="main-container">
        <router-view />
        <Spinner v-if="isLoading" />
      </div>

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
  computed: {
    ...mapState(['isLoading'])
  },
}
</script>

<style lang="scss">
@import 'assets/scss/main.scss';
</style>
