<template>
  <div style="height:100%;background:#FFFFFF;" class="app-containerss" :style="examine">
    
    <!-- 商家首页 -->
    <transition name="fade">
      <div class="app-container" v-show="isTab === 1">
        <scroll-refresh :on-infinite="onInfinite"  :on-refresh="onRefresh"  style="background:#FFFFFF;" >
          <!-- <div class="city-change-btn">
          </div> -->
          <div class="agency-head">
            <div class="agh-top">
              <h1 class="nav-header-title nav-header-titles">
                {{data.name}}
              </h1>
              <a class="camp-goback" href="javascript:" @click="goBack">
                <img src="../../assets/icon_back_white.png" width="11px">
              </a>
            </div>
            <a  class="a-btn" @click="urlBtn()">
              <img :src="data.banner | ossResize('large')" alt="">
            </a>
          </div>
          <div class="home-container" style="padding:0;">
            <!-- search-card start-->
            <div class="search-card" :class="{'search-card-open': showSearchTab}">
              <div class="">

                <button class="btn btn-custom btn-block btn-search-toggle" style="position:relative;" @click="pickUp()"><i class="icon-search" ></i>搜索店内房车</button>
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
                  <router-link class="city-picker-btn" :to="{ name: 'agencyCity', query: {id: data.id}}" style="color:rgba(60,79,96,1);">{{query.pickup_city}}</router-link>
                </div>
                <div class="box-heading text-muted text-small">还车城市</div>
                <div class="block">
                  <router-link class="city-picker-btn" :to="{ name: 'agencyCity', query: {id: data.id}}" style="color:rgba(60,79,96,1);">{{query.return_city}}</router-link>
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
            
            <div class="wrapper text-center " v-show="!showLoding">
                <loading-bottom></loading-bottom>
            </div>

            <div class="agency-tit" v-show="data.is_recommend === '1'" style="margin-top:32px;">
              <span></span><p>热门推荐</p>
            </div>

            <div class="agency-recommend" v-if="data.is_recommend === '1'">
              <div class="agr-b" v-for="item in recommendList">
                <router-link :to="{name: 'rv_detail', params: {id: item.id}}"> <img :src="item.img_cover" alt=""></router-link>
              </div>
            </div>

             <div class="agency-tit" v-show="list">
              <span></span><p>车辆列表</p>
            </div>
            
            <div class="err-box" v-show="list <= 0">
              该商家未设置商家首页
            </div>
            <div class="panel rv-list-container" style="padding:0;"  v-show="list.length > 0">
              <div class="panel-body" style="padding-bottom:52px;">
                <div class="list-group list-group-underline list-group-lg" >
                  <router-link v-for="rv in list" :key="rv.id" :to="{name: 'rv_detail', params: {id: rv.id}}" class="list-group-item"  >
                      <div class="pull-left thumb-md m-r"><img :src="rv.img_cover | ossResize('middle')">

                      </div>
                      <div class="clear">
                        <div class="title text-bolder">{{rv.title}}</div>
                        <div class="text-muted m-b-sm spangray">
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

          </div>
          <div v-show="showErr" style="position:fixed;top:260px;width:100%;">
          <div class="err-img" style="padding-top:60px;">
          <img src="../../../static/img/err-empty.png" alt="">
          </div>
          <div class="err-txt" style="padding-top:87px;">
            <p>房车都在路上,请稍候再来</p>
          </div>
          </div>
        </scroll-refresh>
      </div>
    </transition>

    <!-- 关于我们 -->
    <transition name="fade">
      <div class="app-containers" v-show="isTab === 2" style="padding:0 15px 52px 15px">
        <div class="u-head">
          <img src="http://img01.wanfangche.com/public/upload/201802/07/5a7a9b23a81d1.png?x-oss-process=style/middle" alt="">
        </div>
        <p class="u-tit">{{data.name}}</p>
        <div class="agency-tit" style="padding:0;">
          <span></span><p>公司简介</p>
        </div>
        <div class="u-txt" v-html="data.instruduction"></div>
        <div class="agency-tit" style="padding:0;">
          <span></span><p>店铺列表</p>
        </div>
        <div class="u-list">
          <div class="u-shop" v-for="item in shopData.storelist">
            <p><span>店铺名称:</span>{{item.name}}</p>
            <p><span>营业时间:</span>{{item.open_at}}-{{item.close_at}}</p>
            <p @click="tel(item.phone_number)"><span>门店电话:</span><em class="u-tel">{{item.phone_number}}</em><i class="icon-camp-phone"></i></p>
            <p><span>门店地址:</span>{{item.address}}</p>
          </div>
        </div>
      </div>
    </transition>

    <div class="agency-tab" >
      <div @click="tabBtn(1)" :class="{'active': isTab === 1}">首页<span></span></div>
      <div @click="tabBtn(2)" :class="{'active': isTab === 2}">关于我们<span></span></div>
      <div @click="toUser">我的</div>
    </div>

    <date-picker
    class="popup-custom"
    v-model="datePickerValue"
    :show="datePickerShow"
    :active="datePickerActive"
    @on-hide="onDatePickerHide"
    @on-change="onDatePickerChange" style="z-index:1000;"></date-picker>
  
  </div>
