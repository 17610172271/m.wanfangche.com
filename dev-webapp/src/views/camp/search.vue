<template>
  <div class="camp-search" style="overflow:hidden;">
      <search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :class="{'shadownone': isnone}" @complete="toLoad=false"></search-box>

      <div v-show="toLoad" class="search-content">
        <transition name="fade">
          <div class="amap-page-container" style="height:50%;" v-show="ismap">
            <search-amap :center="mapCenter" :zooms="zoom" v-model="markers" :bigIcon="redIcon" :infos="infos" @iconChange="iconChange"></search-amap>
          </el-amap>
        </div>
      </transition>

      <transition name="fade">
        <div class="map-swiper map-swipers" v-show="ismap">
          <v-touch v-on:swipedown="onTap" class="box"  v-on:swipeup="onSwipeLeft">
            <div class="map-head" @click="onSwipeLeft" v-if="!intop">
              <span class="icon-camp-unfold"></span>
            </div>
            <div class="map-head" @click="onTap" v-if="intop">
              <span class="icon-camp-put-away"></span>
            </div>
          </v-touch>
          <div class="map-body map-bodys address-list" id="address-list" v-show="!istop">
           <div v-for="(item, index) in addresslist" class="address-data" @click="switchAddress(index)">
            <p>{{index + 1}}.{{item.name}} <a class="pull-right" :href="'https://t.m.wanfangche.com/browser?name=' + item.name + '%20&lng=' + item.lng + '&lat=%20' + item.lat"><i class="icon-camp-navigation text-muted"></i></a></p>
            <p><i class="icon-camp-address"></i>{{item.address}}</p>
            <p>
              <router-link :to="{name: 'camp', query: {location: item.location}}"><i class="icon-camp-information"></i>周边营地</router-link>
            </p>
          </div>
        </div>
        <div class="map-body address-list" id="address-list" v-show="istop">
          <div class="address-body">
            <div v-for="(item, index) in addresslist" class="address-data">
              <p>{{index + 1}}.{{item.name}} <a class="pull-right" :href="'https://t.m.wanfangche.com/browser?name=' + item.name + '%20&lng=' + item.lng + '&lat=%20' + item.lat"><i class="icon-camp-navigation text-muted"></i></a></p>
              <p><i class="icon-camp-address"></i>{{item.address}}</p>
              <p>
                <router-link :to="{name: 'camp', query: {location: item.location}}"><i class="icon-camp-information"></i>周边营地</router-link>
              </p>
            </div>
          </div>

        </div>

      </div>
    </transition>
    
    <transition name="fade">
      <div class="foreign-tips" v-show="!ismap">
        <div class="foreign-tip">
          <div class="foreign-tip-title">如需搜索国外目的地，需输入"城市名 目的地"<br>示例：<strong>西雅图 林肯公园</strong></div>
          <div class="foreign-tip-img">
            <img src="http://img01.wanfangche.com/public/upload/201803/08/5aa0a6939d624.png?x-oss-process=style/large" width="100%" alt="">
          </div>
        </div>
      </div>
    </transition>
  </div>
  <loading-car v-show="!toLoad" class="middle" style="top:50px;"></loading-car>
  </div>
