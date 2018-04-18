<template>
  <div class="feed-add-map">
    <div class="nav-header">
      <div class="nav-header-left">
        <router-link :to="{name: 'feed_add'}" class="nav-header-back text-lg">
          <i class="fa fa-times"></i>
        </router-link>
      </div>
      <div class="nav-header-right">
        <a class="nav-header-more text-normal text-lg" @click="done">完成</a>
      </div>
    </div>
    <div class="app-container app-container-top">
    <div>
      <baidu-map ref="baiduMap" @ready="searchNearby" style="height:0;"></baidu-map>
    </div>
    <div class="wrapper-sm bg-light">
      <div class="input-group" style="width:100%;">
        <input type="text" class="form-control" v-model="nearbyKey" @keyup="searchNearby" placeholder="输入关键词搜索">
<!--         <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="searchNearby">
          <i class="fa fa-search"></i>
          </button>
        </span> -->
      </div>
    </div>
    <div class="panel wrapper">
      <div class="list-group list-group-unstyle m-t">
        <a class="list-group-item text-lg" @click="onClick()"
        :class="{'active-position': null == activeIndex}">
        <div class="pull-right position-check-icon text-default"><i class="fa fa-check"></i> </div>
          不显示位置
        </a>
        <a class="list-group-item" v-for="(item, index) in nearby" @click="onClick(item, index)" :class="{'active-position': index === activeIndex}">
          <div class="pull-right position-check-icon text-default"><i class="fa fa-check"></i> </div>
          <div class="text-lg">{{item.title}}</div>
          <div class="text-muted">{{item.address}}</div>
        </a>
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
    nearby: null,
    isLoading: false,
    activeIndex: null
  }),
  methods: {
    getCurrentPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(response => {
          if (response.coords) {
          }
        }, error => {
          this.$refs.baiduMap.getCurrentPosition(response => {
            this.position = response
          })
          return Promise.reject(error)
        })
      }
    },
    searchNearby () {
      if (!this.isLoading) {
        this.isLoading = true
        this.$refs.baiduMap.searchNearby(this.nearbyKey, response => {
          this.nearby = response
          this.isLoading = false
        })
      }
    },
    initNearby () {
      this.$refs.baiduMap.initNearby(response => {
        this.nearby = response
      })
    },
    done () {
      this.$emit('click', this.currentValue)
      this.$router.replace({name: 'feed_add'})
    },
    onClick (item, index) {
      this.currentValue = item
      this.activeIndex = index
    }
  }
}
</script>
<style>
  .feed-add-map .position-check-icon {
    display: none;
  }
  .feed-add-map .active-position {
  }
  .feed-add-map .active-position .position-check-icon {
    display: block;
  }
</style>
