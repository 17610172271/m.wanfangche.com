<template>
  <div class="swiperMax">
    <swiper :options="swiperOption" v-if="!isWx">
      <swiper-slide style="float:left;height:260px;overflow-y:hidden; position:relative;" v-for="(item, index) in imgslist" :key="item.id">
        <img class="preview-img" :src="item.srcs | ossResize('large')" style="height:auto;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;" @click="$preview.open(index, imgslist)" >
      </swiper-slide>
    </swiper>
    <swiper :options="swiperOption" v-if="isWx">
      <swiper-slide style="float:left;height:228px;overflow-y:hidden; position:relative;" v-for="(item, index) in wximglist" :key="item.id" >
        <img class="preview-img" :src="item" style="height:auto;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;" @click="photoAlbum(item, wximglist)" >
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { isJson } from '@/tools/util'
import { ossimage } from '@/config'

export default {
  components: {
    isJson
  },
  props: {
    list: ''
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 2000,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        speed: 1000,
        autoplayDisableOnInteraction: false,
        initialSlide: 0
      },
      imgslist: [],
      isWx: null,
      wximglist: []
    }
  },
  methods: {
    imginfo (imgsrc, ind) {
      var img = new Image()
      var srclist = {
        src: '',
        w: '',
        h: ''
      }
      img.src = imgsrc
      srclist.src = img.src + ossimage.large
      srclist.srcs = img.src
      srclist.id = ind
      img.onload = function () {
        srclist.w = img.width
        srclist.h = img.height
      }
      return srclist
    },
    close (ind, list) {
      this.$preview.close(1, this.imgslist)
    },
    photoAlbum (src, list) {
      window.WeixinJSBridge.invoke('imagePreview', {
        'urls': list.map(src => {
          return src + '_ytsy'
        }),
        'current': src + '_ytsy'
      })
    }
  },
  created () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > 0) {
      this.isWx = true
    } else {
      this.isWx = false
    }
  },
  watch: {
    list (val) {
      if (isJson(val)) {
        this.wximglist = JSON.parse(val)
        let list = JSON.parse(val)
        for (var i = 0; i < list.length; i++) {
          this.imgslist.push(this.imginfo(list[i], i))
        }
      }
    }
  }
}
</script>
<style>
  .swiperMax{
    width: 100%;
    overflow-x:hidden;
  }
</style>