</template>
<script>
import DatePicker from '../Home/date-picker'
import formatTime from '@/filters/format-time'
import ScrollRefresh from '@/components/Refresh/HomeRefresh'
import api from '@/api'
import LoadingBottom from '@/components/loading/bottom'
import { mapGetters, mapActions } from 'vuex'
import wx from 'weixin-js-sdk'

export default {
  name: 'home',
  components: {
    DatePicker,
    ScrollRefresh,
    LoadingBottom
  },
  filters: {
    formatTime,
    parseInt: function (value) {
      return parseInt(value)
    }
  },
  data () {
    return {
      isTab: 1,
      position: null,
      rvList: [],
      title: 'home',
      query: {},
      datePickerActive: 'pickup_datetime',
      datePickerShow: false,
      dateTime: 0,
      pickerCity: '',
      list: [],
      page: 1,
      cityPickerValue: null,
      showSearchTab: false,
      showErr: false,
      showLoding: false,
      homeStyle: true,
      homeShow: true,
      recommendList: [1, 2, 3, 4, 5],
      data: {},
      shopData: {},
      wxShareName: '',
      wxShareTitle: '精选热门好评车辆推荐',
      wxShareImg: '',
      minimum: ''
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
    this.getData()
    this.getShop()
    this.list = []
    this.showSearchTab = this.city
    this.query = this.querys
    this.dateTime = this.DateDiff()
    let _this = this
    setTimeout(function () {
      _this.serHeigth()
    }, 200)
    this.axios.get(api.agency.list, {params: {
      id: this.$route.params.id,
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
  },
  methods: {
    getData () {
      this.axios.get(api.agency.find, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.shopData = response.data.data
          this.wxShareName = this.shopData.name
          this.wxShareImg = this.shopData.logo
          this.wxShare()
        }
      })
    },
    getShop () {
      this.axios.get(api.agency.home, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          if (!this.data.banner) {
            this.data.banner = 'http://img01.wanfangche.com/public/upload/201803/05/5a9cfd89a6ec2.png'
          }
          if (response.data.data.recommendlist) {
            this.recommendList = response.data.data.recommendlist
          }
        }
      })
    },
    pickDown () {
      this.showSearchTab = false
      this.saveCityPick({ cityPick: false })
    },
    pickUp () {
      this.showSearchTab = true
      this.saveCityPick({ cityPick: true })
    },
    onRefresh () {
    },
    onInfinite (done) {
      this.page++
      this.axios.get(api.agency.list, {params: {
        id: this.$route.params.id,
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
      this.$router.push({name: 'list', query: {id: this.data.id}})
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
    ]),
    tel (val) {
      window.location.href = 'tel:' + val
    },
    goBack () {
      window.history.length < 2 && this.to ? this.$router.push(this.to) : this.$router.go(-1)
    },
    tabBtn (ind) {
      this.isTab = ind
    },
    toUser () {
      this.$router.push({
        name: 'user'
      })
    },
    serHeigth () {
      if (this.data.is_recommend === '1') {
        var box = document.getElementsByClassName('agr-b')[0]
        let num = box.clientWidth
        box.style.height = num + 'px'
      }
    },
    urlBtn () {
      if (this.data.banner_url) {
        if (this.data.banner_url.indexOf('http') === 1) {
          window.location.href = this.data.banner_url
        } else {
          window.location.href = 'http://' + this.data.banner_url
        }
      }
    },
    wxShare () { // 微信分享
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
          var _this = this
          wx.ready(() => {
            // 发送给朋友
            wx.onMenuShareAppMessage({
              title: _this.wxShareName,
              desc: _this.wxShareTitle,
              link: targetUrl,
              imgUrl: _this.wxShareImg,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
            // 朋友圈
            wx.onMenuShareTimeline({
              title: _this.wxShareName + _this.wxShareTitle,
              link: targetUrl,
              imgUrl: _this.wxShareImg,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
          })
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
  height: 50px;
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
  line-height: 32px;
  box-shadow: 0 4px 4px 0 rgba(254,124, 30, .2);
  transition: all .4s ease;
  font-family: "PingFangSC-Medium";
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
