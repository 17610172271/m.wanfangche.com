<template>
<div>

<nav-header :to="{name: 'feed'}">评论</nav-header>

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
    
    <div class="app-wrapper bg-light" v-if="data && data.author" ref="refAppWrapper" >

    <!-- Detail -->
    <div class="panel feed-list-item no-radius">
      <div class="media relative" v-if="data.author">
          <a v-if="data.author && data.author.id == currentUser.user_id"  @click="moreMenu=true" class="btn text-xlg  no-hover text-muted pull-right">
            <i class="fd-options"></i>
          </a>
        <!-- <div class="pull-right text-center text-muted">
          <a v-if="data.author && data.author.is_follow === 0" @click="doFollow" class="btn btn-follow"><i class="fa fa-plus"></i> 关注</a>
        </div> -->
        <div class="is-certify" style="top: 36px;" v-if="data.author.isrv == 1">
          <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
        </div>
        <div class="pull-left thumb-sm thumb-circle">
          <router-link :to="{name: 'u_home', params:{u_id: data.author.id}}" class="block">
          <img :src="data.author.avatar | ossResize('avatar')">
          </router-link>
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
      <div class="img-auto m-b text-center"  v-for="(image, index) in data.img">
        <img :src="image | ossResize('middle')" @click="albumView(image, data.img)">
      </div>

      <!-- /Map -->
      <div class="wrapper text-center">
        <a class="btn btn-border text-xlg w-lg btn-rounded text-normal" 
          @click="thumbUp()" 
          :class="{'btn-active': data.is_credit}">
          <i class="fd-thumb-o-up"></i> {{data.credit_num || 0}}
        </a>
      </div>
    </div>
    <!-- /Detail -->

    <!-- Adv -->
    <!-- <router-link :to="{name: 'feed', query: {from: 'feed-detail-adv'}}" class="m-b block img-full">
      <img src="http://img01.wanfangche.com/public/upload/ad/fangchequan_banner.jpg">
    </router-link> -->
    <!-- /Adv -->

    <!-- Comments -->
    <div class="panel wrapper block feed-comment-container" ref="ref-comments">
      <div>
        <div class="bd-left"></div>
        <div class="text-bolder" style="padding-left:7px;">评论 ({{data.reply.length || 0}})</div>
        <!-- <div class="text-muted text-xs">COMMENTS</div> -->
      </div>
      <div class="media relative" v-for="comment in data.reply">
        <div class="is-certify" v-if="comment.author.isrv == 1">
          <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
        </div>
        <div class="pull-left thumb-sm thumb-circle">
          <router-link :to="{name: 'u_home', params:{u_id: comment.author.id}}" class="block">
            <img :src="comment.author.avatar | ossResize('avatar')">
          </router-link>
        </div>
        <div class="media-body comment-content">
<!--           <div class="pull-right text-muted text-sm">
            {{comment.floor_num}} 楼
          </div> -->
          <router-link :to="{name: 'u_home', params:{u_id: comment.author.id}}" class="text-normal">
            <div class="text-bolder inline">{{comment.author.nickname || '车友'}}<gender v-model="comment.author.sex"></gender></div><br>
            <div class="text-muted text-small inline">{{comment.publish_time}}</div>
          </router-link>

          <div class="block text-normal feed-content" @click="replyComment(comment)">
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
      <div class="comment-add-textarea-container">
        <textarea class="comment-add-input form-control no-style" ref="replyInput" rows="4" :placeholder="replyTarget ? '回复:' + replyTarget.author.nickname : '回复'" v-model="replyContent" @click="onFocus"></textarea>
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
        <textarea class="comment-add-input form-control no-style" rows="4" placeholder="添加评论..." v-model="commentContent" @click="onFocus"></textarea>
      </div>
      <div v-show="isFocus">
        <i class="fd-emoji" v-show="!emojiShow" @click="emojiShow=!emojiShow"></i>
        <i class="fd-keyboard" v-show="emojiShow" @click="emojiShow=!emojiShow"></i>
        <button class="btn comment-add-reply pull-right" @click="reply">评论</button>
      </div>
      <emoji v-model="emojiShow" @insert="insertEmoji"></emoji>
    </div>
    <!-- Add Comment -->
    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">
      {{dealTxt}}
    </popup>

    <popup v-model="moreMenu" position="bottom" style="width:96%;left:2%;border-radius:4px;">
      <ul class="feed-detail-menu">
        <li @click="doDelete">删除</li>
        <li @click="moreMenu=false">取消</li>
      </ul>
    </popup>
  </div>
