<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/api'
import {isWechat, isIOS} from '@/tools/device'

export default {
  name: 'app',
  data () {
    return {
      homeShow: false,
      data: null
    }
  },
  computed: {
    ...mapGetters({
      isLoggedin: 'isLoggedin',
      querys: 'query'
    })
  },
  created () {
    this.initCurrentUrl()
    this.initWechatLogin()
  },
  methods: {
    ...mapActions([
      'saveToken'
    ]),

    // 初始化入口地址，用于微信分享
    initCurrentUrl () {
      if (isWechat() && isIOS()) window.sessionStorage.setItem('initUrl', window.location.href)
    },

    // 微信登录
    initWechatLogin () {
      var ua = window.navigator.userAgent.toLowerCase()
      if (!this.isLoggedin) {
        if (ua.indexOf('micromessenger') > 0) {
          this.homeShow = false
          var arr = window.location.href.split('&')
          if (arr[1]) {
            this.axios.post(api.user.wechatLogin, {access_token: arr[2].split('=')[1], openid: arr[1].split('=')[1]})
            .then(response => {
              this.saveToken({ token: response.headers.authorization })
              this.homeShow = true
            })
          } else {
            var urls = window.location.href + '?time=' + new Date().getTime()
            window.location.href = '/server/rental/public/User/Account/wechatAuth/?url=' + urls
          }
        } else {
          this.homeShow = true
        }
      } else {
        this.homeShow = true
      }
    }
  }
}
</script>

<style>
@import './css/bootstrap.min.css';
@import './css/style.css';
@import './css/style_1.css';
@import './css/wfcfont.css';
@import './css/styleone.css';
@import './css/font-awesome.min.css';
@import './css/font-feed.css';
@import './css/font-camp.css';


.app{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:100%;
  height: 100%;
  max-width: 750px;
  display: block;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>
