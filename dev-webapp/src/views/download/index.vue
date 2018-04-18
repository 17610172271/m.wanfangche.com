<template>
  <div class="my-camp ag-body down-body" style="padding-top:0;" v-show="isShow">
    <swiper :options="swiperOption" style="height:100%;" v-show="!isWx">
      <swiper-slide class="swp-box swp-box-one">
        <div class="sbo-top on-top">
          <img src="https://img01.wanfangche.com/public/upload/201803/19/5aaf6df4caac4.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-tit on-top">
          <div><img src="https://img01.wanfangche.com/public/upload/201803/19/5aaf8e3c36522.png?x-oss-process=style/large" alt=""><span>v1.0</span></div>
        </div>
        <div class="sbo-mid">
          <img src="https://img01.wanfangche.com/public/upload/201803/19/5aaf6df527fc6.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-fot">
          <button @click="downBtn()">立即下载</button>
        </div>
      </swiper-slide>
      <swiper-slide class="swp-box swp-box-two">
         <div class="sbo-top on-top">
          <img src="https://img01.wanfangche.com/public/upload/201803/21/5ab1f693ca7a9.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-mid">
          <img src="https://img01.wanfangche.com/public/upload/201803/19/5aaf6df5042b6.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-fot">
          <button @click="downBtn()">立即下载</button>
        </div>
      </swiper-slide>
      <swiper-slide class="swp-box swp-box-two">
         <div class="sbo-top on-top">
          <img src="https://img01.wanfangche.com/public/upload/201803/21/5ab1f693c66f7.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-mid">
          <img src="https://img01.wanfangche.com/public/upload/201803/19/5aaf6df4a2b51.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-fot">
          <button @click="downBtn()">立即下载</button>
        </div>
      </swiper-slide>
      <swiper-slide class="swp-box swp-box-two">
         <div class="sbo-top on-top">
          <img src="https://img01.wanfangche.com/public/upload/201803/21/5ab1f693c1518.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-mid">
          <img src="https://img01.wanfangche.com/public/upload/201803/19/5aaf6df55f76d.png?x-oss-process=style/large" alt="">
        </div>
        <div class="sbo-fot">
          <button @click="downBtn()">立即下载</button>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" v-show="!isWx"></div>
    <div class="browser-container"  v-if="isWx">
        <div class="browser">
          <a class="camp-goback" href="javascript:" @click="goBack">
            <img src="../../assets/icon_back.png" width="11px">
          </a>
          <div class="arrows"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf4cd26.png?x-oss-process=style/large" alt=""></div>
          <div >
            <div class="warn-txt1">
              1.点击右上角<span class="more-icon"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf3b423.png?x-oss-process=style/small" alt=""></span>
            </div>
            <div class="warn-txt2">
              2.选择在浏览器中打开 以完成下载
            </div>
            <div class="browser-img2"><img width="100%" src="http://img01.wanfangche.com/public/upload/201802/06/5a790ebf5d920.png?x-oss-process=style/small" alt=""></div>
          </div>
        </div>
      </div>
      <transition name="fade">
      <div class="dow-box" v-show="message">
        <span class="icon-camp-delete"  @click="hideBtn"></span>
        <p class="one">当前仅支持Android版本下载</p>
        <p class="two">iOS版本即将上线，敬请期待</p>
        <button  @click="hideBtn">知道了</button>
      </div>
      </transition>
      <div class="dow-boxs" v-show="message" @click="hideBtn"></div>
  </div>
</template>
<script>
  import {isWechat, isIOS} from '@/tools/device'
  import wx from 'weixin-js-sdk'
  import api from '@/api'
  export default {
    data: () => ({
      swiperOption: {
        notNextTick: true,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        speed: 1000,
        autoplayDisableOnInteraction: false,
        initialSlide: 0,
        pagination: '.swiper-pagination',
        paginationClickable: true
      },
      message: false,
      messageTit: '下载失败',
      isWx: false,
      downUrl: 'https://wanfangche.com/server/community/public/download/android?from=h5',
      isShow: false
    }),
    methods: {
      downBtn () {
        if (isIOS()) {
          this.message = true
        } else {
          if (isWechat()) {
            this.isWx = true
          } else {
            window.location.href = this.downUrl
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
            wx.ready(() => {
              // 发送给朋友
              wx.onMenuShareAppMessage({
                title: '房车家族-中国最大的房车露营旅游交流平台',
                desc: '提供全球房车旅行租赁、露营地查询并集线上交流、解答、分享于一体的轻社区平台',
                link: targetUrl,
                imgUrl: 'https://img01.wanfangche.com/public/upload/201803/20/5ab0d8f3053bd.png?x-oss-process=style/large',
                success: function (res) {
                },
                cancel: function (res) {
                }
              })
              // 朋友圈
              wx.onMenuShareTimeline({
                title: '房车家族-中国最大的房车露营旅游交流平台',
                link: targetUrl,
                imgUrl: 'https://img01.wanfangche.com/public/upload/201803/20/5ab0d8f3053bd.png?x-oss-process=style/large',
                success: function (res) {
                },
                cancel: function (res) {
                }
              })
            })
          }
        })
      },
      init () {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          // console.log(1)
          this.wxShare()
          if (this.$route.query.type) {
            if (this.$route.query.type === 'pc') {
              this.downUrl = 'https://wanfangche.com/server/community/public/download/android?from=web'
            } else {
              this.downUrl = 'https://wanfangche.com/server/community/public/download/android?from=' + this.$route.query.type
            }
          } else {
            this.downUrl = 'https://wanfangche.com/server/community/public/download/android?from=h5'
          }
        } else {
          // console.log(2)
          window.location.href = 'https://www.wanfangche.com/download'
        }
      },
      goBack () {
        this.isWx = false
      },
      hideBtn () {
        this.message = false
      }
    },
    created () {
      document.title = '房车家族-中国最大的房车露营旅游交流平台'
      if (!isIOS()) {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.enjoyrv.main'
      } else {
        this.isShow = true
        this.init()
      }
    }
  }
</script>
