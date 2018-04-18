<template>
<div class="feed-detail">
<nav-header :to="{name: 'feed'}">房车圈</nav-header>
<scroll class="app-container app-container-top" v-model="comments" ref="scrollComponent" @click="onBlur"> 
    
    <!-- Error -->
    <div class="middle text-muted text-center"  v-if="!data">
      <loading v-if="isLoading"></loading>
      <div v-if="isError && !isLoading">
        <p class="text-xxlg"><i class="fa  fa-frown-o"></i></p>
        <p>服务器连接失败</p>
      </div>
      <div v-if="!isError && !isLoading">
        <p class="text-xxlg"><i class="fa  fa-frown-o"></i></p>
        <p>内容已被删除或不存在</p>
      </div>
    </div>
    <!-- /Error -->
    
    <div class="app-wrapper bg-light" v-if="data && data.author" ref="refAppWrapper">
    
      <!-- Video -->
      <div class="text-center" v-if="data.video">
        <video-view :src="data.video" allowfullscreen></video-view>
      </div>
      <!-- /Video -->

    <!-- Detail -->
    <div class="panel feed-list-item no-radius">
      <div class="media relative" v-if="data.author">
        <div class="pull-right text-center text-muted">
          <a v-if="data.author && data.author.id == currentUser.user_id"  @click="moreMenu=true" class="btn text-xlg  no-hover text-muted">
            <i class="fd-options"></i>
          </a>
          <a v-if="data.author && data.author.is_follow === 0" @click="doFollow" class="btn btn-follow">关注</a>
        </div>
        <div class="pull-left thumb-sm thumb-circle">
          <router-link :to="{name: 'u_home', params:{u_id: data.author.id}}" class="block">
            <img :src="data.author.avatar | ossResize('avatar')">
          </router-link>
        </div>
        <div class="is-certify is-certify1" v-if="data.author.isrv == 1">
          <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
        </div>
        <div class="media-body">
          <router-link :to="{name: 'u_home', params:{u_id: data.author.id}}" class="text-normal block">
          <div class="text-bolder feed-detail-name">{{data.author.nickname || '车友'}}<gender v-model="data.author.sex"></gender></div>
          <div class="text-muted text-small">{{data.publish_time}}</div>
          </router-link>
        </div>
      </div>
      <div class="block text-normal">
 <!--        <div class="text-muted text-sm">
          <span>阅读：{{data.read_num}}</span>
          <span class="m-l">评论：{{data.reply_num}}</span>
        </div> -->
        <div v-if="data.content" v-html="parseContent(data.content)" class="feed-content" @click="onDetailClick">{{data.content}}</div>
      </div>

      <!-- 营地 -->
      <router-link :to="{name: 'camp_detail', params: {id: data.camp_detail.uuid}, query: {type: data.camp_detail.type}}" class="feed-share" v-if="data.type != 0">
        <div class="pull-left share-info-img m-r"><img :src="data.camp_detail.imgpath | ossResize('small')" width="100%"></div>
          <div class="camp-list-item">
           <div class="text-md text-bolder share-info-name">{{data.camp_detail.name}}</div>
           <div class="text-muted m-b-3 share-info-others">
            <p class="camp-xing">
              <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= data.camp_detail.score}"></i>
            </p>
            <span v-if="data.camp_detail.price === -2">不详</span>
            <span v-else-if="data.camp_detail.price === -1">免费</span>
            <span v-else>{{data.camp_detail.price}}<span v-if="data.camp_detail.price !== -1 && data.camp_detail.price !== -2"><span v-if="data.camp_detail.type === 3">元/人</span><span v-else>元/起</span></span></span>
          </div>
          <div>
            <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': data.camp_detail.type==1, 'color-park2': data.camp_detail.type==0, 'color-scenic2': data.camp_detail.type==2, 'color-food2': data.camp_detail.type==3, 'color-fix2': data.camp_detail.type==4, 'color-refuel2': data.camp_detail.type==5}"><span :class="{'icon-camp-camp': data.camp_detail.type==1, 'icon-camp-park': data.camp_detail.type==0, 'icon-camp-scenic': data.camp_detail.type==2, 'icon-camp-food': data.camp_detail.type==3, 'icon-camp-service': data.camp_detail.type==4, 'icon-camp-station': data.camp_detail.type==5}"></span></div>
            <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': data.camp_detail.type==1, 'color-park1': data.camp_detail.type==0, 'color-scenic1': data.camp_detail.type==2, 'color-food1': data.camp_detail.type==3, 'color-fix1': data.camp_detail.type==4, 'color-refuel1': data.camp_detail.type==5}">
              {{data.camp_detail.type | camptype}}
            </div>
          </div>
        </div>
      </router-link>
      
      <div class="img-auto m-b text-center"  v-for="(image, index) in data.img">
        <img :src="image | ossResize('middle')" @click="albumView(image, data.img)">
      </div>

      <!-- Map -->
      <div v-if="data.lat && data.lon">
        <div class="m-b">
          <a v-if="data.postion" class="block text-sm" :href="'http://map.wanfangche.com/?lat='+data.lat+'&lng='+data.lon">
            <i class="fa fa-map-marker m-r"></i>{{data.postion}}
          </a>
        </div>
      </div>
      <!-- /Map -->
      <div class="wrapper text-center">
        <a class="btn btn-border text-xlg detail-btn-thumb btn-rounded text-muted" 
          @click="thumbUp()" 
          :class="{'btn-active': data.is_follow}">
          <i class="fd-thumb-o-up thumb-icon thumb-btn-icon"></i> {{data.credit_num}}
        </a>
      </div>
      <div class="detail-scan-thumb">
        <div class="detail-scan text-sm pull-left">{{data.read_num}}次浏览</div>
        <router-link :to="{name: 'feed_thumb', params: {id: $route.params.id}}" class="clear padder-v-lg pull-right" :class="{'more-thumb': data.credit_num>5}">
          <div v-for="item in thumbUpList" v-if="item && item.avatar" class="avatar thumb-avatar avatar-circle pull-left">
            <img :src="item.avatar | ossResize('middle')">
          </div>
          <div class="feed-detail-expand pull-left clear" v-show="data.credit_num>4"><i class="fd-chevron-right"></i></div>
        </router-link>
      </div>
    </div>
    <!-- /Detail -->

    <!-- Adv -->
    <a href="https://m.wanfangche.com/download" class="m-b block img-full">
      <img src="https://img01.wanfangche.com/public/upload/201804/11/5acde251ed54a.jpg?x-oss-process=style/large">
    </a>
    <!-- /Adv -->

    <!-- Comments -->
    <div class="panel wrapper block feed-comment-container" ref="ref-comments">
      <div>
        <div class="bd-left"></div>
        <div class="text-bolder text-lg m-t" style="padding-left:7px;">评论 ({{data.reply_num}})</div>
        <!-- <div class="text-muted text-xs">COMMENTS</div> -->
      </div>
      <div class="media relative" v-for="comment in comments">
        <div class="is-certify" v-if="comment.author.isrv == 1">
          <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
        </div>
        <div class="pull-left thumb-sm thumb-circle">
          <router-link :to="{name: 'u_home', params:{u_id: comment.author.id}}" class="block">
            <img :src="comment.author.avatar | ossResize('avatar')">
          </router-link>
        </div>
        <div class="media-body comment-content">
          <div class="pull-right text-muted text-md thumb-num">
            <a class="text-muted btn min-width-52" @click="thumbUpComment(comment)">
              <i class="fd-thumb-up" :class="{'res-soon': comment.is_credit == 1}"></i> <span :class="{'res-soon': comment.is_credit == 1}" v-show="comment.credit_num>0">{{comment.credit_num}}</span>
            </a>
          </div>
