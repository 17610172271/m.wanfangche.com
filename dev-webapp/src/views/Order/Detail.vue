<template>
  <div id="order-detail" class="bg-light" style="min-height:500px;background:#FFFFFF;">
  <loading-car v-show="!toLoad" class="middle"></loading-car>
  <transition name="fade">
  <div v-show="toLoad">
    <div class="nav-header"  style="background:#F5F5F5">
      <div class="nav-header-left">
        <a class="nav-header-back" href="javascript:" @click="goBack">
          <img src="../../img/icon_back.png">
          &nbsp;</a>
      </div>
      <h1 class="nav-header-title" >
        订单详情
      </h1>
      <div class="nav-header-right">
        <a class="nav-header-more"></a>
      </div>
    </div>

    <div class="app-body app-container"  style="background:#F5F5F5;padding:44px 0;">
      <!-- <div class="panel m-t">
        <div class="order-status">
          <div class="text-default">{{statusone}}</div>
        </div>
        <div class="img-group">
          <img src="../../../static/img/group_1.png"/>
        </div>
        <div class="order-status">
          <div class="text-default">已付款</div>
        </div>
        <div class="img-group">
          <img src="static/img/group_2.png"/>
        </div>
        <div class="order-status">
          <div class="text-default">待商家确认</div>
        </div>
        <div class="img-group">
          <img src="static/img/group_3.png"/>
        </div>
        <div class="panel-body">
         <ul class="list-group list-group-underline">
           <li class="list-group-item">
             <label class="label-title text-muted">取车证件</label>
             <span class="orange">身份证+驾驶证+信用卡</span>
           </li>
           <li class="list-group-item">
             <label class="label-title text-muted">取车押金</label>
             <span class="orange">需刷信用卡预授权 ￥{{data.accredit | parseInt}}</span>
           </li>
           <li class="list-group-item">
             <label class="label-title text-muted">订单总额</label>
             <span  class="orange">预计订单总额 ￥{{data.fee_total | parseInt}}</span>
           </li>
         </ul>
       </div>
      </div> -->

      <!--订单信息-->
        <div class="panel m-t padder-v m-l-10" style="padding-top:0px;">
          <div v-if="data.status === '1' || data.status === '4' || data.status === '7'">
            <div class="order-status">
              <div class="text-default" style="font-size:18px;">{{statusone}}</div>
            </div>
            <div class="img-group">
              <img src="/static/img/group_1.png"/>
            </div>
          </div>

          <div v-else-if="data.status === '8' || data.status === '10'">
            <div class="order-status" style="background:#CCEAFA;">
              <div class="text-default" style="color:#0096E4; font-size:18px;">{{statusone}}</div>
            </div>
            <div class="img-group">
              <img src="/static/img/blue.png"/>
            </div>
          </div>

          <div  v-else-if="data.status === '11'">
            <div class="order-status" style="background:#E4F1D3;">
              <div class="text-default" style="color:#77B825; font-size:18px;">{{statusone}}</div>
            </div>
            <div class="img-group">
              <img src="/static/img/green.png"/>
            </div>
          </div>

          <div v-else>
            <div class="order-status" style="background:#C8D1DC;">
              <div class="text-default" style="color:#8D9DB0; font-size:18px;">{{statusone}}</div>
            </div>
            <div class="img-group">
              <img src="/static/img/gray.png"/>
            </div>
          </div>
          <div class="panel-heading" style="padding:15px 15px 0 15px;">
            <div class="pull-right" style="padding:0;">
              <span class="text-default">{{data.created_at}}</span>
            </div>
            <div class="text-normal">订单号：{{data.code}}</div>
          </div>
          <div class="panel-body m-t-sm">
            <div class="well-c">
              <div class="clear">
                <div class="pull-left thumb-md m-r"><img :src="data.img_cover"></div>
                <div class="clear">
                  <div class="title">{{data.title}}</div>
                  <div class="text-muted m-b-sm normal">
                    {{data.adult_passengers * 1}}人·
                    <span v-if="data.transmission_case === '1'">自动档</span>
                    <span v-if="data.transmission_case === '2'">手动档</span>
                    <span v-if="data.transmission_case === '3'">手/自动档</span>·
                    <span v-if="data.actuation === '1'">汽油</span>
                    <span v-if="data.actuation === '2'">柴油</span>
                    <span v-if="data.actuation === '3'">电力</span>
                    <span v-if="data.actuation === '4'">混合动力</span>
                    <span v-if="data.actuation === '5'">其他</span>
                  </div>
                  <div class="thumb-sm">
                    <router-link :to="{name: 'agency', params:{id: data.agency_id}}">
                    <img :src="data.logo">
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="clear text-small text-muted padder-v">
                <div class="pull-right"><span>还车</span></div>
                <div class=""><span>取车</span></div>
              </div>
              <div class="row">
                <div class="col-xs-5">
                  <div class="text-lg m-r-minus">
                    {{pickup_time.time}}
                  </div>
                  <div class="">
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
                  <div class="">
                    {{return_time.time | formatTime('周E')}} {{return_time.hour}}
                  </div>
                </div>
              </div>
                <div class="row">
                <div class="col-xs-6">
                  <div class="text-muted">
                  <span>
                  {{data.pickup_store_city}}-{{data.pickup_store_name}}
                  </span>
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="text-muted text-right">
                  <span>
                  {{data.return_store_city}}-{{data.return_store_name}}
                  </span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--/ 订单信息-->

        <div class="panel m-t m-l-10">
        <div class="panel-body" style="padding:5px 15px 0px 15px;">
          <ul class="list-group list-group-underline">
            <li class="titles"><h2>驾驶人信息</h2></li>
            <li class="list-group-item txt-top-3">
              <label class="label-title text-muted">驾驶人姓名</label>
              <span>{{data.driver_name}}</span>
            </li>
            <li class="list-group-item txt-top-3">
              <label class="label-title text-muted">证件类型</label>
              <span>{{data.driverText}}</span>
            </li>
            <li class="list-group-item txt-top-3">
              <label class="label-title text-muted">生日</label>
              <span>{{data.driver_birthday}}</span>
            </li>
          </ul>
        </div>
      </div>

        <div class="panel m-t m-l-10">
        <div class="panel-body" style="padding:5px 15px 0px 15px;">
          <ul class="list-group list-group-underline">
            <li class="titles"><h2>联系人信息</h2></li>
            <li class="list-group-item txt-top-3">
              <label class="label-title text-muted">姓名</label>
              <span>{{data.contact_name}} {{data.contact_appellation}}</span>
            </li>
            <li class="list-group-item txt-top-3">
              <label class="label-title text-muted">手机号码</label>
              <span>{{data.contact_tel}}</span>
            </li>
            <li class="list-group-item txt-top-3" v-if="data.contact_email !== ''">
              <label class="label-title text-muted">邮箱</label>
              <span>{{data.contact_email}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="panel m-t m-l-10">
        <div class="panel-body" >
          <ul class="list-group list-group-underline">
            <li class="list-group-item">
              <label class="label-title text-muted">车辆租赁费</label>
              <div class="pull-right">
                <span class="text-muted">{{data.fee_rent_total / data.total_days | parseInt}} x {{data.total_days}} =</span>
                <span class="text-default">￥{{data.fee_rent_total | parseInt}}</span>
              </div>
            </li>
            <li class="list-group-item txt-top-4">
              <label class="label-title text-muted">基本保险费</label>
              <div class="pull-right">
                <span class="text-muted">{{data.fee_insurance_basic | parseInt}} x {{data.total_days}} =</span>
                <span class="text-default">￥{{data.fee_insurance_basic * data.total_days}}</span>
              </div>
            </li>
           <!--  <li class="list-group-item">
             <label class="label-title text-muted">车上人员及财产保险</label>
             <div class="pull-right">
               <span class="text-default">￥280</span>
             </div>
           </li>
           <li class="list-group-item list-group-item-none">
             <label class="label-title text-muted label-title-t">人身险</label>
             <div class="pull-right">
               <span class="text-muted">20x7 =</span>
               <span class="text-default text-default-t">140</span>
             </div>
           </li>
           <li class="list-group-item">
             <label class="label-title text-muted label-title-t">财务险</label>
             <div class="pull-right">
               <span class="text-muted">20x7 =</span>
               <span class="text-default text-default-t">140</span>
             </div>
           </li> -->
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
            <!-- <li class="list-group-item">
              <label class="label-title text-muted label-title-t">财务险</label>
              <div class="pull-right">
                <span class="text-muted">10x7 =</span>
                <span class="text-default text-default-t">70</span>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="panel m-t m-l-10" v-show="data.remind">
        <div class="panel-body">
          <ul class="list-group list-group-underline">
            <li class="list-group-item">
              <label class="label-title text-muted" style="width:100%;">取还车提醒:</label>
              <div v-html="data.remind">{{data.remind}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear padder">
        <div class="text-muted text-small">
          已仔细阅读并同意《<a @click="retreatShow">退改规则</a>》
        </div>
      </div>
      
    </div>

    <div class="fixed-bottom-container" v-if="data.status === '1'" :style="examine">
      <div class="fixed-bottom-container-left">
        <label class="text-small text-normal">线上支付：</label>
        <span class="text-xlg text-dark">￥{{data.fee_total | parseInt}}</span>
        <span class="text-date text-normal">(共{{data.total_days}}天)</span>
      </div>
      <div class="fixed-bottom-container-right" >
        <!--<a  @click="showLoading" class="btn btn-lg btn-custom btn-block">支付</a>-->
        <router-link :to="{name: 'order_pay', params:{id: data.id}}" class="btn btn-lg btn-custom btn-block">支付</router-link>
      </div>
    </div>
    <div class="fixed-bottom-container" v-if="data.status === '11'" :style="examine">
      <div class="fixed-bottom-container-left">
        <label class="text-small text-normal">线上支付：</label>
        <span class="text-xlg text-dark">￥{{data.fee_total | parseInt}}</span>
        <span class="text-date text-normal">(共{{data.total_days}}天)</span>
      </div>
      <div class="fixed-bottom-container-right" v-if="data.user_comment_status === '1'">
        <router-link :to="{name: 'order_comment', params:{id: data.id, rv: data.rv_id}}" class="btn btn-lg btn-custom btn-block">评价</router-link>
      </div>
      <div class="fixed-bottom-container-right" v-else>
        <span class="btn btn-lg btn-custom btn-block btn-grayss">已评价</span>
      </div>
    </div>
  </div>
  </transition>
    <popup v-model="retreat" class="constructors retreat" style="height:auto;top:30%;">
      <span class="remove" @click="retreatShow"></span>
      <div style="height:auto;">
        <h2>退改规则</h2>
        <p>1.预订成功后,不支持改期或转赠他人；</p>
        <p>2.提前十天取消订单可全额退款,3-10天取消订单收取60%费用,3天内取消订单收取100%的费用；</p>
        <p>3.若因不可抗力因素(如暴雨、4级以上大风等恶劣天气及其他),房车体验将无法正常运营，具体情况以当天公告为准。支持全额退款或改期,但不承担因此产生的行程费用；</p>
      </div>
      
    </popup>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import { XInput, Checklist, Loading, TransferDomDirective as TransferDom, Popup } from 'vux'
import api from '@/api'
import formatTime from '@/filters/format-time'
import LoadingCar from '@/components/loading/car'

export default {
  directives: {
    TransferDom
  },
  components: {
    Navheader,
    XInput,
    Checklist,
    Loading,
    Popup,
    LoadingCar
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
      order: {
        id: 0
      },
      driver: {},
      insurance: ['人身保险', '财产保险'],
      checkList: [],
      checkList2: [],
      show_loading: false,
      retreat: false,
      data: {
        agency_id: 0,
        pickup_store_id: 0,
        return_store_id: 0,
        driverText: ''
      },
      statusone: '',
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
      toLoad: false,
      serverList: [],
      fee_extra_service: 0
    }
  },
  computed: {
    examine () {
      return {
        'z-index': this.retreat ? 1 : 506
      }
    }
  },
  created () {
    parseInt(this.$route.path.split('id=').pop())
    this.axios.get(api.order.detail, {params: {id: parseInt(this.$route.params.id)}})
    .then(response => {
      if (response.data.code === 200) {
        this.data = response.data.data
        this.status(this.data.status)
        this.pickup_time.time = response.data.data.pickup_time.split(' ')[0]
        this.pickup_time.hour = response.data.data.pickup_time.split(' ')[1]
        this.return_time.time = response.data.data.return_time.split(' ')[0]
        this.return_time.hour = response.data.data.return_time.split(' ')[1]
        this.resetServerList(response.data.data.detail)
        this.driverLicense(response.data.data.driver_license_class)
        console.log(response.data.data.detail)
        for (var key in response.data.data.detail) {
          if (response.data.data.detail[key].type > 1) {
            this.fee_extra_service += response.data.data.detail[key].amount * 1
          }
        }
      }
      this.toLoad = true
    })
  },
  methods: {
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
    goBack () {
      this.$router.replace('/user/order')
    },
    showLoading () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 3000)
    },
    retreatShow () {
      this.retreat ? this.retreat = false : this.retreat = true
    },
    status (ind) {
      switch (ind) {
        case '1':
          this.statusone = '未支付'
          break
        case '2':
          this.statusone = '订单已取消'
          break
        case '3':
          this.statusone = '支付超时'
          break
        case '4':
          this.statusone = '已支付，待确认'
          break
        case '5':
          this.statusone = '订单已取消'
          break
        case '6':
          this.statusone = '商家确认取消'
          break
        case '7':
          this.statusone = '已支付,未接单'
          break
        case '8':
          this.statusone = '已确认,待取车'
          break
        case '9':
          this.statusone = '已拒单,待退款'
          break
        case '10':
          this.statusone = '待还车'
          break
        case '11':
          this.statusone = '已完成'
          break
      }
    },
    driverLicense (ind) {
      console.log(ind)
      switch (parseInt(ind)) {
        case 1:
          this.data.driverText = '中国驾照 C1'
          break
        case 2:
          this.data.driverText = '中国驾照 C2'
          break
        case 3:
          this.data.driverText = '中国驾照 C3'
          break
        case 4:
          this.data.driverText = '中国驾照 B1'
          break
        case 5:
          this.data.driverText = '中国驾照 B2'
          break
        case 6:
          this.data.driverText = '中国驾照 B3'
          break
        case 7:
          this.data.driverText = '中国驾照 A1'
          break
        case 8:
          this.data.driverText = '中国驾照 A2'
          break
        case 9:
          this.data.driverText = '中国驾照 A3'
          break
        case 10:
          this.data.driverText = '香港驾照'
          break
        case 11:
          this.data.driverText = '国际驾照'
          break
      }
    }
  }
}
</script>
<style scoped>
li.list-group-item span{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #8D9DB0;
  letter-spacing: 0;
}
li.txt-top-3{
  position: relative;
  height: 46px;
}
li.txt-top-3 span{
  position: absolute;
  top: 8px;
  float: left;
  left: 27%;
}
li.txt-top-3 label{
  position: absolute;
  top: 10px;
}
li.txt-top-4{
  height: 46px;
}
li.txt-top-4 label{
  position: absolute;
  top: 11px;
}
#order-detail{
  min-height: 700px;
  padding-bottom: 200px;
}
.order-status{
  background-color: rgba(254, 124, 30, .2);
  padding:18px 15px;
  font-weight: 600;
}
.padder-v .m-t-sm .well-c{
	background: #fff;
	border: none;
}
.title{
  font-family: PingFangSC-Medium;
}
</style>
