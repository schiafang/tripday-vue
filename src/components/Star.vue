<template>
  <div
    class="star"
    :style="{
      background: `linear-gradient(90deg, #2292A4 ${colorVariables}%, #bebebe ${colorVariables}%)`,
      'background-clip': 'text',
      '-webkit-background-clip': 'text'
    }"
  >
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
  </div>
</template>

<script>
export default {
  name: 'Star',
  props: {
    rating: {
      type: Number,
      default: 5,
      useDefaultForNull: true
    }
  },
  data() {
    return {
      score: 0,
      colorVariables: 100
    }
  },
  created() {
    this.getCssProps()
  },
  methods: {
    getCssProps() {
      this.colorVariables = Math.floor(this.rating / 5 * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.star {
  color: transparent;
  font-size: 1rem;

  i {
    margin-right: 2px;
  }
}
</style>