<template>
  <div id="rv-detail" style="background:#FFFFFF;min-height:700px;padding:44px 0;">
    <topnav>车辆详情</topnav>
    <loading-car v-show="!toLoad" class="middle"></loading-car>
    <transition name="fade">
    <div class="app-body app-container app-containers"  v-show="toLoad" style="padding-bottom:0;">
      <img-swiper :list="rv_data.images" class="tab-none"></img-swiper>
      <div class="panel tab-none">
        <div class="panel-body">

            <div class="img-right-box">
              <router-link :to="{name: 'agency', params: {id: rv_data.agency_id}}">
                  <img :src="rv_data.logo | ossResize('middle')" class="img-right">
              </router-link>
              <!-- <a><img :src="rv_data.logo | ossResize('middle')" class="img-right"></a> -->
            </div>
          <h3 class="rv-detail-title text-bolder">{{rv_data.title}}</h3>
          <!-- <div class="text-muted" style="font-size:12px;">{{rv_data.adult_passengers | parseInt}}人·{{rv_data.transmission_case.val}}·{{rv_data.actuation.val}}</div> -->
          <div class="text-small text-muted" style="line-height: 17px;">
            <span class="">
              <rater :max="5" v-model="rv_data.score" active-color="#FE7C1E" :font-size="12" :disabled="true"></rater>
              <!-- {{rv_data.score}}分 -->
            </span>
            <span class="m-l">{{rv_data.comment_num}}位乘客评价{{rv_data.pickup_store_id}}</span>
          </div>
          <div class="text-small text-muted m-t-10">
            <span class="m-r" v-if="rv_data.child_seats.val === '1'"><i class="glyphicon glyphicon-ok-circle text-default"></i>{{rv_data.child_seats.title}}</span>
            <span class="m-r" v-if="rv_data.support_deliver.val === '1'"><i class="glyphicon glyphicon-ok-circle text-default"></i>{{rv_data.support_deliver.title}}</span>
            <span class="m-r" v-if="rv_data.support_return_at_home.val === '1'"><i class="glyphicon glyphicon-ok-circle text-default"></i>{{rv_data.support_return_at_home.title}}</span>
            <span class="m-r" v-if="rv_data.support_return_at_another_place.val === '1'"><i class="glyphicon glyphicon-ok-circle text-default"></i>{{rv_data.support_return_at_another_place.title}}</span>
            <span class="m-r" v-if="rv_data.support_pickup_at_airport.val === '1'"><i class="glyphicon glyphicon-ok-circle text-default"></i>{{rv_data.support_pickup_at_airport.title}}</span>
          </div>
          <!-- <div class="text-small text-muted m-t-sm sale-price">
             <span class="m-r">7天特价</span>
            <span class="m-r">30天特价</span>
          </div> -->
        </div>
        <div class="panel-body">
          <div class="well-c" style="padding:10px;">
            <div class="block text-small text-muted">
              <div class="pull-right" style="padding:0;"><span>还车</span></div>
              <div class=""><span>取车</span></div>
            </div>
            <div class="row padder-v" style="padding-top:10px;">
              <div class="col-xs-5" @click="showDatetimePicker('pickup_picker')">
                <div class="text-lg m-r-minus text-bolder">
                  {{pickup_date}}
                </div>
                <div class="m-top-2">
                  {{pickup_date | formatTime('周E')}} {{pickup_time}}
                </div>
              </div>
              <div class="col-xs-2 padder-xs">
                <div class="row">
                  <div class="total-day-md text-center">
                    <div class="total-day-underline-muted text-muted">{{total_days}}天</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-5 text-right" @click="showDatetimePicker('return_picker')">
                <div class="text-lg m-l-minus text-bolder">
                  {{return_date}}
                </div>
                <div class="m-top-2">
                  {{return_date | formatTime('周E')}} {{return_time}}
                </div>
              </div>
            </div>
              <div class="row padder-v" style="padding-bottom:2px;">
              <div class="col-xs-6">
                <div class="text-default">
                  <i class="glyphicon glyphicon-map-marker"></i>
                  <router-link :to="{name: 'store', params: {id: rv_data.address_list[0].pickup_store_id}}">
                  {{rv_data.address_list[0].pickup_city}}-{{rv_data.address_list[0].pickup_name}}
                  </router-link>

                </div>
              </div>
              <div class="col-xs-6">
                <div class="text-default text-right">
                  <i class="glyphicon glyphicon-map-marker"></i>
                  <router-link :to="{name: 'store', params: {id: rv_data.address_list[0].return_store_id}}">
                  {{rv_data.address_list[0].return_city}}-{{rv_data.address_list[0].return_name}}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-heading m-t-sm">
          <div class="text-lg padder-v">车辆信息</div>
        </div>
        <div class="panel-body text-center" style="padding-bottom:20px;">
          <div class="grid-box-5">
            <div class="rv-meta-icon"><i class="meta-icon-transmission driving"></i></div>
            <div class="text-small text-muted m-t m-normal">{{rv_data.transmission_case.val}}</div>
          </div>
          <div class="grid-box-5">
            <div class="rv-meta-icon"><i class="meta-icon-fuel driving"></i></div>
            <div class="text-small text-muted m-t m-normal">{{rv_data.actuation.val}}</div>
          </div>
          <div class="grid-box-5">
            <div class="rv-meta-icon"><i class="meta-icon-fuel-consumption driving"></i></div>
            <div class="text-small text-muted m-t m-normal">油耗{{rv_data.fuel_consumption.val}}L</div>
          </div>
          <div class="grid-box-5">
            <div class="rv-meta-icon"><i class="meta-icon-car-age driving"></i></div>
            <div class="text-small text-muted m-t m-normal">{{rv_data.coty.val}}年</div>
          </div>
          <div class="grid-box-5">
            <div class="rv-meta-icon"><i class="meta-icon-driver-license driving"></i></div>
            <div class="text-small text-muted m-t m-normal">{{minind}}</div>
          </div>

          <div class="grid-box-5">
            <router-link :to="{ name: 'rv_meta', params: { id: rv_data.id}}">
            <div class="rv-meta-icon"><i class="icon-more driving"></i></div>
            <div class="text-small text-muted m-t m-normal">更多</div>
            </router-link>
          </div>
        </div>

          
      </div>
      <p style="width:100%;height:0px;background:#F5F5F5;" class="tab-none"></p>
    </div>
    </transition>
    <transition name="fade">
    <tabs :tabdata="tabData" v-show="toLoad"></tabs>
    </transition>
    <popup v-model="constructors" class="constructors" style="height:auto;bottom:27%;">
    <span class="remove" @click="constructorsHide"></span>
      <h2>不承保范围</h2>
      <p><b>以下情况不在车行保险的承保范围内</b></p>
      <p>1.因不恰当使用车辆造成的损失，如站在车顶拍照导致车盖刮花、在车内吸烟。</p>
      <p>2.烟头烫坏地毯等。</p>
      <p>3.因车辆钥匙丢失、损坏、或将车辆长时间停在人烟稀少的地方导致车辆被盗。</p>
      <p>4.由未经登记的驾驶人驾驶车辆造成的车辆损坏。</p>
      <p>5.因超速驾驶，酒后驾驶或违反旅行国法律法规而导致的车辆损坏。</p>
      <p>6.不被租车公司认可的自主修车费用。</p>
      <p>7.车辆涉水造成的车辆损坏。</p>
      <p>8.发生车损未报警，缺少警方报告。</p>
    </popup>
    
    <popup v-model="occupy" class="occupy" style="height:auto;">
      该时间段已租，请重新选择时间
    </popup>
    <popup v-model="message" class="messages" style="height: 56px;z-index:555;" :show-mask="false">
      <h2>{{messageTit}}</h2>
    </popup>
    <popup v-model="fee_popup_show" width="100%" height="auto" position="bottom" class="fixed-bottom-popup">
      <div class="panel">
        <div class="panel-heading">
          <div class="text padder-v">价格详情</div>
        </div>
        <div class="panel-body bg-light text-small">
        <div class="pull-right">线上支付</div>
          <div class="clear">项目</div>
        </div>
        <div class="panel-body">
          <ul class="list-group list-group-underline">
            <li class="list-group-item" @click="link_details">
              <label class="label-title text-muted">基本费用</label>
              <span class="text-muted">{{total_days}}天</span>
              <div class="pull-right" style="padding:3px 0 0 0;">
                <span class="text-default" style="padding-right:3px;">￥{{this.total_prices / total_days | parseInt}}</span>
                <i class="icon-input-expansion" style="color:#FE7C1E;font-size:10px;"></i>
              </div>
            </li>
            <li class="list-group-item">
              <label class="label-title">订单总价</label>
              <div class="pull-right p-normal">
                <span class="text-default">￥{{this.total_prices}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </popup>

    <div class="fixed-bottom-container" :style="examine"  v-show="toLoad">
      <a class="fixed-bottom-container-left"  @click="toggleFeePopup">
        <label class="text-small text-normal m-t-reverse-sm">线上支付:</label>
        <span class="text-xlg text-dark">￥{{this.total_prices}}</span>
        <div class="pull-right text-muted m-t-sm">
          <i class="glyphicon" :class="[fee_popup_show ? 'icon-arrow-down' : 'icon-arrow-up']" style="font-size:8px;top:-3px;"></i>
        </div>
      </a>
      <div class="fixed-bottom-container-right" v-if="!occupys" @click="reserveBtn">
      <!-- :to="{name: 'rv_book', params: {id: rv_data.id}, query: query}" -->
        <span class="btn btn-lg btn-custom btn-block">立即预定</span>
      </div>
      <div class="fixed-bottom-container-right" v-if="occupys">
        <span class="btn btn-lg btn-block btn-gray">立即预定</span>
      </div>
    </div>
    <popup v-model="login" class="userlog" style="height: 320px;position:fixed;">
        <h3>登录</h3>
        <span class="remove" @click="remove"></span>
        <div class="user-body">
          <p><input type="number" v-model="logintel" placeholder="请输入手机号" /></p>
          <p><input type="password" v-model="logincode" placeholder="请输入密码"/></p>
          <p><button @click="btnlogin">登录</button></p>
          <p><button @click="Register">注册</button></p>
        </div>
    </popup>
    <date-picker
    class="popup-custom"
    v-model="datePickerValue"
    :data="datePrice"
    :show="datePickerShow"
    :active="datePickerActive"
    @on-show="onDatePickerShow"
    @on-hide="onDatePickerHide"
    @on-change="onDatePickerChange"></date-picker>
  </div>
</template>
<script>
import { SwiperItem, Tab, TabItem, Sticky, Rater, Popup, Alert, Confirm, Countdown } from 'vux'
import DatePicker from '../Home/date-picker'
import Topnav from './Topnav'
import Tabcontent from './Tabcontent'
import CommentList from '../Comment/List'
import Comment from '../../api/comment'
import Costtxt from './cost.vue'
import Certificate from './certificate.vue'
import api from '@/api'
import formatTime from '@/filters/format-time'
import { mapActions, mapGetters } from 'vuex'
import ImgSwiper from './Swiper'
import today from '../../tools/date/today'
import Tabs from './tabs'
import LoadingCar from '@/components/loading/car'
import { isJson } from '@/tools/util'
import wx from 'weixin-js-sdk'

const tabList = () => ['图文详情', '费用说明', '租车须知', '乘客评价']
export default {
  components: {
    isJson,
    Tabs,
    Topnav,
    SwiperItem,
    Tab,
    TabItem,
    Sticky,
    Rater,
    Tabcontent,
    CommentList,
    Popup,
    Alert,
    Confirm,
    Costtxt,
    Certificate,
    Countdown,
    ImgSwiper,
    LoadingCar,
    DatePicker
  },
  filters: {
    parseInt (value) {
      var str = value + ''
      var arr = str.split('.')
      if (arr[1] === '00' || arr[1] === '') {
        return arr[0] * 1
      } else {
        return str.indexOf('.') === -1 ? arr[0] * 1 : str.substring(0, str.indexOf('.') + 3)
      }
    },
    formatTime
  },
  data () {
    return {
      login: false,
      rv_id: this.$route.params.id,
      tab_list: tabList(),
      tab1: '图文详情',
      index: 0,
      comment_list: {},
      fee_popup_show: false,
      alertShow: false,
      isalert: 0,
      alertShow_add: false,
      constructors: false,
      gaintxt: '获取验证码',
      time: 60,
      messages: false,
      message: false,
      logintel: '',
      logincode: '',
      route: this.$route,
      tabData: {
        one: '',
        two: '',
        three: '',
        list: {},
        evaluateListid: '',
        video: ''
      },
      toLoad: false,
      rv_data: {
        id: 0,
        brand_id: null,
        pickup_store_id: 0,
        'transmission_case': {
          'val': ''
        },
        'driver_license_class': {
          'val': ''
        },
        'actuation': {
          'val': ''
        },
        'address_list': [{
          'pickup_city': '',
          'pickup_name': '',
          'return_city': '',
          'return_name': '',
          'pickup_store_id': 0,
          'return_store_id': 0
        }],
        'child_seats': {
          'title': '',
          'val': ''
        },
        'support_return_at_home': {
          'title': '',
          'val': ''
        },
        'support_deliver': {
          'title': '',
          'val': ''
        },
        'support_return_at_another_place': {
          'title': '',
          'val': ''
        },
        'support_pickup_at_airport': {
          'title': '',
          'val': ''
        },
        'wash_room': {
          'title': '',
          'val': ''
        },
        'fuel_consumption': {
          'title': '',
          'val': ''
        },
        'coty': {
          'title': '',
          'val': ''
        }
      },
      ind: 0,
      unit_price: 0,
      total_prices: 0,
      minind: '',
      images: [],
      occupy: false,
      occupys: false,
      messageTit: '',
      datePickerActive: 'pickup_datetime',
      datePickerShow: false,
      dateTime: 0,
      pickerCity: '',
      datePrice: [],
      wxShareName: '',
      wxShareImg: '',
      lodindBtn: true,
      query: {},
      wxShareTitle: ''
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
        // window.sessionStorage.setItem('query', JSON.stringify(this.query))
      }
    },
    examine () {
      return {
        'z-index': this.fee_popup_show ? 506 : 1,
        'border-top': this.fee_popup_show ? 'none' : '1px solid #f5f5f5'
      }
    },
    pickup_date () {
      return getFormatDate(this.query.pickup_datetime).substring(0, 10)
    },
    pickup_day () {
      return '周六'
    },
    pickup_time () {
      return this.query.pickup_datetime.substring(11, 17)
    },
    return_date () {
      return getFormatDate(this.query.return_datetime).substring(0, 10)
    },
    return_day () {
      return '周日'
    },
    return_time () {
      return this.query.return_datetime.substring(11, 17)
    },
    total_days () {
      return this.DateDiff()
    },
    ...mapGetters({
      isLoggedin: 'isLoggedin',
      isAgency: 'isAgency',
      querys: 'query'
    })
  },
  methods: {
    ...mapActions([
      'saveToken'
    ]),
    getRvDatePrice () { // 180天数据
      this.axios.get(api.rv.dateprice, {
        params: {
          id: this.$route.params.id,
          s_date: today(1),
          e_date: today(181)
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.datePrice = response.data.data.list
          this.getNewPrice()
          this.getPrice()
        } else {
          this.msg = response.data.msg
        }
      })
    },
    getNewPrice () { // 用户直接进入详情页当前时间如果已被占用
      var arr = this.datePrice
      if (this.query.ischange === '0') {
        this.query.ischange = '1'
        for (var key = 0; key < arr.length; key++) {
          if (arr[key].is_reserve === '1' || arr[key].is_occupy === '1') {
            var pick = null
            var retu = null
            pick = arr[key + 1].r_date + ' ' + this.pickup_time
            retu = arr[key + 2].r_date + ' ' + this.return_time
            this.query.pickup_datetime = pick
            this.query.return_datetime = retu
            this.datePickerValue = [pick, retu]
          }
        }
      }
    },
    getPrice () { // 计算总价
      let strat = null
      let end = null
      for (var i = 0; i < this.datePrice.length; i++) {
        if (this.datePrice[i].r_date === this.query.pickup_datetime.split(' ')[0]) {
          strat = i
        }
        if (this.datePrice[i].r_date === this.query.return_datetime.split(' ')[0]) {
          end = i
        }
      }
      if (this.datePrice.length > 50) {
        var arr = this.datePrice.slice(strat, end)
        let price = 0
        for (var ind = 0; ind < arr.length; ind++) {
          price += parseInt(arr[ind].price)
        }
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].is_reserve === '1' || arr[j].is_occupy === '1') {
            this.occupy = true
            this.occupys = true
            break
          } else {
            this.occupy = false
            this.occupys = false
          }
        }
        this.total_prices = price
      }
    },
    btnlogin () { // 登录
      if (this.lodindBtn) {
        this.lodindBtn = false
        this.axios.post(api.order.submit, {tel: this.logintel, passwd: this.logincode})
        .then(response => {
          if (response.data.code === 200) {
            this.saveToken({ token: response.headers.authorization })
            this.login = false
            this.$router.go('')
            this.lodindBtn = true
          } else {
            this.message = true
            this.messageTit = response.data.msg
            this.lodindBtn = true
          }
        })
      }
    },
    remove () {
      this.login = false
    },
    Register () {
      this.$router.push('/register')
    },
    reserveBtn () { // 提交订单
      if (this.isLoggedin) {
        this.$router.push({
          name: 'rv_book',
          params: {id: this.$route.params.id, price: this.total_prices}
        })
      } else {
        this.login = true
      }
    },
    codeBtn () { // 验证码
      if (this.time === 60) {
        this.axios.post(api.user.register, {tel: this.logintel})
        .then(response => {
          if (response.data.code === 200) {
            this.gaintxt = 's'
            this.messages = true
          } else {
            this.message = true
            this.messageTit = response.data.msg
          }
        })
      }
    },
    link_details () { // 费用明细
      this.$router.push({
        path: '/cost/',
        query: {
          id: this.$route.params.id,
          s_date: this.query.pickup_datetime,
          e_date: this.query.return_datetime
        }
      })
    },
    toggleFeePopup () {
      this.fee_popup_show = !this.fee_popup_show
    },
    submit () {
      this.alertShow = true
    },
    submit_add () {
      this.alertShow_add = true
    },
    yesadd () {
      this.$router.go('/err')
    },
    contractshow () {
      this.constructors = true
    },
    submit_show (ind) {
      this.ind = ind
    },
    DateDiff () {
      var oDate1, oDate2, iDays
      oDate1 = new Date(formatTime(this.query.pickup_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      oDate2 = new Date(formatTime(this.query.return_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      iDays = parseInt(Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60 / 24))
      return iDays
    },
    showDatetimePicker (type) {
      this.datePickerActive = type
      this.datePickerShow = true
    },
    onDatePickerShow () {
      if (this.datePrice.length <= 0) {
        this.getRvDatePrice()
      }
    },
    onDatePickerHide () {
      this.datePickerShow = false
      this.dateTime = this.DateDiff()
    },
    onDatePickerChange (val) {
      this.query.pickup_datetime = val[0]
      this.query.return_datetime = val[1]
    },
    arrMax (arr) { // 配置执照要求
      var max
      if (isJson(arr)) {
        arr = JSON.parse(arr)
      }
      for (var i in arr) {
        max = arr[0]
        if (arr[i] < max) {
          max = arr[i]
        }
      }
      switch (max) {
        case 1:
          this.minind = 'C2'
          break
        case 2:
          this.minind = 'C1'
          break
        case 3:
          this.minind = 'B3'
          break
        case 4:
          this.minind = 'B2'
          break
        case 5:
          this.minind = 'B1'
          break
        case 6:
          this.minind = 'A3'
          break
        case 7:
          this.minind = 'A2'
          break
        case 8:
          this.minind = 'A1'
          break
      }
      return max
    },
    constructorsHide () {
      this.constructors = false
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
    },
    getRvData () { // 获取房车详情数据
      this.axios.get(api.rv.info, {params: {id: this.$route.params.id, s_date: this.query.pickup_datetime, e_date: this.query.return_datetime}})
         .then(response => {
           if (response.data.code === 200) {
             this.rv_data = response.data.data
             this.tabData.one = response.data.data.detail
             this.tabData.two = response.data.data.expenses_explain
             this.tabData.three = response.data.data.notice
             this.tabData.four = response.data.data.comment_list
             this.tabData.evaluateListid = response.data.data.id
             this.tabData.video = response.data.data.video
             this.rv_data.score = parseInt(response.data.data.score)
             this.arrMax(this.rv_data.driver_license_class.val)
             this.wxShareName = response.data.data.title
             this.wxShareImg = response.data.data.img_cover
             this.wxShareTitle = '本房车可乘坐' + response.data.data.adult_passengers + '人,' + response.data.data.actuation.val + '发动机' + response.data.data.transmission_case.val + ',' + this.minind + '驾照即可驾驶,点击即可预订'
             this.wxShare()
           } else {
             this.$router.replace({
               path: '/fourerr'
             })
           }
           this.toLoad = true
         })
    },
    getTimes () { // 获取全局订单时间
      // var isSeeion = JSON.parse(window.sessionStorage.getItem('query'))
      // if (isSeeion) {
      //   this.query = JSON.parse(window.sessionStorage.getItem('query'))
      //   console.log(this.query)
      // } else {
      //   this.query = this.querys
      // }
      this.query = this.querys
      this.dateTime = this.DateDiff()
    }
  },
  created () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.getTimes()
      this.getRvData()
      if (this.datePrice.length <= 0) {
        this.getRvDatePrice()
      }
      Comment.getList(comments => {
        this.comment_list = comments
      })
    } else {
      window.location.href = 'https://www.wanfangche.com/rental/' + this.$route.params.id + '/detail'
    }
  },
  watch: {
    occupy (val) {
      if (val) {
        setTimeout(() => {
          this.occupy = false
        }, 1500)
      }
    },
    message (val) {
      if (val) {
        setTimeout(() => {
          this.message = false
        }, 1000)
      }
    },
    time (val) {
      if (val === 0) {
        this.time = 60
        this.gaintxt = '获取验证码'
        this.messages = false
      }
    },
    datePickerValue (val) {
      this.getPrice()
    },
    login (val) {
      if (val) {
        document.height = 0
      } else {
        document.height = 'auto'
      }
    }
  }
}
function getFormatDate (value) {
  return value.toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
}
</script>

<style>
#rv-detail{
  background: #f5f5f5;
  padding-bottom: 45px;
}
.rv-meta-icon{
}
.rv-meta-icon img{
  width: 32px;
}

.reserve-container{
  width: 100%;
  border-top:1px solid #f5f5f5;
  background:#fff;
}
.reserve-left{
  padding: 10px 15px;
  overflow: hidden;
}
.reserve-right{
  position:absolute;
  right:0;
  top: 0;
  bottom: 0;
  width:150px;
  height:100%;
  /*background: #FE7C1E;*/
}
.reserve-right .btn{
  border-radius:0;
  line-height: 28px;
}
.vux-popup-dialog{
  background: #fff;
}
.rv-detail-title{
  margin-bottom: 2px;
  margin-top:15px;
}
.sticky-tab .vux-tab .vux-tab-item {
  color: #2E3E4C;
}
#rv-detail .app-container {
  position: relative;
}
body {
  height: inherit;
}
.hello {
  height: inherit;
}
#rv-detail .fixed-bottom-container {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
