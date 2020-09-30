<template>
  <div class="spinner-content">
    <v-progress-circular
      indeterminate
      color="rgba(34, 146, 164, 1)"
      size="60"
      width="6"
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