<!--           <div class="pull-right text-muted text-sm">
            {{comment.floor_num}} 楼
          </div> -->
          <router-link :to="{name: 'u_home', params:{u_id: comment.author.id}}" class="text-normal">
            <div class="text-bolder inline text-lt">{{comment.author.nickname || '车友'}}<gender v-model="comment.author.sex"></gender></div><br>
            <div class="text-muted text-small inline">{{comment.publish_time}}</div>
          </router-link>

          <div class="block text-normal feed-content1" @click="replyComment(comment)">
            <text-view v-model="comment.content" type="plain" class="text-md">{{comment.content}}</text-view>
          </div>
          
          <div class="clear bg-light padder-xs padder-v-xs" v-if="comment.reply">
            <div v-for="reply in comment.reply" class="padder-v-xs">
              <span class="text-bolder">{{reply.author.nickname}}:</span> {{reply.content}}
            </div>
          </div>
          
        </div>
     </div>
    </div>
    <!-- /Comments -->
    </div>
</scroll>

    <!-- Reply Comment -->
    <div class="comment-modal" v-show="isFocus" @click="onBlur"></div>
    <div class="comment-add-container" v-if="data && data.author && !moreMenu" v-show="replyTarget" :class="{'on-typing': isFocus, 'big-reply-container': emojiShow}">
      <i class="fd-comment comment-items" v-show="!isFocus" @click="jump"></i>
      <!-- <div class="pull-left text-muted comment-add-icon"><i class="icon-edit"></i></div> -->
      <div class="comment-add-textarea-container" ref="iptpannel">
        <textarea class="on-top1 comment-add-input form-control no-style" ref="replyInput" rows="4" :placeholder="replyTarget ? '回复:' + replyTarget.author.nickname : '回复'" v-model="replyContent" @click="onFocus"></textarea>
      </div>
      <div v-show="isFocus">
        <i class="fd-emoji" v-show="!emojiShow" @click="emojiShow=!emojiShow"></i>
        <i class="fd-keyboard" v-show="emojiShow" @click="emojiShow=!emojiShow"></i>
        <button class="btn comment-add-reply pull-right" @click="doReplyComment">回复</button>
      </div>
      <emoji v-model="emojiShow" @insert="insertEmoji1"></emoji>
    </div>
    <!-- Reply Comment -->

    <!-- Add Comment -->
    <div class="comment-add-container" v-if="data && data.author && !moreMenu" v-show="!replyTarget" :class="{'on-typing': isFocus, 'big-reply-container': emojiShow}">
      <i class="fd-comment comment-items" v-show="!isFocus" @click="jump"></i>
      <!-- <div class="pull-left text-muted comment-add-icon"><i class="icon-edit"></i></div> -->
      <div class="comment-add-textarea-container">
        <textarea class="on-top1 comment-add-input form-control no-style" rows="4" placeholder="添加评论..." v-model="commentContent" @click="onFocus"></textarea>
      </div>
      <div v-show="isFocus">
        <i class="fd-emoji" v-show="!emojiShow" @click="emojiShow=!emojiShow"></i>
        <i class="fd-keyboard" v-show="emojiShow" @click="emojiShow=!emojiShow"></i>
        <button class="btn comment-add-reply pull-right" @click="reply">评论</button>
      </div>
      <emoji v-model="emojiShow" @insert="insertEmoji"></emoji>
    </div>
    <popup v-model="moreMenu" position="bottom" style="width:96%;left:2%;border-radius:4px;">
      <ul class="feed-detail-menu">
        <li @click="doDelete">删除</li>
        <li @click="moreMenu=false">取消</li>
      </ul>
    </popup>
    <!-- Add Comment -->
  </div>
