<template>
  <div class="baner">
     <img class="img" :src="imgsrc">
      <!-- <swiper :list="images" auto style="" height="144px" :show-dots="false"></swiper> -->
  </div>
</template>

<script>
import { Swiper } from 'vux'
import { HOME_BANNER_IMAGE } from '@/config'

export default{
  components: {
    Swiper
  },
  data () {
    return {
      name: 'baner',
      images: [],
      imgsrc: ''
    }
  },
  created () {
    this.imgsrc = HOME_BANNER_IMAGE
  }
}
</script>

<style>
.baner{
  width: 100%;
  margin: 0 auto;
  top:0;
  max-height: 18rem;
  background: #000;
  overflow: hidden;
  z-index: -200;
}
.baner img {
  width: 100%;
  height: auto;
  position: relative;
}
</style>