</template>
<script>
  import SearchBox from './search-box'
  import Browser from '@/views/Common/browser'
  import LoadingCar from '@/components/loading/car'
  import searchAmap from '@/components/amap/search-amap'
  export default {
    components: {
      SearchBox,
      Browser,
      LoadingCar,
      searchAmap
    },
    data: function () {
      return {
        toLoad: true,
        markers: [],
        redIcon: 0,
        offset: [0, -36],
        infos: [],
        searchOption: {
          city: null,
          citylimit: false,
          lang: 'zh_cn'
        },
        mapCenter: [116.471317, 39.910244],
        lng: 0,
        lat: 0,
        zoom: 9,
        address: '',
        intop: false,
        istop: false,
        addresslist: [],
        ismap: false,
        isnone: true
      }
    },
    computed: {
      _autoComplete () {
        return new AMap.Autocomplete(this.searchOption || {})
      },
      _placeSearch () {
        return new AMap.PlaceSearch(this.searchOption || {})
      },
      _geocoder () {
        return new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
      }
    },
    methods: {
      iconChange (val) {
        this.jump(val)
      },
      onSearchResult (pois) {
        // let latSum = 0
        // let lngSum = 0
        if (pois.length > 0) {
          this.addresslist = pois
          this.toLoad = true
          this.ismap = true
          this.isnone = false
          this.markers = []
          this.infos = []
          pois.forEach(poi => {
            // let {lng, lat} = poi
            // lngSum += lng
            // latSum += lat
            this.markers.push([poi.lng, poi.lat])
            this.infos.push({
              info: poi.name,
              position: [poi.lng, poi.lat]
            })
          })
          // let center = {
          //   lng: lngSum / pois.length,
          //   lat: latSum / pois.length
          // }
          this.mapCenter = [pois[0].lng, pois[0].lat]
        }
      },
      disableTap () {
        this.$refs.tapper.disable('tap')
      },
      enableTap () {
        this.$refs.tapper.enable('tap')
      },
      onSwipeLeft () {
        this.istop = true
        this.isnone = true
        var ins = document.querySelectorAll('.map-swiper')
        if (ins[0].offsetTop > 48) {
          smoothUp()
        }
        let _this = this
        function smoothUp () {
          if (ins[0].offsetTop > 48) {
            ins[0].style.top = ins[0].offsetTop - 7 + 'px'
            setTimeout(smoothUp, 2)
          } else {
            _this.intop = true
          }
        }
      },
      onTap () {
        this.istop = false
        this.isnone = false
        var ins = document.querySelectorAll('.map-swiper')
        let num = document.documentElement.clientHeight / 2 - 45
        if (ins[0].clientHeight > num) {
          smoothUp()
        }
        let _this = this
        function smoothUp () {
          if (ins[0].clientHeight > num) {
            ins[0].style.top = ins[0].offsetTop + 7 + 'px'
            setTimeout(smoothUp, 2)
          } else {
            _this.intop = false
          }
        }
      },
      init () {
        let _this = this
        setTimeout(function () {
          _this.setheight()
        }, 100)
      },
      setheight () {
        var box = document.getElementsByClassName('map-bodys')[0]
        var boxs = document.getElementsByClassName('address-body')[0]
        let num = document.documentElement.clientHeight / 2 - 78
        box.style.height = num + 'px'
        boxs.style.height = document.documentElement.clientHeight - 78 + 'px'
      },
      gohome (ind) {
        this.$router.replace({
          name: 'camp',
          query: {type: ind}
        })
      },
      jump (index) {
        const cateItem = document.querySelectorAll('.address-data')
        // var h = document.documentElement.clientHeight
        // var hone = 0
        // if (h > 670) {
        //   hone = h - 80
        // } else {
        //   hone = h
        // }
        let total = cateItem[index].offsetTop - 20
        let distance = document.getElementById('address-list').scrollTop + 120 // 获取到顶部的距离
        let step = total / 50
        this.redIcon = index // 菜单列表显示当前样式
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown () {
          if (distance < total) {
            distance += step
            document.getElementById('address-list').scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.getElementById('address-list').scrollTop = total
          }
        }
        function smoothUp () {
          if (distance > total) {
            distance -= step
            document.getElementById('address-list').scrollTop = distance
            setTimeout(smoothUp, 10)
          } else {
            document.getElementById('address-list').scrollTop = total
          }
        }
      },
      switchAddress (index) {
        this.redIcon = index
      }
    },
    // mounted () {
    //   document.getElementById('address-list').addEventListener('scroll', this.scrollEvent)
    // },
    created () {
      this.init()
    },
    watch: {
    }
  }
</script>
<style>
  .amap-page-container {
    height: 400px;
  }
</style>
