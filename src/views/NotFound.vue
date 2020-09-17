<template>
  <div class="wrapper">
    <h1>
      Page Not Found :(
    </h1>
    <router-link to="/">
      <v-btn color="#2292A4" class="back-home" fab large dark>
        <i class="icon-home"></i>
      </v-btn>
    </router-link>
  </div>
</template>
<style scoped>
.wrapper {
  height: 60vh;
  text-align: center;
  padding-top: 100px;
  background: #f0f0f0;
}

.back-home {
  margin-top: 50px;
}

.icon-home {
  font-size: 26px;
  font-weight: 800;
  opacity: 0.8;
}
</style>
