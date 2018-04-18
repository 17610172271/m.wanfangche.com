<template>
  <div class="qa-detail">
    <nav-header :to="{name: 'faq'}" v-show="!answerFormShow">问答</nav-header>
    <scroll class="app-container app-container-top bg-white" v-model="comments" ref="scrollComponent">
      
      <div class="app-wrapper inner" v-if="data">
      <div class="faq-detail">
        <div class="panel">
          <div class=" wrapper">
            <a class="block text-muted text-sm">
              
              <div class="pull-left avatar-circle avatar-xs" :class="{'bg-color': !data.author.avatar}">
                <img :src="data.author.avatar | avatarResize">
              </div>
              <span class="m-l-sm m-r-sm text-lt text-bolder line-height-21">{{data.author.nickname || '游客'}}</span><span class="m-r-sm">{{data.publish_time}}</span>提问
            </a>
          </div>
          <div class="wrapper">
            <div class="block clear">
              <div class="pull-left text-danger text-xxlg m-r-sm">
                <span class="fd-question"></span>
              </div>
              <div class="media-body">
                <div class="faq-title text-bold">{{data.title}}</div>
                <div class="padder-v-10 text-md" v-if="data.content" v-html="data.content">{{data.content}}</div>
                <div class="clear">
                  <div class="pull-left qa-img-container"  v-for="(image, index) in data.img">
                    <img :src="image | ossResize('small')" @click="albumView(image, data.img)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="wrapper text-muted clear p-t-0" v-if="comments">
            <div class="pull-left p-l-md" v-show="data.tags">
              <span class="fd-tag fd-label tag-color pull-left m-t-4"></span>
              <div class="qa-detail-tags">
                <span class="tag-item tag-color text-sm" v-for="tag in data.tags">{{tag}}</span>
              </div>
            </div>
            <div class="pull-right text-muted">
              <span class="m-l text-normal text-sm">{{data.read_num}} <span class="tag-color">浏览</span></span>
            </div>
          </div>

          <div class="hbox text-center b-t b-b">
            <a class="col padder-v-md text-muted b-r text-lt" @click="follow">
              <span v-if="!data.is_follow" class="text-lt"><i class="fd-star  text-bold"></i> 关注问题</span>
              <span v-if="data.is_follow" class="text-lt"><i class="fa fa-check"></i> 已关注</span>
            </a>
            <a class="col padder-v-md link text-bold" @click="showReply"><i class="fd-note text-bold"></i> 添加回答</a>
          </div>
          
        </div>
        
      </div>
      <div class="bg-light-10"></div>
      <div class="faq-answer wrapper bg-white" id="comment">
        <div class="block-title m-t" v-if="comments">
          <span>精选回答 ({{comments.length}})</span>
        </div>
        <div class="clear b-b" v-for="comment in comments">
          <div class="padder-v-md text-lg">
            <div class="pull-left text-info text-xxlg m-r-sm">
              <span class="fd-answer"></span>
            </div>
            <div class="media-body">
              <div class="text-content" v-html="comment.content" @click="reply(comment)">
                {{comment.content}}
              </div>
              <div class="block padder-v-sm" v-if="comment.imgpath && comment.imgpath != '[]'">
                <image-group :list="comment.imgpath" :col="3"></image-group>
              </div>
              <div class="comment-reply m-t-8" :class="{'reply-m-t': !comment.imgpath}" v-if="comment.reply">
                <div class="reply-item text-md" v-for="item in comment.reply"><span class="text-bolder">{{item.author.nickname}}:</span> {{item.content}}</div>
              </div>
            </div>
          </div>
          
          <div class="block clear padder-v">
            <div class="pull-right text-lt">
              <a @click="thumbUp(comment)" class="text-lt btn-width"><i :class="{'res-soon': comment.isDigg==1}" class="fd-thumb-up"></i> {{comment.digg_num}}</a>
            </div>
            <div class="pull-left avatar-circle avatar-xs">
              <img :src="comment.author.avatar | avatarResize">
            </div>
            <span class="tag-color m-l-sm"><span class="text-lt text-bolder">{{comment.author.nickname || '车友'}}</span> {{comment.publish_time}} 回答</span>
          </div>
        </div>
      </div>
      </div>
    </scroll>
    
    <!-- Reply Comment -->
    <popup v-model="replyShow" position="bottom" @on-hide="replyHide">
      <div class="reply-comment-container">
        <div class="comment-reply-container">
          <div class="comment-input-container">
            <textarea class="on-top1 comment-add-input form-control no-style" ref="replyInput" :placeholder="replyTarget" v-model="replyContent"></textarea>
            <i class="fd-emoji" v-show="!emojiShow" @click="emojiShow=!emojiShow"></i>
            <i class="fd-keyboard" v-show="emojiShow" @click="emojiShow=!emojiShow"></i>
            <button class="btn comment-add-reply pull-right" @click="doReply">回复</button>
          </div>
          <emoji v-model="emojiShow" @insert="insertEmoji"></emoji>
        </div>
      </div>
    </popup>

    <popup v-model="answerFormShow" height="100%">
      <answer-form v-model="data" @close="answerFormShow = false" @done="onReplyDone"></answer-form>
    </popup>

  </div>
</template>

