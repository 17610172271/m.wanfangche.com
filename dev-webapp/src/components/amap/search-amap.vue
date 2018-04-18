<!-- 营地着陆页专用 -->
<template>
  <div class="amap-container" style="height:100%;">
    <el-amap vid="amapSearch" class="amap-demo">
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
        return []
      }
    },
    center: {
      type: Array,
      default () {
        return [116.471317, 39.910244]
      }
    },
    zooms: {
      type: Number,
      default: 9
    },
    bigIcon: {
      type: Number,
      default: 0
    },
    infos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data: () => ({
    map: {},
    AMap: {},
    bigicon: 0,
    distance: 40000,
    info: [],
    markers: [],
    list: [],
    zoom: 9,
    mapStyle: 'light'
  }),
  methods: {
    initData () {
      this.addMarkers()
      this.addWindowInfo()
    },
    initMap () {
      let self = this
      let _loadApiPromise = lazyAMapApiLoaderInstance.load()
      _loadApiPromise.then(() => {
        this.AMap = AMap
        this.map = new AMap.Map('amapSearch', {
          gridMapForeign: true,
          zoom: 10,
          center: self.center,
          mapStyle: 'amap://styles/' + this.mapStyle
        })
      })
    },
    addWindowInfo () {
      if (this.info[this.bigicon]) {
        let {AMap, map} = this
        let infoWindow = new AMap.InfoWindow({
          content: this.info[this.bigicon].info,  // 使用默认信息窗体框样式，显示信息内容
          offset: new AMap.Pixel(6, -36),
          autoMove: true
        })
        infoWindow.open(map, this.markers[this.bigicon])
      }
    },
    addMarkers () {
      let {AMap, map} = this
      let icon = new AMap.Icon({
        image: 'http://img01.wanfangche.com/public/upload/201801/25/5a69949ab9c19.png?x-oss-process=style/large',
        size: new AMap.Size(24, 32)
      })
      let iconBigImg = new AMap.Icon({
        image: 'http://img01.wanfangche.com/public/upload/201801/26/5a6ac3613fdcf.png?x-oss-process=style/large',
        size: new AMap.Size(24, 32)
      })
      let markers = this.markers
      map.clearMap()
      for (let i = 0; i < markers.length; i++) {
        if (i !== this.bigicon) {
          let marker = new AMap.Marker({
            position: markers[i],
            icon: icon,
            offset: new AMap.Pixel(0, -36),
            vid: i,
            zIndex: 99
          })
          marker.setMap(map)
          AMap.event.addListener(marker, 'click', this.markerClick)
        } else {
          let marker = new AMap.Marker({
            position: markers[i],
            icon: iconBigImg,
            offset: new AMap.Pixel(0, -36),
            vid: i,
            zIndex: 100
          })
          marker.setMap(map)
          AMap.event.addListener(marker, 'click', this.markerClick)
        }
      }
    },
    markerClick (e) {
      this.bigicon = e.target.F ? e.target.F.vid : e.target.G.vid
    }
  },
  mounted () {
  },
  created () {
  },
  watch: {
    value (val) {
      this.markers = val
      this.bigicon = 0
      this.initMap()
    },
    markers (val) {
      let self = this
      setTimeout(function () {
        self.initData()
      }, 200)
    },
    bigicon (val) {
      this.initData()
      this.map.setCenter(this.markers[this.bigicon])
      if (this.bigIcon !== val) {
        this.$emit('iconChange', val)
      }
    },
    bigIcon (val) {
      this.bigicon = val
    },
    infos (val) {
      this.info = val
    },
    zooms (val) {
      this.zoom = val
    }
  }
}
</script>
