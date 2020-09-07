<template>
  <div id="app">
    <v-app>
      <Navbar />

      <div class="main-container">
        <router-view />
      </div>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: { Navbar, Footer }
}
</script>

<style lang="scss">
@import 'assets/scss/main.scss';
</style>