<script>
import api from '@/api'
import NavHeader from '../Common/header'
import {ossImageResize, avatarResize} from '@/filters'
import {Popup} from 'vux'
import AnswerForm from './answer'
import Scroll from '@/template/scroll'
import { mapGetters } from 'vuex'
import config from '@/config'
import wx from 'weixin-js-sdk'
import {ImageGroup, Emoji} from '@/components'

export default {
  components: {
    NavHeader,
    Popup,
    AnswerForm,
    ImageGroup,
    Emoji,
    Scroll
  },
  data: () => ({
    isLoading: false,
    isError: false,
    data: null,
    comments: null,
    answerFormShow: false,
    replyContent: '',
    replyShow: false,
    replyTarget: '',
    replyId: null,
    emojiShow: false
  }),
  filters: {
    ossImageResize,
    avatarResize
  },
  computed: mapGetters({
    currentUser: 'currentUser',
    isLoggedin: 'isLoggedin'
  }),
  methods: {
    initData () {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        this.getDetail()
        this.getComments()
      } else {
        window.location.href = 'https://www.wanfangche.com/qa/' + this.$route.query.id + '/detail'
      }
    },
    reply (item) {
      if (this.checkAuth()) {
        this.replyTarget = '回复 @' + item.author.nickname
        this.replyShow = true
        this.replyId = item.id
        let _this = this
        setTimeout(function () {
          _this.$refs.replyInput.focus()
        }, 1000)
      } // 需要登录状态
    },
    replyHide () {
      this.emojiShow = false
    },
    // 提交回复
    doReply () {
      if (this.replyContent) {
        this.isSubmitting = true
        this.axios.post(api.faq.reply, {
          post_id: this.$route.query.id,
          reply_id: this.replyId,
          content: this.replyContent,
          isdrafts: 0
        })
        .then(response => {
          this.replyContent = ''
          this.getComments()
          this.replyShow = false
          this.emojiShow = false
        })
      }
    },
    insertEmoji (val) {
      this.replyContent = this.replyContent + val
    },
    // 问答详情
    getDetail () {
      this.data = null
      if (this.$route.query.id > 0) {
        this.isLoading = true
        this.axios.get(api.faq.detail, {params: {
          id: this.$route.query.id
        }})
        .then(response => {
          this.isLoading = false
          if (response.status === 200 && response.data) {
            this.data = response.data.data
            if (this.data.tags) {
              this.data.tags = this.data.tags.split(',')
            }
            this.initWechat(this.data) // 初始化微信分享
          }
        })
        .catch(error => {
          this.isLoading = false
          this.isError = true
          return Promise.reject(error)
        })
      }
    },
    // 所有回答
    // getComments () {
    //   this.comments = null
    //   if (this.$route.query.id > 0) {
    //     this.axios.get(api.faq.comments, {params: {
    //       id: this.$route.query.id
    //     }})
    //     .then(response => {
    //       if (response.status === 200 && response.data.code === 1) {
    //         this.comments = response.data.data.list
    //       }
    //     })
    //   }
    // },
    getComments () {
      this.comments = null
      return this.$refs.scrollComponent.init({
        api: api.faq.comments,
        params: {
          id: this.$route.query.id
        },
        response: 'data.data.list'
      })
    },
    // 路由变化时判断当前路由actin 是否为detail
    onRouteChange () {
      if (this.$route.query.action && this.$route.query.action === 'detail') {
        this.initData()
      }
    },

    // 相册
    albumView (src, list) {
      window.WeixinJSBridge.invoke('imagePreview', {
        'urls': list,
        'current': src
      })
    },

    // 登录判断
    checkAuth () {
      if (!this.isLoggedin) {
        this.$router.push({name: 'user_login'})
        return false
      } else {
        return true
      }
    },
    // 关注问题
    follow () {
      this.checkAuth()
      this.data.is_follow = !this.data.is_follow
      this.axios.post(api.faq.follow, {
        id: this.data.id
      })
    },

    // 回答问题
    showReply () {
      this.checkAuth()
      this.answerFormShow = true
    },

    // 刷新回答数据
    onReplyDone () {
      this.getComments()
    },

    // 点赞
    thumbUp (item) {
      this.checkAuth()
      this.axios.post(api.faq.digg, {
        id: item.id
      })
      .then(response => {
        if (response.data.code === 1) {
          item.digg_num += 1
          item.isDigg = 1
        }
      })
    },

    // 微信分享
    initWechat (data) {
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
            let content = data.title ? data.title.substring(0, 30) : '问答'
            wx.onMenuShareAppMessage({
              title: content,
              desc: data.author.nickname + config.feedShareAddon,
              link: targetUrl,
              imgUrl: data.img && data.img[0] ? data.img[0] + '_small' : config.feedShareImage,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
            // 朋友圈
            wx.onMenuShareTimeline({
              title: content + ' | ' + data.author.nickname,
              link: targetUrl,
              imgUrl: data.img && data.img[0] ? data.img[0] + '_small' : config.feedShareImage,
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
    }
  },

  mounted () {
    this.initData()
  },

  watch: {
    '$route': 'onRouteChange'
  }
}
</script>
<style scoped>
.faq-content {
  font-size: 16px;
}
.inner {
  min-height: 101%;
}
.btn-width {
  padding: 0px 12px;
}
.panel {
  margin-bottom: 0;
}
</style>
