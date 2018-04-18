<template>
  <div>
    <!--订单信息-->
        <loading-car v-show="!toLoad" class="middle"></loading-car>
        <transition name="fade">
        <div v-show="toLoad">
          
          <div v-if="list.length === 0">
            <div class="err-img">
              <img src="../../img/err-nothing.png" alt="" />
            </div>
            <div class="err-txt">
              <p>还没有订单</p>
              <p>快去体验旅行的乐趣吧</p>
            </div>
            <div class="err-btn">
              <button @click="routerGo">发现</button>
            </div>
          </div>
          <scroll-refresh :on-refresh="onRefresh" :on-infinite="onInfinite">
          <div class="panel padder-v" v-if="list.length !== 0" v-for="(order,index) in list"  >
            <div class="panel-heading">
              <div class="pull-right">
                <span v-if="order.status===0" class="text-default">待付款</span>
                <span v-if="order.status===1" class="text-muted">待商家确认</span>
                <span v-if="order.status===2" class="text-muted">预定成功，待取车</span>
                <span v-if="order.status===3" class="text-muted">已取车，待还车</span>
                <span v-if="order.status===4" class="text-muted">订单完成</span>
                <span v-if="order.status===5" class="text-muted">订单完成</span>
                <span v-if="order.status===6" class="text-muted">支付超时</span>
              </div>
              <router-link :to="{name: 'order_detail', params:{ id: order.id}}" class="text-normal">订单号：{{order.code}} <span class="fl_l">{{stateFitter(order.status)}}</span></router-link>
            </div>
            <div class="panel-body m-t-sm">
            <router-link :to="{name: 'order_detail', params:{ id: order.id}}" class="text-normal">
              <div class="well-c bg-gray" style="padding:10px;">
                <div class="clear">
                  <div class="pull-left thumb-md m-r"><img :src="order.img_cover + '_small'"></div>
                  <div class="clear">
                    <div class="title">{{order.title}}</div>
                    <div class="text-muted m-b-sm normal">{{order.adult_passengers * 1}}人·
                      <span v-if="order.transmission_case === '1'">自动挡</span>
                      <span v-if="order.transmission_case === '2'">自动挡</span>
                      <span v-if="order.transmission_case === '3'">自动挡</span>·
                      <span v-if="order.actuation === '1'">汽油</span>
                      <span v-if="order.actuation === '2'">柴油</span>
                      <span v-if="order.actuation === '3'">电力</span>
                      <span v-if="order.actuation === '4'">混合动力</span>
                      <span v-if="order.actuation === '5'">其他</span>
                    </div>
                    <div class="thumb-sm" v-if="order.brand_logo"><img :src="order.brand_logo"></div>
                  </div>
                </div>
                <div class="clear text-small text-muted padder-v">
                  <div class="pull-right" style="padding:0;"><span>还车</span></div>
                  <div class=""><span>取车</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-5">
                    <div class="text-lg m-r-minus">
                      {{order.pickup_time | formatTime('YYYY-MM-DD')}}
                    </div>
                    <div class="">
                      {{order.pickup_time | formatTime('周E')}} {{order.pickup_time | formatTime('HH:mm:ss')}}
                    </div>
                  </div>
                  <div class="col-xs-2 padder-xs">
                    <div class="row">
                      <div class="total-day-md text-center">
                          <div class="total-day-underline-muted text-muted">{{order.total_days}}天</div>
                        </div>
                      </div>
                  </div>
                  <div class="col-xs-5 text-right">
                    <div class="text-lg m-l-minus">
                      {{order.return_time | formatTime('YYYY-MM-DD')}}
                    </div>
                    <div class="">
                      {{order.return_time | formatTime('周E')}} {{order.return_time  | formatTime('HH:mm:ss')}}
                    </div>
                  </div>
                </div>
                  <div class="row">
                  <div class="col-xs-6">
                    <div class="text-muted">
                    {{order.pickup_store_city}}-{{order.pickup_store_name}}
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="text-muted text-right">{{order.return_store_city}}-{{order.return_store_name}}</div>
                  </div>
                </div>
              </div>
              </router-link>
            </div>
            <div class="panel-body m-t-sm">
              <div class="pull-right pull-rights">
                <span class="btn btn-primary-b w-md btn-w-md" @click="btn_deal(order.id, index, 1)" v-if="order.status === '8'">取消订单</span>
                <span class="btn btn-primary-b w-md btn-w-md" @click="btn_deal(order.id, index, 2)" v-if="order.status === '4'">取消订单</span>
                <span class="btn btn-primary-b w-md btn-w-md" @click="btn_deal(order.id, index, 0)" v-if="order.status === '1'">取消订单</span>
                <router-link :to="{name: 'order_pay', params:{id: order.id}}" class="btn btn-primary-c w-md btn-w-md" v-if="order.status === '1'">支付</router-link>
                
                <span v-if="order.status === '11'">
                  <router-link :to="{name: 'order_comment', params: {id: order.id, rv: order.rv_id}}" class="btn btn-primary-c w-md btn-w-md" v-if="order.user_comment_status === '1'">评价</router-link>
                  <span class="btn btn-primary-b w-md btn-w-md" v-else>已评价</span>
                </span>
              </div>
              <div class="m-t-sm">
                <span>线上支付</span>
                <span class="text-dark">￥{{order.fee_total | parseInt}}</span>
                <span class="text-muted">(共{{order.total_days}}天)</span>
              </div>
            </div>
          </div>
          </scroll-refresh>
          
        </div>
        </transition>
        <!--/ 订单信息-->
        <popup v-model="deal_show" width="100%" height="auto" position="bottom" class="deal" :show-mask="false" style="box-shadow:0px 2px  4px 4px rgba(52, 52, 52, 0.1);">
          <div class="deal_txt" v-html="payment">{{payment}}</div>
          <div class="deal_btn">
            <button @click="btn_hide">不取消</button><button @click="btn_deals()">确认取消</button>
          </div>
        </popup>
        <popup v-model="deal_shows" width="100%" height="auto" position="bottom" class="deals" :show-mask="false">
          {{dealTxt}}
        </popup>
        <div class="add-back" v-if="deal_show || deal_shows"></div>
  </div>
