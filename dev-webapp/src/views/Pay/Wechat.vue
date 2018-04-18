<template>
	<div class="appbody">
		<div class="nav-header">
      <div class="nav-header-left">
        <a class="nav-header-back" href="javascript:" @click="goBack">
          <img src="../../img/icon_back.png">
          &nbsp;</a>
      </div>
      <h1 class="nav-header-title">
        支付订单
      </h1>
      <div class="nav-header-right">
        <a class="nav-header-more"></a>
      </div>
    </div>
		<div>
			<div class="wechat-m"></div>
			<span class="wechat-t">正在跳转...</span>
			<p class="wechat-p">如支付遇到问题(时间未跳转)建议您返回选择其他支付方式</p>
<p>{{one}}</p>
			<div class="wechat-a">
				<span class="pay-q" @click="goBack">支付遇到问题</span>
				<span class="pay-f" @click="goBack">支付完成</span>
			</div>
    </div>
	</div>
</template>

<script>
import NavHeader from '../Common/Navheader.vue'
import { Rater } from 'vux'
import api from '@/api'

export default {
  components: {
    NavHeader,
    Rater
  },
  data () {
    return {
      comment: {
        content: '',
        images: [],
        order_id: 10001,
        rv_id: 10002,
        rater: 5
      },
      order: {
        image: '../../static/img/rv-1.png'
      },
      openid: '',
      orderid: '',
      one: '',
      two: [],
      data: {
        appId: '',
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: '',
        paySign: ''
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/order/' + this.orderid + '/')
    },
    onBridgeReady () {
      window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', this.data,
      function (res) {
        this.two.push('res:')
        this.two.push(res)
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.one = '支付成功'
        }
      }
      )
    }
  },
  created () {
    this.openid = this.$route.query.openid
    this.orderid = parseInt(this.$route.query.id)
    this.axios.post(api.pay.pay, {orderid: this.orderid, paytype: 2, openid: this.openid})
    .then(response => {
      this.data = response.data.data.weixinpay
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        this.onBridgeReady()
      }
    })
  }
}
</script>
<style>
	.nav-header{
		background-color: #F5F5F5;
	}
</style>
