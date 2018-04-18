<template>
  <div class="banner">
     <img class="img" :src="image_url">
  </div>
</template>

<script>
import { HOME_BANNER_IMAGE } from '@/config'
export default{
  data () {
    return {
      image_url: HOME_BANNER_IMAGE
    }
  }
}
</script>

<style>
.banner{
  width: 100%;
  margin: 0 auto;
  top:0;
  max-height: 18rem;
  background: #000;
  overflow: hidden;
  z-index: -200;
}
.banner img {
  width: 100%;
  height: auto;
  position: relative;
}
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
