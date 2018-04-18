<template>
  <div class="camp-home">
 
    <div class="amap-page-container">
      
      <!-- 类型展开 -->
      <transition name="fade-h">
        <div class="camp-type-list" v-show="typelistShow">
          <ul>
            <li v-for="(item,index) in typelist" :key="index" :class="{'active': item.value === type}" @click="getCampList(item.value, item.name)">
              <span v-show="item.value === type" class="icon-camp-confirm"></span>
              <span v-show="item.value !== type"></span>
              {{item.name}}
            </li>
          </ul>
        </div>
      </transition>
      <div class="addbox" @click="searchBtn()" v-if="searchlistShow"></div>

      <!-- 排序展开 -->
      <transition name="fade-h">
        <div class="camp-type-list" v-show="searchlistShow">
          <ul>
            <li v-for="(item,index) in searchlist" v-if="!(locationF&&(index==1))" :key="index" :class="{'active': item.value === searchind}" @click="searchList(item)">
              <span v-show="item.value === searchind" class="icon-camp-confirm"></span>
              <span v-show="item.value !== searchind"></span>
              {{item.name}}
            </li>
          </ul>
        </div>
      </transition>
      <div class="addbox" @click="typeBtn()" v-if="typelistShow"></div>
      

      <transition name="fade-h">
        <div v-show="!istop" class="bg-white camp-home-top">
          <div class="search-tab">
            <ul class="camp-nav clear">
              <li @click="getCampList(1, '营地')" class="text-md text-bold" :class="{'color-camp': type == 1}"><i class="icon-camp-camp v-a-m" v-show="type == 1"></i>营地</li>
              <li @click="getCampList(0, '停车')" class="text-md text-bold" :class="{'color-park': type == 0}"><i class="icon-camp-park v-a-m" v-show="type == 0"></i>停车</li>
              <li @click="getCampList(2, '景点')" class="text-md text-bold" :class="{'color-scenic': type == 2}"><i class="icon-camp-scenic v-a-m" v-show="type == 2"></i>景点</li>
              <li @click="getCampList(3, '美食')" class="text-md text-bold" :class="{'color-food': type == 3}"><i class="icon-camp-food v-a-m" v-show="type == 3"></i>美食</li>
              <li @click="getCampList(4, '维修')" class="text-md text-bold" :class="{'color-fix': type == 4}"><i class="icon-camp-service v-a-m" v-show="type == 4"></i>维修</li>
              <li @click="getCampList(5, '加油')" class="text-md text-bold" :class="{'color-refuel': type == 5}"><i class="icon-camp-station v-a-m" v-show="type == 5"></i>加气</li>
            </ul>
          </div>
          <div class="search-btn">
            <router-link :to="{name: 'camp_search'}"><span class="fd-search"></span></router-link>
          </div>
          <div class="search-btn-shadow"></div>
        </div>
      </transition>

      <transition name="fade-b">
        <div v-show="istop" class="s-head">

            <div class="nav-header">
               <div class="nav-header-left">
                 <a class="nav-header-back" href="javascript:" @click="goBack">
                   <img src="../../assets/icon_back.png">
                   &nbsp;</a>
               </div>
               <h1 class="nav-header-title">
                 附近
               </h1>
             </div>

            <div class="filter-container" style="top:45px;">
              <div class="btn-toolbar">
                <div class="btn-group btn-group-justified">
                  <a class="btn text-normal" @click="typeBtn()">{{typeTxt}}
                    <i class="glyphicon glyphicon-triangle-bottom text-small" v-if="!typelistShow"></i>
                    <i class="glyphicon glyphicon-triangle-top text-small" v-else></i></a>
                  <a class="btn text-normal" @click="searchBtn()">{{srarchTit}}&nbsp;<i class="glyphicon glyphicon-triangle-bottom text-small" v-if="!searchlistShow"></i><i class="glyphicon glyphicon-triangle-top text-small" v-else></i></a>
                </div>
              </div>
              <div class="drop-down"></div>
            </div>
        </div>
      </transition>
      
      <transition name="fade">
        <amap ref="gdMap" :mapStyle="mapStyle" :center="mapCenter" :zooms="zoom" :type="type" v-model="markers" :bigIcon="bigIcon" :iconImg="iconImg" :iconBigImg="iconBigImg" :infos="infos" @updateList="updateList" @iconChange="iconChange"></amap>
      </transition>
    </div>

    <div class="map-swiper map-swipers map-swipera">
          <v-touch v-on:swipedown="onTap" class="box"  v-on:swipeup="onSwipeLeft">
          <div class="map-head" @click="onSwipeLeft" v-if="!intop">
            <span class="icon-camp-unfold"></span>
          </div>
          <div class="map-head" @click="onTap" v-if="intop" style="height:30px;">
            <span class="icon-camp-put-away"></span>
          </div>
          </v-touch>
          <div class="map-body map-bodya" v-show="!istop">
            <swiper :options="swiperOption" ref="mySwiper">
              <div v-show="list.length==0" class="camp-list-none">
                本区域内还没有营地<br>拖动地图看看其他地方
              </div>
              <swiper-slide style="float:left;height:96px;overflow-y:hidden; position:relative;" v-for="(item,index) in list" :key="item.id"  class="camp-p">
                 <router-link :key="index" :to="{name: 'camp_detail', params: {id: item.uuid}, query: {type: item.type}}">
                   <div class="pull-left camp-imgcover m-r"><img :src="item.imgcover | ossResize('small') || 'http://img01.wanfangche.com/public/upload/201802/07/5a7a9b23a81d1.png?x-oss-process=style/small'"></div>
                   <div class="camp-list-item">
                     <div class="title text-bolder over-omit camp-swiper-title">{{item.name}}</div>
                     <div class="text-muted m-b-sm camp-t">
                        <p class="camp-xing">
                          <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.score}"></i>
                        </p>
                        <span v-if="item.price === -2" v-show="item.price !== -2">不详</span>
                        <span v-else-if="item.price === -1">免费</span>
                        <span v-else  v-show="item.price !== '不清楚'">{{item.price}}</span>
                        <span class="camp-distance" v-show="item.distance"><i></i>{{item.distance | distance}}</span>
                     </div>
                     <div class="clear">
                       <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.type==1, 'color-park2': item.type==0, 'color-scenic2': item.type==2, 'color-food2': item.type==3, 'color-fix2': item.type==4, 'color-refuel2': item.type==5}"><span :class="{'icon-camp-camp': item.type==1, 'icon-camp-park': item.type==0, 'icon-camp-scenic': item.type==2, 'icon-camp-food': item.type==3, 'icon-camp-service': item.type==4, 'icon-camp-station': item.type==5}"></span></div>
                       <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': item.type==1, 'color-park1': item.type==0, 'color-scenic1': item.type==2, 'color-food1': item.type==3, 'color-fix1': item.type==4, 'color-refuel1': item.type==5}">{{item.scale}}</div>
                       <div class="pull-right text-sm m-r text-info" style="line-height: 32px;overflow:hidden;height:28px;">查看详情<span class="fd-chevron-right"></span></div>
                     </div>
                   </div>
                   </router-link>
              </swiper-slide>
            </swiper>
          </div>
          <div class="map-body" v-show="istop">
             <div class="panel rv-list-container camp-sco-body" style="padding:0;">
                 <div class="camp-sco-box">
                   <div class="list-group list-group-underline list-group-lg">
                    <div v-show="list.length==0" class="camp-list-none">
                      本区域内还没有营地<br>拖动地图看看其他地方
                    </div>
                     <router-link v-for="(item,index) in list" :key="index" :to="{name: 'camp_detail', params: {id: item.uuid}, query: {type: item.type}}" class="list-group-item">
                         <div class="pull-left camp-imgcover m-r"><img  :src="item.imgcover | ossResize('small') || 'http://img01.wanfangche.com/public/upload/201802/07/5a7a9b23a81d1.png?x-oss-process=style/small'"></div>
                         <div class="camp-list-item">
                           <div class="title text-bolder over-omit camp-swiper-title">{{item.name}}</div>
                           <div class="text-muted m-b-sm camp-t">
                              <p class="camp-xing">
                                <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.score}"></i>
                              </p>
                              <span v-if="item.price === -2" v-show="item.price !== -2">不详</span>
                              <span v-else-if="item.price === -1">免费</span>
                              <span v-else  v-show="item.price !== '不清楚'">{{item.price}}
                              </span>
                              <span class="camp-distance" v-show="item.distance"><i></i>{{item.distance | distance}}</span>
                           </div>
                           <div class="clear">
                             <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.type==1, 'color-park2': item.type==0, 'color-scenic2': item.type==2, 'color-food2': item.type==3, 'color-fix2': item.type==4, 'color-refuel2': item.type==5}"><span :class="{'icon-camp-camp': item.type==1, 'icon-camp-park': item.type==0, 'icon-camp-scenic': item.type==2, 'icon-camp-food': item.type==3, 'icon-camp-service': item.type==4, 'icon-camp-station': item.type==5}"></span></div>
                             <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': item.type==1, 'color-park1': item.type==0, 'color-scenic1': item.type==2, 'color-food1': item.type==3, 'color-fix1': item.type==4, 'color-refuel1': item.type==5}">{{item.scale}}</div>
                             <div class="pull-right text-sm m-r-25 text-info"  style="line-height: 32px;overflow:hidden;height:28px;">查看详情<span class="fd-chevron-right"></span></div>
                           </div>
                         </div>
                         </router-link>
                   </div>
                 </div>
               </div>
          </div>
          
      </div>
      <transition name="fade">
      <div class="addbox-one" v-show="!toLoad"></div>
      </transition>
      <loading-car v-show="!toLoad" class="middle" style="z-index:150;top:-70px;"></loading-car>

    <tabbar active="camp"></tabbar>
    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">
      <div v-html="dealTxt"></div>
    </popup>
  </div>
