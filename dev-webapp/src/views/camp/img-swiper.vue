<template>
  <div v-if="">
  <div class="nav-header" style="background:#000;">
    <div class="nav-header-left">
      <a class="nav-header-back" href="javascript:" @click="imgShow()">
        <img src="../../assets/icon_back_white.png">
        &nbsp;</a>
    </div>
    <h1 class="nav-header-title" style="color:#FFFFFF;font-size:17px;">
    <span v-if="imgind === 999">1</span><span v-else>{{imgind + 1}}</span>/{{imgslist.length}}
    </h1>
    <div class="nav-header-right">
      <a class="nav-header-more"></a>
    </div>
  </div>
  <div class="swiperMax swiperMaxs" style="height:260px;overflow-y:hidden;">
    <swiper :options="swiperOption" v-if="!isWx">
      <swiper-slide style="float:left;height:260px;overflow:hidden;width:100%; position:relative;" v-for="(item, index) in imgslist" :key="item.id">
        <img class="preview-img" :src="item.srcs | ossResize('large') || 'http://img01.wanfangche.com/public/upload/201802/07/5a7a9b23a81d1.png?x-oss-process=style/middle'" style="height:auto;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;" @click="$preview.open(index, imgslist)" >
      </swiper-slide>
    </swiper>
    <swiper :options="swiperOption" v-if="isWx">
      <swiper-slide style="float:left;height:260px;overflow:hidden;width:100%; position:relative;" v-for="(item, index) in wximglist" :key="item.id" >
        <img class="preview-img" :src="item | ossResize('large') || 'http://img01.wanfangche.com/public/upload/201802/07/5a7a9b23a81d1.png?x-oss-process=style/middle'" style="height:auto;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;" @click="photoAlbum(item, wximglist)" >
      </swiper-slide>
    </swiper>
  </div>
  <div class="swiper-foot" v-if="userData">
    <div class="sf-img" v-if="userData.author"><img :src="userData.author.avatar | ossResize('small')" alt=""></div>
    <div style="line-height:35px;" v-if="userData.author">{{userData.author.nickname}} 于{{userData.created_at | time}}上传</div>
  </div>
  </div>
</template>
<script>
import { isJson } from '@/tools/util'
import { ossimage } from '@/config'
import api from '@/api'

export default {
  filters: {
    time (val) {
      if (val) {
        var arr = val.split(' ')[0].split('-')
        return arr[0] + '.' + arr[1] + '.' + arr[2]
      }
    }
  },
  components: {
    isJson
  },
  props: {
    ind: 0
  },
  data () {
    let self = this
    return {
      swiperOption: {
        notNextTick: true,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        speed: 500,
        autoplayDisableOnInteraction: false,
        initialSlide: 0,
        onSlideChangeStart: swiper => {
          console.log(swiper.activeIndex)
          self.imgind = swiper.activeIndex
        }
      },
      imgslist: [],
      isWx: null,
      wximglist: [],
      imgind: 0,
      userData: {
        author: {
          avatar: '',
          nickname: ''
        }
      },
      lists: [],
      list: []
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
    },
    imgShow () {
      this.swiperOption = {}
      this.$emit('imgShow', false)
    },
    getImgList () {
      this.axios.get(api.camp.imgList, {params: {id: this.ind}})
      .then(response => {
        if (response.data.code === 1 && response.data.data.list) {
          this.list = response.data.data.list
          this.lists = response.data.data.list
          this.imgind = 999
          let list = this.list
          for (var i = 0; i < list.length; i++) {
            this.imgslist.push(this.imginfo(list[i].img, i))
            this.wximglist.push(list[i].img)
          }
        }
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
    this.getImgList()
  },
  watch: {
    imgind (val) {
      if (val === 999) {
        val = 0
      }
      for (var i = 0; i < this.lists.length; i++) {
        if (val === i) {
          this.userData = this.lists[i]
        }
      }
    },
    ind (val) {
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
