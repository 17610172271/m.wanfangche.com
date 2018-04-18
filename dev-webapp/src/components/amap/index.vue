<!-- 营地着陆页专用 -->
<template>
  <div class="amap-container" style="height:100%;">
    <el-amap vid="amapDemo" class="amap-demo">
    </el-amap>
    <div>
      <baidu-map ref="baiduMap" style="height:0;"></baidu-map>
    </div>
  </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import { mapGetters, mapActions } from 'vuex'
import api from '@/api'

export default {
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    mapStyle: {
      type: String,
      default: 'light'
    },
    mapCenter: {
      type: Array,
      default () {
        return [116.471317, 39.910244]
      }
    },
    zooms: {
      type: Number,
      default: 9
    },
    type: {
      type: Number,
      default: 1
    },
    bigIcon: {
      type: Number,
      default: 0
    },
    iconImg: {
      type: String,
      default: ''
    },
    iconBigImg: {
      type: String,
      default: ''
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
    locationMarker: {},
    bigicon: 0,
    lng: 116.471317,
    lat: 39.910244,
    user_lng: null,
    user_lat: null,
    distance: 40000,
    info: [],
    markers: [],
    list: [],
    zoom: 9,
    center: [116.471317, 39.910244],
    allMarker: [],
    infoWindow: {},
    X: null,
    Y: null,
    x: null,
    y: null
  }),
  components: {
    BaiduMap
  },
  computed: {
    ...mapGetters({
      navigation: 'navigation'
    })
  },
  methods: {
    ...mapActions([
      'saveNavigation'
    ]),
    initData () {
      this.addMarkers()
      this.addWindowInfo()
    },
    initMap () {
      let self = this

      // 地图加载过一次
      if (this.navigation) {
        if (this.$route.query.location) {
          // 搜索页传location跳转
          if (typeof (this.$route.query.location) === 'string') {
            this.lng = parseFloat(this.$route.query.location.split(',')[0])
            this.lat = parseFloat(this.$route.query.location.split(',')[1])
          } else {
            this.lng = parseFloat(this.$route.query.location.lng)
            this.lat = parseFloat(this.$route.query.location.lat)
          }
        } else {
          // 其他页面跳转
          this.lng = this.navigation.lng
          this.lat = this.navigation.lat
          this.zoom = this.navigation.zoom
          this.distance = this.navigation.distance
          this.type = this.navigation.type
          this.info = this.navigation.infos
          this.markers = this.navigation.markers
        }
        this.user_lng = this.navigation.user_lng
        this.user_lat = this.navigation.user_lat
        this.center = [this.lng, this.lat]
      }
      let _loadApiPromise = lazyAMapApiLoaderInstance.load()
      _loadApiPromise.then(() => {
        this.AMap = AMap
        this.map = new AMap.Map('amapDemo', {
          gridMapForeign: true,
          zoom: this.zoom,
          center: this.center,
          mapStyle: 'amap://styles/' + this.mapStyle
        })
        AMap.event.addListener(this.map, 'moveend', this.moveChange)
        AMap.event.addListener(this.map, 'zoomchange', this.getNewList)
        if (this.navigation) {
          if (this.$route.query.location) {
            self.$parent.getCampList()
          }
          setTimeout(function () {
            self.onGeolocation()
          }, 1000)
        } else {
          self.$parent.getCampList()
        }
      })
    },
    addWindowInfo () {
      if (this.info[this.bigicon]) {
        let {AMap, map} = this
        this.infoWindow = new AMap.InfoWindow({
          content: this.info[this.bigicon].info,  // 使用默认信息窗体框样式，显示信息内容
          offset: new AMap.Pixel(6, -36),
          autoMove: false
        })
        this.infoWindow.open(map, this.markers[this.bigicon])
      }
    },
    addMarkers () {
      let {AMap, map} = this
      let icon = new AMap.Icon({
        image: this.iconImg,
        size: new AMap.Size(24, 32)
      })
      let iconBigImg = new AMap.Icon({
        image: this.iconBigImg,
        size: new AMap.Size(24, 32)
      })
      let markers = this.markers
      this.clearMarker()
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
          this.allMarker.push(marker)
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
          this.allMarker.push(marker)
          AMap.event.addListener(marker, 'click', this.markerClick)
        }
      }
    },
    clearMarker () {
      let { map } = this
      map.remove(this.allMarker)
      this.allMarker = []
    },
    saveInfos () {
      this.saveNavigation({list: {
        lng: this.lng,
        lat: this.lat,
        zoom: this.zoom,
        distance: this.distance,
        user_lng: this.user_lng,
        user_lat: this.user_lat,
        list: this.list,
        type: this.type,
        infos: this.info,
        markers: this.markers
      }})
    },
    markerClick (e) {
      this.bigicon = e.target.F ? e.target.F.vid : e.target.G.vid
    },
    onGeolocation () {
      let { AMap, map } = this
      let self = this
      map.plugin('AMap.Geolocation', function () {
        self.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonPosition: 'RB',
          showMarker: true
        })
        map.addControl(self.geolocation)
        AMap.event.addListener(self.geolocation, 'complete', self.onComplete) // 返回定位信息
        AMap.event.addListener(self.geolocation, 'error', self.onError) // 返回定位出错信息
      })
    },
    // 定位成功
    onComplete (data) {
      this.user_lng = data.position.lng
      this.user_lat = data.position.lat
      this.saveInfos()
    },
    // 定位失败
    onError () {
      console.log('定位失败')
      let self = this
      this.$refs.baiduMap.getCurrentPosition(response => {
        console.log(response)
        self.user_lng = response.longitude || response.point.lng
        self.user_lat = response.latitude || response.point.lat
        self.map.setCenter([self.user_lng, self.user_lat])
        this.locationMarker = new AMap.Marker({
          position: [self.user_lng, self.user_lat],
          icon: 'http://webapi.amap.com/theme/v1.3/markers/b/loc.png',
          offset: new AMap.Pixel(-12, -12),
          vid: 999,
          zIndex: 999
        })
        this.locationMarker.setMap(this.map)
        self.saveInfos()
      })
    },
    moveChange () {
      // this.getNewList
      if (!this.X && !this.Y) {
        let currentLng = this.map.getCenter().lng
        let currentLat = this.map.getCenter().lat
        this.X = this.map.lnglatTocontainer([currentLng, currentLat]).getX()
        this.Y = this.map.lnglatTocontainer([currentLng, currentLat]).getY()
      }
      // console.log(this.X, this.Y, '大')
      this.x = this.map.lnglatTocontainer([this.lng, this.lat]).getX()
      this.y = this.map.lnglatTocontainer([this.lng, this.lat]).getY()
      // console.log(this.x, this.y, '小')
      let levelVal, verticalVal
      levelVal = Math.abs(this.x - this.X)
      verticalVal = Math.abs(this.y - this.Y)
      // console.log(levelVal, verticalVal, 123)
      let absVal = Math.sqrt(levelVal * levelVal + verticalVal * verticalVal)
      if (absVal > 20) {
        this.$router.replace({name: 'camp'})
        this.getNewList()
      }
      this.X = this.x
      this.Y = this.y
    },
    getNewList () {
      this.$parent.slideTo0()
      this.clearMarker()
      this.map.remove(this.infoWindow)
      this.lng = this.map.getCenter().lng
      this.lat = this.map.getCenter().lat
      this.zoom = this.map.getZoom()
      let width = this.map.getSize().width * this.map.getResolution()
      let height = this.map.getSize().height * this.map.getResolution()
      this.distance = (width < height ? width : height) / 2
      this.axios.get(api.camp.list, {
        params: {
          type: this.type,
          lng: this.lng,
          lat: this.lat,
          user_lng: this.user_lng || this.lng,
          user_lat: this.user_lat || this.lat,
          sort: 'recommend',
          distance: this.distance,
          search: null
        }
      })
      .then(response => {
        if (response.data.code === 1) {
          this.bigicon = 0
          this.markers = []
          this.info = []
          this.list = response.data.data
          this.list.forEach(val => {
            this.info.push({
              info: val.name,
              position: [val.lng, val.lat]
            })
          })
          this.list.map(val => {
            this.markers.push([parseFloat(val.lng), parseFloat(val.lat)])
          })
          this.saveInfos()
          this.initData()
          this.$emit('updateList')
        } else if (response.data.msg === '找不到更多数据') {
          this.list = []
          this.saveInfos()
          this.$emit('updateList')
        }
      })
    }
  },
  mounted () {
    this.initMap()
  },
  created () {
  },
  watch: {
    value (val) {
      this.bigicon = 0
      this.map.remove(this.infoWindow)
      let self = this
      this.markers = val
      if (!this.navigation) {
        setTimeout(function () {
          self.onGeolocation()
          self.geolocation.getCurrentPosition()
        }, 1000)
      }
    },
    markers (val) {
      let self = this
      setTimeout(function () {
        self.initData()
      }, 200)
    },
    bigicon (val) {
      this.initData()
      this.$emit('iconChange', val)
    },
    bigIcon (val) {
      this.bigicon = val
    },
    infos (val) {
      this.info = val
    },
    zooms (val) {
      this.zoom = val
    },
    mapCenter (val) {
      this.center = val
    }
  }
}
</script>
