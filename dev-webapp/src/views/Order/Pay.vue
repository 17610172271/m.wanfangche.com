<template>
	<div>
		<nav-header style="background:#F5F5F5;">支付方式</nav-header>
    <loading-car v-show="!toLoad" class="middle"></loading-car>
		<div class="app-body app-container" v-show="toLoad" style="padding:44px 0;">
        <div class="panel m-t padder-v padder-p" style="margin:0 10px 0;">
          <div class="panel-body m-t-sm">
            <div class="well-c" style="background:#FFFFFF;">
              <div class="code"><span>订单号 : </span>{{data.code}}</div>
              <div class="clear">
              	<!-- <div class="title-img"></div> -->
                <div class="clear">
                  <div class="title">{{data.title}}</div>
                  <div class="text-muted m-b-sm normal">
                     {{data.adult_passengers | parseInt}}人·
                    <span v-if="data.transmission_case === '1'">自动档</span>
                    <span v-if="data.transmission_case === '2'">手动档</span>
                    <span v-if="data.transmission_case === '3'">手/自动档</span>·
                    <span v-if="data.actuation === '1'">汽油</span>
                    <span v-if="data.actuation === '2'">柴油</span>
                    <span v-if="data.actuation === '3'">电力</span>
                    <span v-if="data.actuation === '4'">混合动力</span>
                    <span v-if="data.actuation === '5'">其他</span>
                  </div>
                </div>
              </div>
              <div class="clear text-small text-muted padder-v">
                <div class="pull-right" style="padding:0;"><span>还车</span></div>
                <div class=""><span>取车</span></div>
              </div>
              <div class="row">
                <div class="col-xs-5">
                  <div class="text-lg m-r-minus">
                    {{pickup_time.time}}
                  </div>
                  <div class="" style="color: #8D9DB0;">
                    {{pickup_time.time | formatTime('周E')}} {{pickup_time.hour}}
                  </div>
                </div>
                <div class="col-xs-2 padder-xs">
                  <div class="row">
                  <div class="total-day-md text-center">
                    <div class="total-day-underline-muted text-muted">{{data.total_days}}天</div>
                  </div>
                </div>
                </div>
               <div class="col-xs-5 text-right">
                  <div class="text-lg m-l-minus">
                    {{return_time.time}}
                  </div>
                  <div class="" style="color: #8D9DB0;">
                    {{return_time.time | formatTime('周E')}} {{return_time.hour}}
                  </div>
                </div>
              </div>
                <div class="row">
               <div class="col-xs-6">
                  <div class="text-muted">{{data.pickup_store_city}}-{{data.pickup_store_name}}</div>
                </div>
                <div class="col-xs-6">
                  <div class="text-muted text-right">{{data.return_store_city}}-{{data.return_store_name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-pay panel m-t padder-p">
          <div @click="isshow">
            <span class="panel-p">应付金额</span>
            <span class="text-default-pay">￥{{data.fee_total | parseInt}}</span>
            <div :class="{'text-default-b': ispirce, 'text-default-s': !ispirce}"></div>
          </div>
        	<transition name="fade">
          <div class="panel-body" v-show="ispirce">
            <ul class="list-group list-group-underline">
              <li class="list-group-item">
                <label class="label-title text-muted">车辆租赁费</label>
                <div class="pull-right the-right">
                  <span class="text-muted">{{data.fee_rent_total / data.total_days | parseInt}}</span>
                  <span class="text-muted">x&nbsp;{{data.total_days}}</span>
                  <span class="text-default" style="line-height:36px;">￥{{data.fee_rent_total | parseInt}}</span>
                </div>
              </li>
              <li class="list-group-item">
                <label class="label-title text-muted">门店额外服务</label>
                <div class="pull-right">
                  <span class="text-default">￥{{fee_extra_service | parseInt}}</span>
                </div>
                <p class="server-list" v-for="item in serverList">
                  <span>{{item.name}}</span>
                  <span>￥{{item.price  | parseInt}}</span>
                  <span v-if="!item.type"></span>
                  <span v-show="item.num > 1">*{{item.num}}</span>
                  <span v-show="item.days > 1">×{{item.days}}天</span>
                </p>
              </li>
            </ul>
          </div>
          </transition>
        </div>
        <div class="panel-pay-f">
        	<li class="pay-style">
            <label class="label-title text-muted label-title-t">支付方式</label>
          </li>
          <hr />
          <li>
            <a :href="hrefs" class="label-title-t">
	          <div class="pay-style-w">
	          	<div class="wechat-img"></div>
	            <label class="label-title text-muted label-title-t">微信支付</label>
	            <img src="../../../static/img/an.png"/>
	          </div>
            </a>
          </li>
          <li  @click="onready">
	          <router-link :to="{name: 'pay_alipay', query: {id: payid}}" class="pay-style-z order_alipay">
	          	<div class="alipay-img"></div>
	            <label class="label-title text-muted label-title-t">支付宝支付</label>
	            <img src="../../../static/img/an.png"/>
	          </router-link>
          </li>
        </div>
      <div class="clear padder padder-t" @click="retreatShow">
        <div class="text-muted text-small">
          已仔细阅读并同意《<router-link :to="{ name: ''}">退改规则</router-link>》
        </div>
      </div>
   </div>
   <popup v-model="retreat"  class="constructors retreat" style="height:auto;top:30%;">
   <span class="remove" @click="retreatShow"></span>
     <h2>退改规则</h2>
      <p>1.预订成功后,不支持改期或转赠他人；</p>
      <p>2.提前十天取消订单可全额退款,3-10天取消订单收取60%费用,3天内取消订单收取100%的费用；</p>
      <p>3.若因不可抗力因素(如暴雨、4级以上大风等恶劣天气及其他),房车体验将无法正常运营，具体情况以当天公告为准。支持全额退款或改期,但不承担因此产生的行程费用；</p>
   </popup>
	</div>
</template>

<script>
import NavHeader from '../Common/Navheader.vue'
import { XInput, Checklist, Loading, TransferDomDirective as TransferDom, Popup } from 'vux'
import api from '@/api'
import formatTime from '@/filters/format-time'
import LoadingCar from '@/components/loading/car'
import { WECHAT_ZUCHE_PAY, WECHAT_RENTAL_PAY } from '@/config'

export default {
  directives: {
    TransferDom
  },
  components: {
    NavHeader,
    XInput,
    Checklist,
    Loading,
    Popup,
    LoadingCar
  },
  data () {
    return {
      order: {},
      driver: {},
      insurance: ['人身保险', '财产保险'],
      checkList: [],
      checkList2: [],
      show_loading: false,
      data: {},
      pickup_time: {
        time: '',
        hour: '',
        week: ''
      },
      return_time: {
        time: '',
        hour: '',
        week: ''
      },
      ispirce: false,
      retreat: false,
      payid: '',
      one: '',
      two: '',
      three: '',
      four: '',
      hrefs: '',
      serverList: [],
      fee_extra_service: 0,
      toLoad: false
    }
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
  created () {
    this.payid = this.$route.params.id
    this.wechatUrl(this.payid)
    this.axios.get(api.order.detail, {params: {id: parseInt(this.$route.params.id)}})
    .then(response => {
      if (response.data.code === 200) {
        this.data = response.data.data
        this.pickup_time.time = response.data.data.pickup_time.split(' ')[0]
        this.pickup_time.hour = response.data.data.pickup_time.split(' ')[1]
        this.return_time.time = response.data.data.return_time.split(' ')[0]
        this.return_time.hour = response.data.data.return_time.split(' ')[1]
        this.resetServerList(response.data.data.detail)
        for (var key in response.data.data.detail) {
          if (response.data.data.detail[key].type > 1) {
            this.fee_extra_service += response.data.data.detail[key].amount * 1
          }
        }
        this.toLoad = true
      }
    })
  },
  methods: {
    onready () {
      this.$router.go(0)
    },
    resetServerList (arr) {
      for (var i = 0; i < arr.length; i++) {
        switch (arr[i].type) {
          case '2':
            this.serverList.push({name: '上门送车', price: arr[i].amount, days: arr[i].days, type: true})
            break
          case '3':
            this.serverList.push({name: '上门还车', price: arr[i].amount, days: arr[i].days, type: true})
            break
          case '4':
            this.serverList.push({name: '房车管家(代驾)服务', price: arr[i].amount, days: arr[i].days, num: arr[i].num})
            break
          case '5':
            this.serverList.push({name: arr[i].goods_name, price: arr[i].amount, days: arr[i].days, num: arr[i].num})
            break
        }
      }
    },
    showLoading () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 3000)
    },
    pay () {
      window.location = this.four
    },
    isshow () {
      this.ispirce ? this.ispirce = false : this.ispirce = true
    },
    retreatShow () {
      this.retreat ? this.retreat = false : this.retreat = true
    },
    wechatUrl (ind) {
      let href = window.location.href
      if (href.indexOf('zuche') !== -1) {
        this.hrefs = WECHAT_ZUCHE_PAY + ind
      } else {
        this.hrefs = WECHAT_RENTAL_PAY + ind
      }
    }
  }
}
</script>
<style scoped>
  .title{
    font-family: PingFangSC-Medium;
font-size: 16px;
color: #8D9DB0;
letter-spacing: 0;
  }
	.nav-header{
		background-color: #F5F5F5;
	}
  .panel-body .well-c{
    padding:0 0 10px 0;
  }
</style>
