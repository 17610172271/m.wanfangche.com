<template>
  <div class="demo-loading">
    <div class="">
      <div class="scroll-x">
        <div class="scroll-x-md btn-group">
          <a @click="show = 1" class="btn btn-custom">LOGO1</a>
          <a @click="show = 6" class="btn btn-custom">LOGO2</a>
          <a @click="show = 2" class="btn btn-custom">DOT Move</a>
          <a @click="show = 3" class="btn btn-custom">DOT Show</a>
          <a @click="show = 4" class="btn btn-custom">Circle</a>
          <a @click="show = 5" class="btn btn-custom">On the Road</a>
          <a @click="show = 7" class="btn btn-custom">Popup</a>
          <a @click="show = 8" class="btn btn-custom">Moving Road</a>
          <a @click="show = 9" class="btn btn-custom">DOT Small 2 Big</a>
        </div>
      </div>
    </div>
    <div class="wrapper text-center" v-show="show == 1">
        <loading-logo></loading-logo>
    </div>
    <div class="wrapper text-center" v-show="show == 6">
        <loading-logo2></loading-logo2>
    </div>
    <div class="wrapper text-center" v-show="show == 2">
      <loading-dot-move></loading-dot-move>
    </div>
    <div class="wrapper text-center" v-show="show == 3">
      <loading-dot-show></loading-dot-show>
    </div>
    <div class="wrapper"  v-show="show == 4">
      <loading-bottom></loading-bottom>
    </div>

    <div class="wrapper"  v-show="show == 5">
      <loading-car></loading-car>
    </div>
    <div class="wrapper text-center"  v-show="show == 7">
      <loading-popup></loading-popup>
    </div>
    <div class="wrapper text-center"  v-show="show == 8">
      <loading-road></loading-road>
    </div>
    <div class="wrapper text-center"  v-show="show == 9">
      <loading-dotsmall2big></loading-dotsmall2big>
    </div>

  </div>
</template>
<script>
import LoadingLogo from '@/components/loading/logo'
import LoadingLogo2 from '@/components/loading/logo2'
import LoadingDotMove from '@/components/loading/dot-move'
import LoadingDotShow from '@/components/loading/dot-show'
import LoadingBottom from '@/components/loading/bottom'
import LoadingCar from '@/components/loading/car'
import LoadingPopup from '@/components/loading/popup'
import LoadingRoad from '@/components/loading/road'
import LoadingDotsmall2big from '@/components/loading/dotsmall2big'

export default {
  components: {
    LoadingLogo,
    LoadingLogo2,
    LoadingDotMove,
    LoadingDotShow,
    LoadingBottom,
    LoadingCar,
    LoadingPopup,
    LoadingRoad,
    LoadingDotsmall2big
  },
  data: () => ({
    show: 5
  })
}
</script>
<style lang="scss">
.btn-group .btn-custom {
  border: 1px solid #f1751b;
}
.demo-loading .wrapper {
  min-height: 200px;
}
.scroll-x {
  width: 100%;
  overflow-x: scroll;
}
.scroll-x-md {
  display: flex;
  width: auto;
  padding: 10px 10px;
}
</style>
