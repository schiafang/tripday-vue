<template>
  <div class="spinner-content">
    <v-progress-circular
      indeterminate
      color="rgba(34, 146, 164, .8)"
      size="60"
      width="10"
    ></v-progress-circular>
  </div>
</template>

<style>
.spinner-content {
  position: absolute;
  top: 40vh;
  left: calc(50% - 30px);
}
</style>