</template>

<script>
import { Popup } from 'vux'
import api from '@/api'
import formatTime from '@/filters/format-time'
import ScrollRefresh from '@/components/Refresh'
import LoadingCar from '@/components/loading/car'

export default {
  components: {
    Popup,
    ScrollRefresh,
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
      deal_show: false,
      index_id: 0,
      user_id: 0,
      deal_shows: false,
      dealTxt: '',
      state: '',
      states: '',
      indexs: 0,
      payment: '',
      list: [],
      listPage: 1,
      toLoad: false,
      one: true
    }
  },
  created () {
    this.axios.get(api.user.list)
    .then(response => {
      if (response.data.code === 200) {
        this.user_id = response.data.data.id
      }
    })
    this.axios.get(api.order.list, {params: {size: 10, page: this.listPage}})
    .then(response => {
      if (response.data.code === 200) {
        if (response.data.data) {
          this.list = response.data.data.list
        } else {
          this.list = []
        }
        this.toLoad = true
      }
    })
  },
  methods: {
    onRefresh () {
      this.$router.go('')
    },
    btn_deal (ind, inds, status) {
      switch (status) {
        case 0:
          this.payment = '<p class="tet-center">是否确认取消订单？</p>'
          break
        case 1:
          this.payment = '<h2>退款规则</h2><p>1.若您距离取车时间大于10天,将不扣除费用。</p><p>2.若您距离取车时间在3到10天,将扣除60%费用。</p><p>3.若您距离取车时间在3天内,将扣除100%费用。</p><p>玩房车将在10个工作日内给您退款,是否确认取消订单？</p>'
          break
        case 2:
          this.payment = '<p>玩房车将在10个工作日内给您退款,是否确认取消订单？</p>'
          break
      }
      this.deal_show ? this.deal_show = false : this.deal_show = true
      this.index_id = ind
      this.indexs = inds
    },
    btn_hide () {
      this.deal_show = false
    },
    btn_deals () {
      if (this.one) {
        this.one = false
        this.axios.post(api.user.remove, {id: parseInt(this.index_id), pickup_cityid: parseInt(this.user_id)})
        .then(response => {
          if (response.data.code === 200) {
            this.deal_show ? this.deal_show = false : this.deal_show = true
            this.deal_shows ? this.deal_shows = false : this.deal_shows = true
            this.dealTxt = '取消成功'
            this.list[this.indexs].status = '2'
            this.one = true
          } else {
            this.deal_show ? this.deal_show = false : this.deal_show = true
            this.deal_shows ? this.deal_shows = false : this.deal_shows = true
            this.dealTxt = '取消失败'
            this.one = true
          }
        })
      }
    },
    stateFitter (ind) {
      switch (parseInt(ind)) {
        case 1:
          return '待付款'
        case 2:
          return '订单已取消'
        case 3:
          return '支付超时'
        case 4:
          return '已支付，待确认'
        case 5:
          return '订单已取消'
        case 6:
          return '商家确认取消'
        case 7:
          return '已支付,未接单'
        case 8:
          return '已确认,待取车'
        case 9:
          return '已拒单,待退款'
        case 10:
          return '待还车'
        case 11:
          return '已完成'
      }
    },
    evaluates (ind) {
      if (ind === '1') {
        this.state = true
      } else {
        this.state = false
      }
    },
    routerGo () {
      this.$router.push('/')
    },
    onInfinite (done) {
      this.listPage++
      this.axios.get(api.order.list, {params: {size: 10, page: this.listPage}})
      .then(response => {
        if (response.data.code === 200) {
          if (response.data.data) {
            // this.list = response.data.data.list
            this.list.push.apply(this.list, response.data.data.list)
            done()
          } else {
            done(true)
          }
        }
      })
    }
  },
  watch: {
    deal_shows (val) {
      if (val) {
        setTimeout(() => {
          this.deal_shows = false
        }, 1000)
      }
    }
  }
}
</script>

<style>
	.panel-body .well-c{
		background: #F5F5F5;
		border: 4px;
	}
</style>
