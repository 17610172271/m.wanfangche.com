<template>
  <div style="height:100%;background:#FFFFFF;padding-bottom:44px;" class="app-containerss" :style="examine" v-show="homeShow">
  <city-picker v-model="cityPickerValue" ref="cityPicker"></city-picker>
    <scroll-refresh :on-infinite="onInfinite"  :on-refresh="onRefresh"  style="background:#FFFFFF;" >

     
       <banner></banner>
      <!-- <div class="city-change-btn">
      </div> -->
      <div class="home-container" style="padding:0;">
        <!-- search-card start-->
        <div class="search-card" :class="{'search-card-open': showSearchTab}">
          <div class="">

            <button class="btn btn-custom btn-block btn-search-toggle" style="position:relative;" @click="pickUp()"><i class="icon-search" ></i>即刻寻找一辆房车</button>
          </div>
          <transition name="fade">
          <div class="search-card-body">
            <div class="search-card-close">
              <a @click="pickDown()" class="btn btn-sm text-muted">
                <i class="glyphicon glyphicon-chevron-up" style="color:#21314C;"></i>
              </a>
            </div>
            <div class="box-heading text-muted text-small">取车城市</div>
            <div class="block m-b">
              <router-link class="city-picker-btn" :to="{ name: 'city', query: {type: 1}}" style="color:rgba(60,79,96,1);">{{query.pickup_city}}</router-link>
            </div>
            <div class="box-heading text-muted text-small">还车城市</div>
            <div class="block">
              <router-link class="city-picker-btn" :to="{ name: 'city', query: {type: 2}}" style="color:rgba(60,79,96,1);">{{query.return_city}}</router-link>
            </div>
            <div class="table-block block date-select-panel">
              <div class="table-block-cell b-b padder-v">
                <div class="" @click="showDatetimePicker('pickup_picker')">
                    <div class="text-muted text-small m-b">取车时间</div>
                    <div class="text-lger date">{{query.pickup_datetime | formatTime('MM月DD日')}}</div>
                    <div class="m-top-8">{{query.pickup_datetime | formatTime('周E')}}{{query.pickup_datetime | formatTime('HH:mm')}}</div>
                </div>
              </div>
              <div class="table-block-cell text-center">
                  <div class="total-day-underline text-muted">{{dateTime || 1}}天</div>
              </div>
              <div class="table-block-cell">
                <div class=" b-b padder-v text-right"  @click="showDatetimePicker('return_picker')">
                    <div class="text-muted text-small m-b">还车时间</div>
                    <div class="text-lger date">{{query.return_datetime | formatTime('MM月DD日')}}</div>
                    <div class="m-top-8">{{query.return_datetime | formatTime('周E')}} {{query.return_datetime | formatTime('HH:mm')}}</div>
                </div>
              </div>
            </div>

            <div class="padder-v-lg">
              <a @click="onSubmit" class="btn btn-lg btn-block btn-custom">搜索</a>
            </div>
          </div>
        </transition>
        </div>
        <!-- /search-card -->

        <!-- list-card 城市热门车型 -->

       <div class="wrapper text-xxlg down-icon-max font-bold" style="padding-right:29px;color:rgba(60,79,96,1);">热门车型 <a @click="openCityPicker" class="wrappers"><div class="city-sel"><span style="font-family:PingFangSC-Regular;">{{currentCity.city}}</span><i class="down-icon" ></i></div></a></div>
        
        <div class="wrapper text-center " v-show="!showLoding">
          <loading-bottom></loading-bottom>
          </div>
          <div class="panel rv-list-container" style="padding:0;"  v-show="list.length > 0">
              <div class="panel-body" >
                <div class="list-group list-group-underline list-group-lg" >
                  <router-link v-for="rv in list" :key="rv.id" :to="{name: 'rv_detail', params: {id: rv.id}}" class="list-group-item"  >
                      <div class="pull-left thumb-md m-r"><img :src="rv.img_cover | ossResize('middle')">

                      </div>
                      <div class="clear">
                        <div class="title text-bolder">{{rv.title}}</div>
                        <div class="text-muted m-b-sm spangray">
                        <!-- <div class="thumb-sm" style="float:left;text-align:center; margin-right:3px;"><img :src="rv.logo | ossResize('avatar')" alt="..."></div> -->
                        <p>{{rv.adult_passengers | parseInt}}人·
                        <span v-if="rv.transmission_case === '1'">自动挡</span>
                        <span v-if="rv.transmission_case === '2'">手动挡</span>
                        <span v-if="rv.transmission_case === '3'">手/自动挡</span>·
                        <span v-if="rv.actuation === '1'">汽油</span>
                        <span v-if="rv.actuation === '2'">柴油</span>
                        <span v-if="rv.actuation === '3'">电力</span>
                        <span v-if="rv.actuation === '4'">混合动力</span></p>
                        </div>
                        <div class="right text-lg" style="padding-top:5px;">
                          <span class="text-default orange font-bold">￥{{rv.price | parseInt}}</span>/天
                        </div>
                      </div>
                      </router-link>
                </div>
              </div>
            </div>
        <!-- / list-card -->
        <div v-show="showErr" >
        <div class="err-img" style="padding-top:60px;">
        <img src="../../../static/img/err-empty.png" alt="">
        </div>
        <div class="err-txt" style="padding-top:87px;">
          <p>房车都在路上,请稍候再来</p>
        </div>
      </div>

      </div>
      
    </scroll-refresh>
    <date-picker
    class="popup-custom"
    v-model="datePickerValue"
    :show="datePickerShow"
    :active="datePickerActive"
    @on-hide="onDatePickerHide"
    @on-change="onDatePickerChange" style="z-index:1000;"></date-picker>

     <!-- 底导航 -->
    <tabbar active="rental"></tabbar>
  
  </div>
