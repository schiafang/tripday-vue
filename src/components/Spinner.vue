<template>
  <div class="spinner-content">
    <v-progress-circular
      indeterminate
      color="#2292A4"
      size="40"
      width="8"
    ></v-progress-circular>
  </div>
</template>

<style>
.spinner-content {
  position: fixed;
  top: 50vh;
  left: calc(50% - 30px);
}
</style>