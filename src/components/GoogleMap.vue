<template>
  <div id="map" class="container" ref="map">
    <iframe
      width="600"
      height="450"
      frameborder="0"
      style="border:0"
      src="https://www.google.com/maps/embed/v1/place
  ?key=AIzaSyDwGaoSVshfHtms96rBuE8jMM12lZ3uPsI
  &q=taoyuan+Xpark"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<style lang="scss" scoped>
.mapouter {
  position: relative;
  text-align: right;
  height: 500px;
  width: 600px;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 500px;
  width: 600px;
}
#map {
  width: 600px;
  height: 400px;
}
</style>