</template>
<script>
  import api from '@/api'
  import Tabbar from '../Tabbar'
  import SearchBox from './search-box'
  import Amap from '@/components/amap'
  import { Popup } from 'vux'
  import LoadingCar from '@/components/loading/car'
  import { mapGetters, mapActions } from 'vuex'
  import wx from 'weixin-js-sdk'
  import config from '@/config'
  
  export default {
    components: {
      Tabbar,
      SearchBox,
      LoadingCar,
      Popup,
      Amap
    },
    data: function () {
      let self = this
      return {
        locationF: false,
        iconImg: 'http://img01.wanfangche.com/public/upload/201801/25/5a69a5f92dbbc.png',
        iconBigImg: 'http://img01.wanfangche.com/public/upload/201801/26/5a6ac3615467b.png',
        dealTxt: '暂时无法获取您的地理位置<br>请在设置-隐私-定位中<br>检查玩房车访问位置信息权限',
        isAlert: false,
        markers: [],
        zoom: 9,
        infos: [],
        zIndex: 999,
        searchOption: {
          city: 'all',
          citylimit: false
        },
        type: 1,
        mapCenter: [116.471317, 39.910244],
        mapStyle: 'light',
        lng: 116.471317,
        lat: 39.910244,
        user_lng: null,
        user_lat: null,
        distance: 40000,
        bigIcon: 0,
        address: '',
        swiperOption: {
          notNextTick: true,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          speed: 1000,
          autoplayDisableOnInteraction: false,
          initialSlide: 0,
          onSlideChangeStart: swiper => {
            self.bigIcon = swiper.activeIndex
          }
        },
        intop: false,
        istop: false,
        comprehensive: false,
        list: [],
        typelist: [
          {name: '营地', value: 1},
          {name: '停车', value: 0},
          {name: '景点', value: 2},
          {name: '美食', value: 3},
          {name: '维修', value: 4},
          {name: '加气', value: 5}
        ],
        typeTxt: '营地',
        typelistShow: false,
        typeind: 1,
        searchlistShow: false,
        searchlist: [
          {name: '推荐排序', type: 'recommend', value: 1},
          {name: '离我最近', type: 'distance', value: 2},
          {name: '评分最高', type: 'score', value: 3}
        ],
        srarchTit: '推荐排序',
        searchind: 1,
        xing: [1, 2, 3, 4, 5],
        toLoad: false
      }
    },
    computed: {
      swiper () {
        if (this.$refs.mySwiper) {
          return this.$refs.mySwiper.swiper
        } else {
          return null
        }
      },
      ...mapGetters({
        navigation: 'navigation'
      })
    },
    methods: {
      ...mapActions([
        'saveNavigation'
      ]),
      slideTo0 () {
        if (this.swiper) {
          this.swiper.slideTo(0, 1000, false)
        }
      },
      updateList (val) {
        // this.lng = this.navigation.lng
        // this.lat = this.navigation.lat
        // this.zoom = this.navigation.zoom
        // this.distance = this.navigation.distance
        // this.user_lng = this.navigation.user_lng
        // this.user_lat = this.navigation.user_lat
        this.list = this.navigation.list
      },
      searchList (item) {
        this.srarchTit = item.name
        this.searchind = item.value
        this.searchlistShow = false
        this.axios.get(api.camp.list, {
          params: {
            type: this.type,
            lng: this.lng,
            lat: this.lat,
            user_lng: this.user_lng || this.lng,
            user_lat: this.user_lat || this.lat,
            sort: item.type,
            distance: this.distance,
            search: null
          }
        }).then(response => {
          if (response.data.code === 1) {
            this.list = response.data.data
          }
        })
      },
      getCampList (type, name) {
        this.toLoad = false
        if (this.$route.query.type !== undefined) {
          this.typeind = this.$route.query.type
          this.type = this.$route.query.type
        } else {
          if (type !== undefined) {
            this.typeind = type
          } else {
            this.typeind = 1
          }
        }
        this.typeTxt = name || '营地'
        this.typelistShow = false
        if (type !== undefined) {
          this.type = type
          this.bigIcon = 0
          if (this.swiper) this.swiper.slideTo(0, 0, false)
        }
        this.markers = []
        this.infos = []
        if (this.navigation) {
          if (this.$route.query.location) {
            if (typeof (this.$route.query.location) === 'string') {
              this.lng = parseFloat(this.$route.query.location.split(',')[0])
              this.lat = parseFloat(this.$route.query.location.split(',')[1])
            } else {
              this.lng = parseFloat(this.$route.query.location.lng)
              this.lat = parseFloat(this.$route.query.location.lat)
            }
          } else {
            this.lng = this.navigation.lng
            this.lat = this.navigation.lat
            this.distance = this.navigation.distance
          }
          this.user_lng = this.navigation.user_lng
          this.user_lat = this.navigation.user_lat
        }
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
            this.list = response.data.data
            this.list.forEach(val => {
              this.infos.push({
                info: val.name,
                position: [val.lng, val.lat]
              })
            })
            // let lngSum = 0
            // let latSum = 0
            response.data.data.map(val => {
              // lngSum += parseFloat(val.lng)
              // latSum += parseFloat(val.lat)
              this.markers.push([parseFloat(val.lng), parseFloat(val.lat)])
            })
            this.saveNavigation({list: {
              lng: this.lng,
              lat: this.lat,
              zoom: this.zoom,
              distance: this.distance,
              user_lng: this.user_lng,
              user_lat: this.user_lat,
              list: this.list,
              type: this.type,
              infos: this.infos,
              markers: this.markers
            }})
            this.editIcon(type)
            this.editBigIcon()
            // 设置切换后的地图中心点
            // let center = {
            //   lng: lngSum / response.data.data.length,
            //   lat: latSum / response.data.data.length
            // }
            // this.mapCenter = [center.lng, center.lat]
            this.toLoad = true
          } else if (response.data.msg === '找不到更多数据') {
            this.list = []
            this.toLoad = true
          } else {
            this.message = true
            this.messageTit = response.data.msg
            this.toLoad = true
          }
        })
      },
      iconChange (val) {
        this.editBigIcon()
        if (this.swiper) this.swiper.slideTo(val, 1000, false)
      },
      disableTap () {
        this.$refs.tapper.disable('tap')
      },
      enableTap () {
        this.$refs.tapper.enable('tap')
      },
      onSwipeLeft () {
        this.istop = true
        var ins = document.querySelectorAll('.map-swiper')
        if (ins[0].offsetTop > 90) {
          smoothUp()
        }
        let _this = this
        function smoothUp () {
          if (ins[0].offsetTop > 90) {
            ins[0].style.top = ins[0].offsetTop - 7 + 'px'
            setTimeout(smoothUp, 5)
          } else {
            _this.intop = true
          }
        }
      },
      onTap () {
        this.istop = false
        var ins = document.querySelectorAll('.map-swiper')
        if (ins[0].clientHeight > 126) {
          smoothUp()
        }
        let _this = this
        function smoothUp () {
          if (ins[0].clientHeight > 126) {
            ins[0].style.top = ins[0].offsetTop + 7 + 'px'
            setTimeout(smoothUp, 5)
          } else {
            _this.intop = false
          }
        }
      },
      init () {
        this.initWechat()
        if (this.$route.query.location) {
          let location = this.$route.query.location
          if (typeof (location) === 'string') {
            this.lng = location.split(',')[0]
            this.lat = location.split(',')[1]
          } else {
            this.lng = location.lng
            this.lat = location.lat
          }
          this.mapCenter = [this.lng, this.lat]
        } else if (this.navigation) {
          this.lng = this.navigation.lng
          this.lat = this.navigation.lat
          this.zoom = this.navigation.zoom
          this.distance = this.navigation.distance
          this.user_lng = this.navigation.user_lng
          this.user_lat = this.navigation.user_lat
          this.list = this.navigation.list
          this.type = this.navigation.type
          this.infos = this.navigation.infos
          this.markers = this.navigation.markers
          this.mapCenter = [this.lng, this.lat]
          this.toLoad = true
          if (this.list.length === 0) {
            this.getCampList()
          }
        }
        let _this = this
        for (var key in this.typelist) {
          if (this.typelist[key].value === this.type) {
            this.typeTxt = this.typelist[key].name
          }
        }
        setTimeout(function () {
          _this.setheight()
        }, 100)
      },
      setheight () {
        var box = document.getElementsByClassName('amap-page-container')[0]
        var boxs = document.getElementsByClassName('camp-sco-body')[0]
        let num = document.documentElement.clientHeight - 225
        box.style.height = num + 'px'
        boxs.style.height = document.documentElement.clientHeight - 145 + 'px'
      },
      goBack () {
        this.typelistShow = false
        this.searchlistShow = false
        this.onTap()
      },
      typeBtn () {
        this.typelistShow ? this.typelistShow = false : this.typelistShow = true
        this.searchlistShow = false
      },
      searchBtn () {
        this.searchlistShow ? this.searchlistShow = false : this.searchlistShow = true
        this.typelistShow = false
      },
      // 微信分享
      initWechat () {
        var url = window.sessionStorage.getItem('initUrl') || window.location.href
        var targetUrl = window.location.href

        this.axios.post(api.rv.wxcode, {url: url})
        .then(response => {
          if (response.data.code === 200) {
            wx.config({
              debug: false,
              appId: response.data.data.appid,
              timestamp: response.data.data.timestamp,
              nonceStr: response.data.data.noncestr,
              signature: response.data.data.signature,
              jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline'
              ]
            })
            wx.ready(() => {
              // 发送给朋友
              let content = '全球房车营地查询平台'
              wx.onMenuShareAppMessage({
                title: content,
                desc: '23000+个营地信息尽在手中，随时随地查询省时省力',
                link: targetUrl,
                imgUrl: config.feedShareImage,
                success: function (res) {
                },
                cancel: function (res) {
                }
              })
              // 朋友圈
              wx.onMenuShareTimeline({
                title: content,
                link: targetUrl,
                imgUrl: config.feedShareImage,
                success: function (res) {
                },
                cancel: function (res) {
                }
              })
            })
            wx.error(function (res) {
            })
          }
        })
      },
      editIcon (type) {
        let images = [
          'http://img01.wanfangche.com/public/upload/201801/25/5a69a5f90c6a1.png',
          'http://img01.wanfangche.com/public/upload/201801/25/5a69a5f92dbbc.png',
          'http://img01.wanfangche.com/public/upload/201801/25/5a69a5f8ea58b.png',
          'http://img01.wanfangche.com/public/upload/201801/25/5a69a5f92bf18.png',
          'http://img01.wanfangche.com/public/upload/201801/25/5a69a61383102.png',
          'http://img01.wanfangche.com/public/upload/201801/25/5a69a61390ae1.png'
        ]
        this.iconImg = images[this.type]
      },
      editBigIcon () {
        let images1 = [
          'http://img01.wanfangche.com/public/upload/201801/26/5a6ac36157fa1.png',
          'http://img01.wanfangche.com/public/upload/201801/26/5a6ac3615467b.png',
          'http://img01.wanfangche.com/public/upload/201801/26/5a6ac3614be8e.png',
          'http://img01.wanfangche.com/public/upload/201801/26/5a6ac3615ff5a.png',
          'http://img01.wanfangche.com/public/upload/201801/26/5a6ac3614521e.png',
          'http://img01.wanfangche.com/public/upload/201801/26/5a6ac36141186.png'
        ]
        this.iconBigImg = images1[this.type]
      }
    },
    created () {
      this.init()
    },
    watch: {
      isAlert (val) {
        if (val) {
          setTimeout(() => {
            this.isAlert = false
          }, 5000)
        }
      }
    }
  }
</script>
<style>
  .camp-home .amap-page-container {
    min-height: 400px;
    position: relative;
  }
  .camp-home .swiper-slide{
    width: 350px;
  }
  .addbox-one{
    width: 100%;
    height: 90%;
    position: absolute;
    left: 0;
    top: 48px;
    background: #FFFFFF;
    z-index: 112;
  }
</style>
