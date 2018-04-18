<template>
  <div class="browser-container">
    <div class="browser" v-if="isWx">
      <a class="camp-goback" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png" width="11px">
      </a>
      <div class="arrows"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf4cd26.png?x-oss-process=style/large" alt=""></div>
      <div v-if="isIOS">
        <div class="warn-txt">请在菜单中选择在浏览器中打开, 以完成导航</div>
        <div class="browser-img"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf6bb38.png?x-oss-process=style/small" alt=""></div>
      </div>
      <div v-if="!isIOS">
        <div class="warn-txt1">
          1.点击右上角<span class="more-icon"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf3b423.png?x-oss-process=style/small" alt=""></span>
        </div>
        <div class="warn-txt2">
          2.选择在浏览器中打开 以完成导航
        </div>
        <div class="browser-img2"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf5d920.png?x-oss-process=style/small" alt=""></div>
      </div>
    </div>
    <div v-if="!isWx" class="amap-container">
      <a class="camp-goback" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png" width="11px">
      </a>
      <div class="go-navigation" v-show="!mapShow">
        <input type="text" class="navigation-ipt" disabled v-model="address">
        <a href="javascript:;" @click="mapShow=true" class="navigation-btn text-md text-bolder pull-right">导航</a>
      </div>
      <marker-amap v-model="mapCenter" :zoom="zoom" :bigIcon="icon"></marker-amap>
      <popup v-model="mapShow" position="bottom" style="width:96%;left:2%;border-radius:4px;z-index:999">
        <ul class="openMap">
          <li v-show="isIos"><a :href="'iosamap://navi?sourceApplication=appname&amp;poiname=' + address + '&amp;lat=' + lat + '&amp;lon=' + lng + '&amp;dev=1&amp;style=2'">高德地图</a></li>
          <li v-show="!isIos"><a :href="'androidamap://navi?sourceApplication=appname&amp;poiname=' + address + '&amp;lat=' + lat + '&amp;lon=' + lng + '&amp;dev=1&amp;style=2'">高德地图</a></li>
          <li><a :href="'baidumap://map/navi?query=' + address">百度地图</a></li>
          <li><a href="sosomap://">腾讯地图</a></li>
          <li @click="mapShow=false">取消</li>
        </ul>
      </popup>
    </div>
  </div>
</template>
<script>
  import { isIOS, isWechat } from '@/tools/device'
  import { Popup } from 'vux'
  import markerAmap from '@/components/amap/marker-amap'

  export default {
    components: {
      Popup,
      markerAmap
    },
    data: function () {
      return {
        address: '',
        comfirmShow: false,
        isIos: false,
        isShow: false,
        mapShow: false,
        zoom: 12,
        mapCenter: [116.477416, 39.913117],
        marker: [116.477416, 39.913117],
        lng: 116.477416,
        lat: 39.913117,
        offset: [-32, -70],
        type: 1,
        icon: 'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png?x-oss-process=style/large'
      }
    },
    methods: {
      getData () {
        if (this.$route.query.lng && this.$route.query.lat) {
          this.lng = parseFloat(this.$route.query.lng)
          this.lat = parseFloat(this.$route.query.lat)
          this.type = parseFloat(this.$route.query.type)
          this.editIcon()
          let self = this
          setTimeout(function () {
            self.mapCenter = [self.$route.query.lng, self.$route.query.lat]
          }, 20)
          this.marker = [this.$route.query.lng, this.$route.query.lat]
        }
        if (this.$route.query.location && this.$route.query.name) {
          let location = this.$route.query.location
          if (typeof (location) === 'string') {
            this.lng = location.split(',')[0]
            this.lat = location.split(',')[1]
            this.mapCenter = [location.split(',')[0], location.split(',')[1]]
            this.marker = [location.split(',')[0], location.split(',')[1]]
          } else if (typeof (location) === 'object') {
            this.lng = location.lng
            this.lat = location.lat
            this.mapCenter = [location.lng, location.lat]
            this.marker = [location.lng, location.lat]
          }
        }
        this.address = this.$route.query.name
      },
      goBack () {
        this.$router.push({name: 'camp_detail', params: {id: this.$route.query.id}, query: {type: this.$route.query.type}})
      },
      initData () {
        if (isWechat()) {
          this.isWx = true
        } else {
          this.isWx = false
        }
        if (isIOS()) {
          this.isIos = true
        } else {
          this.isIos = false
        }
        this.getData()
      },
      editIcon () {
        let images = [
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd46514f5.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd466fbf7.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4671dd2.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4659555.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4659d74.png?x-oss-process=style/large'
        ]
        this.icon = images[this.$route.query.type]
      }
    },
    created () {
      this.editIcon()
      this.initData()
    },
    watch: {
    }
  }
</script>
<style scoped>
  .browser-container {
    height: 100%;
  }
  .amap-container {
      height: 100%;
      position: relative;
    }
  .navigation-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 666;
  }
  .browser {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-top: 64px;
    position:absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .warn-txt {
    width:271px;
    height:50px; 
    font-size:18px;
    font-family:PingFangSC-Medium;
    color:rgba(60,79,96,1);
    line-height:25px;
    margin: 0px auto 64px;
    text-align: center;
  }
  .browser-img {
    width: 164px;
    height: 164px;
    margin: 0 auto;
  }
  .arrows {
    width: 37px;
    height: 67px;
    position: absolute;
    top: 8px;
    right: 20px;
  }
  .warn-txt1 {
    width: 178px;
    height: 44px;
    line-height: 44px;
    margin: 8px auto 48px;
    font-size:18px;
    font-family:PingFangSC-Medium;
    color:rgba(60,79,96,1);
  }
  .warn-txt1 .more-icon {
    width: 44px;
    height: 44px;
    margin-left: 19px;
    display: inline-block;
    vertical-align: middle;
  }
  .warn-txt2 {
    width:178px;
    height:50px; 
    font-size:18px;
    font-family:PingFangSC-Medium;
    color:rgba(60,79,96,1);
    line-height:25px;
    margin: 0 auto;
    text-align: center;
  }
  .browser-img2 {
    width: 198px;
    height: 154px;
    margin: 20px auto;
    padding-left: 50px;
  }
</style>
