<template>
  <div class="star">
    <i class="fas fa-star"></i><i class="fas fa-star"></i
    ><i class="fas fa-star"></i><i class="fas fa-star"></i
    ><i class="fas fa-star"></i>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';

.star {
  background: $main-blue;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1rem;

  i {
    margin-right: 2px;
  }
}
</style>