</template>

<script>
import api from '@/api'
import { Popup } from 'vux'
import { Loading, VideoView, TextView, Gender, Emoji } from '@/components'
import NavHeader from '../Common/header'
import Scroll from '@/template/scroll'
import { mapGetters } from 'vuex'
import wx from 'weixin-js-sdk'
import config from '@/config'
import parseContent from '@/tools/parse-content'
import {removeHtmlTab} from '@/filters'

export default {
  components: {
    Loading,
    NavHeader,
    Scroll,
    VideoView,
    TextView,
    Gender,
    Popup,
    Emoji
  },
  data: () => ({
    xing: [1, 2, 3, 4, 5],
    replyTarget: null,
    replyContent: null,
    replyCommentRequesting: false,
    isLoading: false,
    isError: false,
    data: null,
    comments: null,
    commentContent: '',
    commentRequesting: false,
    isFocus: false,
    thumbUpList: [],
    moreMenu: false,
    emojiShow: false
  }),
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      isLoggedin: 'isLoggedin'
    }),
    videoHeight () {
      return parseInt(this.$el.clientWidth * 9 / 16 + 2)
    }
  },
  methods: {
    initData () {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log(2)
      } else {
        window.location.href = 'https://www.wanfangche.com/' + this.$route.params.id + '/detail'
      }
      this.getDetail().then(response => {
        this.scrollTo() // 滚动到目标位置
        this.initWechat(this.data) // 初始化微信分享
      })
      this.getThumbupList()
      this.getComments()
    },

    // 获取内容
    getDetail () {
      this.data = null
      if (this.$route.params.id > 0) {
        this.isLoading = true
        return this.axios.get(api.feed.detail, {params: {
          id: this.$route.params.id
        }})
        .then(response => {
          this.isLoading = false
          if (response.status === 200 && response.data.code === 1) {
            this.data = response.data.data
          } else {
            this.data = null
          }
        })
        .catch(error => {
          this.isError = true
          this.isLoading = false
          return Promise.reject(error)
        })
      }
    },

    // 内容格式转换
    parseContent: parseContent,

    // 评论
    getComments () {
      return this.$refs.scrollComponent.init({
        api: api.feed.comments,
        params: {
          id: this.$route.params.id
        },
        response: 'data.data.list'
      })
    },

    // 点赞列表
    getThumbupList () {
      this.axios.get(api.feed.likeList, {params: {
        id: this.$route.params.id
      }})
      .then(response => {
        if (response.data.data) {
          this.thumbUpList = response.data.data
          if (this.thumbUpList && this.thumbUpList.length > 15) {
            this.thumbUpList = this.thumbUpList.slice(0, 15)
          }
        }
      })
    },

    // 点击标签
    onDetailClick (e) {
      let tag = e.target.getAttribute('tag')
      if (tag) {
        this.$router.push({name: 'feed_topic_redirect', params: {key: tag}})
      }
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

    // 点赞
    thumbUp () {
      if (!this.checkAuth()) return // 需要登录状态

      this.data.is_follow = this.data.is_follow ? 0 : 1
      this.axios.post(api.feed.like, {
        id: this.data.id
      })
      .then(response => {
        if (response.status === 200 && response.data.code === 1) {
          response.data.data === '点赞已取消' ? this.data.credit_num -= 1 : this.data.credit_num += 1
          this.getThumbupList()
        }
      })
    },

    // 点赞评论
    thumbUpComment (item) {
      if (item.is_credit === 1) {
        item.is_credit = 0
      } else if (item.is_credit === 0) {
        item.is_credit = 1
      }
      if (!this.checkAuth()) {
        return // 需要登录状态
      } else {
        this.axios.post(api.feed.commentLike, {
          id: item.id
        })
        .then(response => {
          if (response.data.data === '点赞成功') {
            item.credit_num += 1
          } else if (response.data.data === '点赞已取消') {
            item.credit_num -= 1
          }
        })
      }
    },

    // 评论输入框
    onFocus () {
      if (!this.checkAuth()) return // 需要登录状态
      this.isFocus = true
    },
    onBlur () {
      this.isFocus = false
      this.replyTarget = false
      this.emojiShow = false
    },
    doDelete () {
      if (this.currentUser.user_id === this.data.author.id) {
        this.axios.post(api.feed.delete, {id: this.data.id})
        .then(response => {
        })
        this.$router.replace({name: 'feed'})
      } else {}
    },

    // 加关注
    doFollow () {
      if (!this.checkAuth()) return // 需要登录状态

      this.data.is_follow = (this.data.is_follow !== 1) ? 1 : 0
      this.axios.post(api.feed.follow, {
        uid: this.currentUser.user_id,
        id: this.data.author.id,
        accesstoken: ''
      })
      .then(response => {
        this.data.author.is_follow = 1
      })
    },
    jump () {
      const cateItem = document.querySelectorAll('.feed-comment-container')
      let total = cateItem[0].offsetTop - 100
      let distance = document.querySelectorAll('.app-container')[0].scrollTop + 120 // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
      let step = total / 30
      if (total > distance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 30
        smoothUp()
      }
      function smoothDown () {
        if (distance < total) {
          distance += step
          document.querySelectorAll('.app-container')[0].scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.body.scrollTop = total
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          document.querySelectorAll('.app-container')[0].scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.body.scrollTop = total
        }
      }
    },
    // 回复
    reply () {
      if (!this.checkAuth()) return // 需要登录状态
      if (!this.commentRequesting && this.commentContent && this.commentContent.length > 0) {
        this.commentRequesting = true
        this.axios.post(api.feed.reply, {
          post_id: this.data.id,
          reply_id: 0,
          content: this.commentContent
        })
        .then(response => {
          this.commentRequesting = false
          if (response.data.code === 1) {
            this.commentContent = ''
            this.getComments()
          }
        })
        .catch(error => {
          this.commentRequesting = false
          return Promise.reject(error)
        })
      }
      this.isFocus = false
      this.emojiShow = false
    },
    insertEmoji (val) {
      this.commentContent = this.commentContent + val
    },
    insertEmoji1 (val) {
      this.replyContent = this.replyContent + val
    },
    // 回复评论
    replyComment (comment) {
      if (!this.checkAuth()) return // 需要登录状态
      this.replyTarget = comment
      this.isFocus = true
      let self = this
      setTimeout(function () {
        self.$refs.replyInput.focus()
      }, 200)
    },
    // 回复评论
    doReplyComment () {
      if (!this.replyCommentRequesting && this.replyContent && this.replyContent.length > 0) {
        this.replyCommentRequesting = true
        this.axios.post(api.feed.reply, {
          post_id: this.data.id,
          reply_id: this.replyTarget.id,
          content: this.replyContent
        })
        .then(response => {
          this.replyCommentRequesting = false
          if (response.data.code === 1) {
            this.replyContent = ''
            this.replyTarget = null
            this.getComments()
          }
        })
        .catch(error => {
          this.replyCommentRequesting = false
          return Promise.reject(error)
        })
      }
      this.isFocus = false
      this.emojiShow = false
    },

    // 通过路由跳转触发详情
    onRouteChange () {
      console.log(1)
      this.initData()
    },
    // 微信相册
    albumView (src, list) {
      if (window.WeixinJSBridge) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': list.map(src => {
            return src + config.ossimage.xlarge
          }),
          'current': src + config.ossimage.xlarge
        })
      }
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
            let content = removeHtmlTab(data.content).substring(0, 30)
            wx.onMenuShareAppMessage({
              title: content,
              desc: data.author.nickname + config.feedShareAddon,
              link: targetUrl,
              imgUrl: (data.video && data.video.split('wfc_poster=').length > 1) ? data.video.split('wfc_poster=')[1] : (data.img.length > 0 ? data.img[0] + '_small' : config.feedShareImage),
              // ? data.img[0] ? data.img[0] + '_small' : config.feedShareImage,
              success: function (res) {
              },
              cancel: function (res) {
              }
            })
            // 朋友圈
            wx.onMenuShareTimeline({
              title: content + ' | ' + data.author.nickname,
              link: targetUrl,
              imgUrl: (data.video && data.video.split('wfc_poster=').length > 1) ? data.video.split('wfc_poster=')[1] : (data.img.length > 0 ? data.img[0] + '_small' : config.feedShareImage),
              // data.img[0] ? data.img[0] + '_small' : config.feedShareImage
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

    scrollTo () {
      if (this.$route.query.scrollTo) {
        let target = this.$refs['ref-' + this.$route.query.scrollTo]
        target ? this.$refs.scrollComponent.$el.scrollTop = target.offsetTop : false
      }
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
.reply-comment-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: none;
  z-index: 200;
}
.reply-comment-container-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0, .0);
}
</style>
