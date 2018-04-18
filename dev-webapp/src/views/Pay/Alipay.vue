<template>
	<div>
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
		<div class="appbody" v-show="isshow" style="padding-top:30px;">
			<p class="alipay-top">请在菜单中选择在历览器中打开，已完成支付</p>
			<div class="alipay-m">
				<img src="../../../static/img/alipay.png"/>
				<p class="alipay-text">在Safari中打开</p>
			</div>
			<div class="alipay-a">
				<span class="pay-q" @click="goBack">已完成支付</span>
				<span class="pay-f" @click="exit">取消并返回</span>
			</div>
    </div>
    <form :action="payurl" method="POST" ref="paydata" name="paydata" style="display:none;">
      <input v-for="item in data" type="text" :name="item.name" :value="item.val">
      <input type="submit" value="提交">
    </form>
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
      data: [],
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
      payurl: '',
      isshow: false,
      returnUrl: ''
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/order/' + this.$route.query.id + '/')
    },
    exit () {
      this.$router.go(-1)
    }
  },
  created () {
    var ua = window.navigator.userAgent.toLowerCase()
    var host = window.location.host
    if (ua.indexOf('micromessenger') > 0) {
      this.isshow = true
    } else {
      this.isshow = false
      this.axios.post(api.pay.pay, {orderid: parseInt(this.$route.query.id), paytype: 1})
      .then(response => {
        if (response.data.code === 200) {
          for (var key in response.data.data.alipay) {
            this.data.push({name: key, val: response.data.data.alipay[key]})
          }
          // this.data = response.data.data.alipay
          this.payurl = 'https://openapi.alipay.com/gateway.do?'
          this.returnUrl = host + '/order' + this.$route.query.id + '/'
          setTimeout(function () {
            document.paydata.submit()
          }, 1000)
          // this.$refs.paydata.submit()
          // window.location.replace(this.payurl)
        }
      })
    }
  }
}
</script>
<style>
	.nav-header{
		background-color: #F5F5F5;
	}
</style>
