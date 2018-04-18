<template>
  <div>
    <div class="nav-top">
      <ul class="nav-inline nav-auto nav-inline-fixed">
        <li><router-link :to="{name: 'feed'}" class="text-bold">最新<span class="feed-line"></span></router-link></li>
        <li><router-link :to="{name: 'feed_follow'}" class="text-bold">关注<span class="feed-line"></span></router-link></li>
        <!-- <li><router-link :to="{name: 'feed_follow'}">视频</router-link></li>
        <li><router-link :to="{name: 'feed_follow'}">问答</router-link></li>
        <li><router-link :to="{name: 'feed_follow'}">附近</router-link></li>
        <li><router-link :to="{name: 'feed_follow'}">21RV</router-link></li>
        <li><router-link :to="{name: 'feed_follow'}">车型库</router-link></li> -->
      </ul>
    </div>
    
    <scroll class="app-container app-container-top app-container-bottom" v-model="list" ref="scrollComponent" key="feed-list"> 

       <!-- 新消息提醒 -->
      <!-- <new-message class="m-b"></new-message> -->
      <!-- /新消息提醒 -->

      <div class="adv-item">
        <router-link  :to="{name: 'camp'}" class="block">
          <div class="img-full block">
            <img src="https://img01.wanfangche.com/public/upload/201804/11/5acde251edd49.jpg?x-oss-process=style/large">
          </div>
        </router-link>
      </div>
      
      <feed-list-item class="" v-model="list"></feed-list-item>
    </scroll>
    <transition name="fadet">
    <div class="feed-add-container" v-show="addShow">
      <router-link class="feed-add-btn" :to="{name: 'feed_add'}">
        <i class="fd-publish text-lg"></i> 
        <!-- <i class="fa fa-pencil"></i>  -->
        <span class="text-md text-bold">发圈子</span> 
      </router-link>
    </div>
    </transition>
    <tabbar active="feed"></tabbar>

  </div>
</template>

<script>
import Tabbar from '../Tabbar'
import Scroll from '@/template/scroll'
import NewMessage from './new-message'
import FeedListItem from './list-item'
import wx from 'weixin-js-sdk'
import api from '@/api'
import config from '@/config'

export default {
  components: {
    Tabbar,
    Scroll,
    NewMessage,
    FeedListItem
  },
  data: () => ({
    list: [],
    scrollVal: 0,
    addShow: true,
    time: null
  }),
  methods: {
    initData () {
      this.initFeed()
      this.initWechat() // 初始化微信分享
    },
    initFeed () {
      this.$refs.scrollComponent.init({
        api: api.feed.list,
        params: {
          type: this.type
        },
        response: 'data.data.list'
      })
    },
    // 微信分享
    initWechat () {
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
              title: '房车圈',
              desc: '华人玩房车的达人都在这里了，玩房车，喜欢就一起来',
              link: targetUrl,
              imgUrl: config.feedShareImage,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
            // 朋友圈
            wx.onMenuShareTimeline({
              title: '房车圈 - 玩房车的达人都在这里了，玩房车，喜欢就一起来',
              link: targetUrl,
              imgUrl: config.feedShareImage,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
          })
          wx.error(function (res) {
          })
        }
      })
    },
    doScroll () {
      clearTimeout(this.time)
      let scrollValue = document.getElementsByClassName('app-container')[0].scrollTop
      if (scrollValue > 0) {
        if (this.scrollVal < scrollValue) {
        // 向下
          this.addShow = false
        } else if (this.scrollVal > scrollValue) {
          // 向上
          this.addShow = true
        }
      } else {
        this.addShow = true
      }
      this.scrollVal = scrollValue
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        this.initData()
      } else {
        window.location.href = 'https://www.wanfangche.com'
      }
    })
    if (document.getElementsByClassName('app-container').length > 0) {
      document.getElementsByClassName('app-container')[0].addEventListener('scroll', this.doScroll)
    }
  },
  beforeDestroy () {
    if (document.getElementsByClassName('app-container').length > 0) {
      document.getElementsByClassName('app-container')[0].removeEventListener('scroll', this.doScroll)
    }
  }
}
</script>
