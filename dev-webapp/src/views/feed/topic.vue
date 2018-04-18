<template>
  <div>
    <nav-header :to="{name: 'feed'}"></nav-header>
    <scroll class="app-container app-container-top" v-model="list" ref="scrollComponent" key="feed-list"> 
      <div class="text-normal text-xxlg bg-white topic-title text-bold">{{topic.title ? '#' + topic.title + '#' : '话题'}}</div>
      <div class="clear bg-white topic-candle text-sm">
        <div class="pull-left p-r-14">话题浏览 <span class="text-normal">{{topic.pass_num}}</span></div>
        <div class="pull-left">互动人次 <span class="text-normal">{{topic.active_num}}</span></div>
      </div>
      <feed-list-item v-model="list"></feed-list-item>
    </scroll>
  </div>
</template>

<script>
import NavHeader from '../Common/Navheader'
import Scroll from '@/template/scroll'
import FeedListItem from '../feed/list-item'
import {looseEqual} from '@/tools/util'
import wx from 'weixin-js-sdk'
import config from '@/config'

import api from '@/api'

export default {
  components: {
    Scroll,
    NavHeader,
    FeedListItem
  },
  data: () => ({
    list: [],
    topic: {
      id: null
    },
    id: null,
    data: {
      title: '',
      content: '',
      img: ''
    }
  }),
  methods: {
    initData () {
      this.list = []
      this.getDetail()
      this.initScroll()
    },

    // 话题详情
    getDetail () {
      this.axios.get(api.topic.detail, {params: {
        id: this.$route.params.t_id
      }})
      .then(response => {
        if (response.data && response.data.code === 1) {
          this.topic = response.data.data
          this.id = this.topic.id
        }
      })
    },

    initScroll () {
      this.$refs.scrollComponent.init({
        api: api.topic.feed,
        params: {
          id: this.$route.params.t_id
        },
        response: 'data.data.list'
      })
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
              title: _this.topic.title,
              desc: _this.data.content,
              link: targetUrl,
              imgUrl: _this.data.img,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
            // 朋友圈
            wx.onMenuShareTimeline({
              title: _this.topic.title,
              link: targetUrl,
              imgUrl: _this.data.img,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
          })
        }
      })
    }
  },

  // mounted () {
    // this.initData()
  // },

  // for keep-alive
  activated () {
    if (!looseEqual(this.id, this.$route.params.t_id)) {
      this.initData()
    }
  },
  watch: {
    list (val) {
      if (val && val.length > 0) {
        let obj = val[0]
        this.data.title = obj.content.split('#')[1]
        this.data.content = obj.content.split('#')[2]
        if (obj.img.length > 0) {
          this.data.img = obj.img[0]
        } else {
          this.data.img = config.feedShareImage
        }
        this.wxShare()
      }
    }
  }
}
</script>