</template>
<script>
import Banner from './banner'
import Tabbar from '../Tabbar'
import DatePicker from './date-picker'
import formatTime from '@/filters/format-time'
import ScrollRefresh from '@/components/Refresh/HomeRefresh'
import api from '@/api'
import LoadingBottom from '@/components/loading/bottom'
import { mapGetters, mapActions } from 'vuex'
import CityPicker from '@/components/city-picker'

export default {
  name: 'home',
  components: {
    Banner,
    Tabbar,
    DatePicker,
    ScrollRefresh,
    LoadingBottom,
    CityPicker
  },
  filters: {
    formatTime,
    parseInt: function (value) {
      return parseInt(value)
    }
  },
  data () {
    return {
      position: null,
      rvList: [],
      title: 'home',
      query: {},
      datePickerActive: 'pickup_datetime',
      datePickerShow: false,
      dateTime: 0,
      pickerCity: '',
      list: null,
      page: 1,
      cityPickerValue: null,
      showSearchTab: false,
      showErr: false,
      showLoding: false,
      homeStyle: true,
      homeShow: true
    }
  },
  computed: {
    datePickerValue: {
      get: function () {
        return [
          this.query.pickup_datetime,
          this.query.return_datetime
        ]
      },
      set: function (newValue) {
      }
    },
    ...mapGetters({
      querys: 'query',
      currentCity: 'currentCity',
      city: 'cityPick',
      isLoggedin: 'isLoggedin'
    }),
    examine () {
      return {
        'overflow': this.homeStyle ? 'auto' : ''
      }
    }
  },
  created () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.list = []
      this.showSearchTab = this.city
      this.query = this.querys
      this.dateTime = this.DateDiff()
      this.axios.get(api.rv.hotlist, {params: {
        pickup_cityid: this.currentCity.cityid,
        page: this.page,
        size: 10
      }})
      .then(response => {
        if (response.data.code === 200) this.list = response.data.data.list
        if (!response.data.data) {
          this.showErr = true
          this.showLoding = true
        } else {
          this.showLoding = true
          this.showErr = false
        }
      })
    } else {
      window.location.href = 'https://www.wanfangche.com/rental/'
    }
  },
  methods: {
    pickDown () {
      this.showSearchTab = false
      this.saveCityPick({ cityPick: false })
    },
    pickUp () {
      this.showSearchTab = true
      this.saveCityPick({ cityPick: true })
    },
    openCityPicker () {
      this.$refs['cityPicker'].open()
    },
    onRefresh () {
    },
    onInfinite (done) {
      this.page++
      this.axios.get(api.rv.hotlist, {params: {
        pickup_cityid: this.currentCity.cityid,
        page: this.page,
        size: 10
      }})
      .then(response => {
        if (response.data.code === 200) {
          if (response.data.data) {
            this.list.push.apply(this.list, response.data.data.list)
            done()
          } else {
            done(true)
          }
        }
      })
    },
    showDatetimePicker (type) {
      this.homeStyle = false
      this.datePickerActive = type
      this.datePickerShow = true
    },
    onDatePickerShow () {
    },
    onDatePickerHide () {
      this.homeStyle = true
      this.datePickerShow = false
      this.dateTime = this.DateDiff()
    },
    onDatePickerChange (val) {
      this.query.pickup_datetime = val[0]
      this.query.return_datetime = val[1]
      this.query.ischange = '1'
    },
    onSubmit () {
      this.$router.push({name: 'list'})
    },
    DateDiff () {
      var oDate1, oDate2, iDays
      oDate1 = new Date(formatTime(this.query.pickup_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      oDate2 = new Date(formatTime(this.query.return_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      iDays = parseInt(Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60 / 24))
      return iDays
    },
    ...mapActions([
      'saveCityPick',
      'saveToken'
    ])
  },
  watch: {
    currentCity (val) {
      this.page = 1
      this.list = []
      this.showLoding = false
      this.showErr = false
      this.axios.get(api.rv.hotlist, {params: {
        pickup_cityid: val.cityid,
        page: this.page,
        size: 10
      }})
      .then(response => {
        if (response.data.data) {
          this.list = response.data.data.list
          this.showLoding = true
          this.showErr = false
        } else {
          this.list = []
          this.showErr = true
          this.showLoding = true
        }
      })
    }
  }
}

</script>
<style>
.icon-search{
  margin-right: 7px;
  font-size: 18px;
  position: relative;
  top: 2px;
}
.list-card{
  padding: 5px 15px;
  line-height: 22px;
  margin-bottom: 10px;
  height:auto;
  position: relative;
}
.list-card a {
  color: rgba(60,79,96,1);
}
.list-card-heading {
  margin-top: 4px;
  padding: 4px 0 0 0;
}
.text-thin{
  font-size: 12px;
}
.list-card .list-card-img {
  width: 100%;
  overflow: hidden;
  max-height: 19.3rem;
  vertical-align: middle;
  border-radius: 4px 4px;
}
.list-card .list-card-img img {
  width: 100%;
}
.home-container {
  position: relative;
  padding-bottom: 50px;
  min-height: 600px;
}
.home-container .search-card{
  margin: 0 10px 10px 10px;
  display: block;
  border-radius: 0 0 4px 4px;
  height: 1.17rem;
  overflow: hidden;
  position: relative;
  z-index: 10;
  margin-top: -22px;
  transition: all .4s ease;
}

.home-container .search-card-heading{
  /*margin-top: -23px;*/
  height: 44px;
  overflow: hidden;
  display: block;
  z-index: 100;
  position: relative;
  border-radius: 4px 4px 0 0;
}

.home-container .search-card-body{
  padding: 10px 20px;
  line-height: 1.5em;
  position: relative;
  padding-top: 20px;
  z-index: 100;
  transition: all .4s ease;
  display: none;
}

.home-container .search-card-heading .btn{
  font-size: 16px;
  color:#fff;
  line-height: 22px;
  padding: 12px 12px;
  border: none;
  border-radius: 4px 4px 0 0;
}
.home-container .search-card-heading .active{
  color:#FE7C1E;
  background: #fff;
  box-shadow:none;
}

.home-container .search-card.search-card-open {
  height: 349px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,.1);
}
.search-card-open .search-card-body{
  display: block;
  background: #FFFFFF;
  border-radius: 4px 4px 0 0;
  transition: all .4s ease;
}

.btn.btn-search-toggle {
  position: absolute;
  top: 0;
  font-size: 18px;
  /*padding: 10px 10px;*/
  line-height: 1.17rem;
  box-shadow: 0 4px 4px 0 rgba(254,124, 30, .2);
  transition: all .4s ease;
  font-family: "PingFangSC-Medium";
  padding:0;
}
.search-card-open .btn-search-toggle {
  display: none;
}
.search-card-close{
  position: absolute;
  top: 16px;
  right: 15px;
}
.search-card-close a {
  background: #eee;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 22px;
  padding: 0 0 0 2px;
  width: 26px;
  height: 26px;
}


.popup-custom{
  background-color: inherit;
  padding: 0 5px;
}
.popup-custom .popup-container{
  background: #fff;
  border-radius: 4px 4px 0 0;
}
.city-change-btn{
  font-size: 14px;
  color: #fff;
  /*background: rgba(255,255,255, .15);*/
  display: inline-block;
  padding: 4px 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  overflow: hidden;
  /*border-radius: 12px 12px;*/
  background: rgba(255,255,255,0.15);
  border-radius: 100px;
}

.city-change-btn a {
  position: relative;
  color: #fff;
  z-index: 10;
}

.table-block {
  width: 100%;
  display: block;
}
.table-block-cell {
  display: table-cell;
  width: 1%;
  position: relative;
  vertical-align: middle;
}
#app {
  height: 100%;
  overflow: visible;
}
</style>