</template>

<script>
import api from '@/api'
import { Popup } from 'vux'
import { Loading, TextView, Gender, Emoji } from '@/components'
import NavHeader from '../Common/Navheader'
import Scroll from '@/template/scroll'
import { mapGetters } from 'vuex'
import config from '@/config'
import parseContent from '@/tools/parse-content'

export default {
  components: {
    Loading,
    NavHeader,
    Scroll,
    TextView,
    Gender,
    Popup,
    Emoji
  },
  data: () => ({
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
    emojiShow: false,
    isAlert: false,
    dealTxt: '',
    replyId: 0
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
      this.getDetail().then(response => {
        this.scrollTo() // 滚动到目标位置
      })
    },

    // 获取内容
    getDetail () {
      this.data = null
      if (this.$route.params.id > 0) {
        this.isLoading = true
        return this.axios.get(api.camp.replyInfo, {params: {
          id: this.$route.params.id
        }})
        .then(response => {
          this.isLoading = false
          if (response.status === 200 && response.data.code === 1) {
            this.data = response.data.data
            if (this.data.imgpath) {
              this.data.img = this.data.imgpath.split(',')
            }
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

      this.data.is_credit = this.data.is_credit ? 0 : 1
      this.axios.post(api.camp.replyCredit, {
        id: this.data.id
      })
      .then(response => {
        if (response.data.code === 1) {
          response.data.data === '点赞已取消' ? this.data.credit_num -= 1 : this.data.credit_num += 1
          if (response.data.data === '点赞已取消') {
            this.isAlert = true
            this.dealTxt = '点赞已取消'
          } else {
            this.isAlert = true
            this.dealTxt = '点赞成功'
          }
        }
      })
    },

    // 评论输入框
    onFocus () {
      if (!this.checkAuth()) return // 需要登录状态
      this.isFocus = true
    },
    onBlur () {
      this.isFocus = false
      this.emojiShow = false
    },
    doDelete () {
      if (this.currentUser.user_id === this.data.author.id) {
        this.axios.post(api.camp.comdel, {id: this.data.id})
        .then(response => {
        })
        this.$router.go(-1)
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
    getCommentInfo () {
      this.axios.get(api.camp.replyInfo, {params: {
        id: this.$route.params.id
      }})
      .then(response => {
        this.isLoading = false
        if (response.status === 200 && response.data.code === 1) {
          this.data.reply = response.data.data.reply
        }
      })
      .catch(error => {
        this.isError = true
        this.isLoading = false
        return Promise.reject(error)
      })
    },
    // 回复
    reply () {
      if (!this.checkAuth()) return // 需要登录状态
      if (!this.commentRequesting && this.commentContent && this.commentContent.length > 0) {
        this.commentRequesting = true
        this.axios.post(api.camp.reply, {
          c_id: this.$route.query.camp_id,
          reply_id: this.data.id,
          content: this.commentContent
        })
        .then(response => {
          this.commentRequesting = false
          if (response.data.code === 1) {
            this.commentContent = ''
            this.getCommentInfo()
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
      this.$refs.replyInput.focus()
    },

    // 回复评论
    doReplyComment () {
      if (!this.replyCommentRequesting && this.replyContent && this.replyContent.length > 0) {
        this.replyCommentRequesting = true
        this.axios.post(api.camp.reply, {
          c_id: this.$route.query.camp_id,
          reply_id: this.replyTarget.id,
          content: this.replyContent
        })
        .then(response => {
          this.replyCommentRequesting = false
          if (response.data.code === 1) {
            this.replyContent = ''
            this.replyTarget = null
            this.getCommentInfo()
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
    '$route': 'onRouteChange',
    isAlert (val) {
      if (val) {
        setTimeout(() => {
          this.isAlert = false
        }, 1000)
      }
    }
  }
}
</script>
<style>
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
