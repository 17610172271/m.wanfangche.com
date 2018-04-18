<template>
  <div>
    <div class="panel">
      <baidu-map ref="baiduMap" @ready="searchNearby"></baidu-map>
    </div>

    <div class="panel wrapper">
      <button class="btn btn-custom" @click="getCurrentPosition">获取当前坐标</button>
      坐标：{{position}}
    </div>

    <div class="wrapper bg-light">
      <div class="input-group">
        <input type="text" class="form-control" v-model="nearbyKey" placeholder="搜索附近">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="searchNearby">
          <i class="fa fa-search"></i> 搜索
          </button>
        </span>
      </div>
    </div>
    <div class="panel wrapper">
      
      <div class="list-group list-group-unstyle m-t">
        <div class="list-group-item" v-for="item in nearby">
          <div class="text-lg">{{item.title}}</div>
          <div class="text-muted">{{item.address}}</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import BaiduMap from '@/components/baidu-map'
export default {
  components: {
    BaiduMap
  },
  data: () => ({
    position: null,
    nearbyKey: null,
    nearby: null
  }),
  methods: {
    getCurrentPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(response => {
          if (response.coords) {
            console.log(response.coords)
          }
        }, error => {
          this.$refs.baiduMap.getCurrentPosition(response => {
            this.position = response
          })
          console.log(error)
          // return Promise.reject(error)
        })
      }
    },
    searchNearby () {
      this.$refs.baiduMap.searchNearby(this.nearbyKey, response => {
        console.log(response)
        this.nearby = response
      })
    },
    initNearby () {
      this.$refs.baiduMap.initNearby(response => {
        this.nearby = response
      })
    }
  }
}
</script>
