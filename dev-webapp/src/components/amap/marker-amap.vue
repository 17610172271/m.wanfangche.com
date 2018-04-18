<!-- 地图及标点 -->
<template>
  <div class="c-amap-container">
    <el-amap vid="amapMarker" class="amap-demo">
      <!-- <el-amap-marker :position="mapCenter" :icon="bigIcon" :offset="offset"></el-amap-marker> -->
    </el-amap>
  </div>
</template>
<script>
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  export default {
    props: {
      value: {
        type: Array,
        default () {
          return [116.471317, 39.910244]
        }
      },
      zoom: {
        type: Number,
        default: 12
      },
      bigIcon: {
        type: String,
        default: 'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png'
      }
    },
    data: () => ({
      mapCenter: [116.471317, 39.910244],
      map: {},
      AMap: {},
      data: [],
      flag: false
    }),
    methods: {
      initMap () {
        let self = this
        let _loadApiPromise = lazyAMapApiLoaderInstance.load()
        _loadApiPromise.then(() => {
          this.AMap = AMap
          this.map = new AMap.Map('amapMarker', {
            gridMapForeign: true,
            zoom: self.zoom,
            center: self.mapCenter
          })
          // this.addMarker()
        })
      },
      addMarker () {
        let self = this
        let {AMap, map} = this
        let icon = new AMap.Icon({
          image: this.bigIcon,
          size: new AMap.Size(64, 70)
        })
        let marker = new AMap.Marker({
          position: self.mapCenter,
          icon: icon,
          offset: new AMap.Pixel(-32, -70)
        })
        marker.setMap(map)
      }
    },
    mounted () {
      this.initMap()
    },
    created () {
      let self = this
      setTimeout(function () {
        if (!self.flag) {
          self.mapCenter = self.value
          self.map.setCenter(self.mapCenter)
          self.addMarker()
        }
      }, 1500)
    },
    watch: {
      value (val) {
        if (val.length > 0) {
          this.flag = true
          this.mapCenter = val
          this.addMarker()
          this.map.setCenter(val)
        }
      }
    }
  }
</script>
<style>
  .c-amap-container {
    height: 100%;
  }
</style>
