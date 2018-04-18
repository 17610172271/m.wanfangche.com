<template>
  <div class="rv-comment-detail">
    <nav-header>评价详情</nav-header>
    <div class="app-body app-container">
      <div class="panel padder-v">
          <div class="panel-body">
            <div class="media">
            <span class="pull-left thumb-sm thumb-circle" v-if="data.avatar !== ''"><img :src="data.avatar | ossResize('avatar')"></span>
              <span class="pull-left thumb-sm thumb-circle bg-color" v-else><img src="../../assets/avatar_default_menu@3x.png"></span>
            <div class="media-body">
              <div class="pull-right text-center text-muted">
                <rater :max="5" v-model="data.score" active-color="#FE7C1E" :font-size="12" :disabled="true"></rater>
              </div>
              <div class="text-muted" v-if="data.nickname !== ''" style="font-family: PingFangSC-Semibold;">{{data.nickname}} </div>
               <div class="text-muted" v-if="data.nickname === ''" style="font-family: PingFangSC-Semibold;">未命名车友</div>
              <small class="block">{{data.created_at}} </small>
              <div class="block m-t-sm  text-normal">{{data.content}}</div>
              <div class="clear">
                <div class="col-xs-4" v-for="(image, index) in data.imgslist" v-if="!isWx">
                  <div class="row thumb-feed imgs-beset" style="max-height:100px;">
                    <img  class="preview-img"  style="height:100%;" :src="image.srcs | ossResize('small')"  @click="$preview.open(index, data.imgslist)">
                  </div>
                </div>

                <div class="col-xs-4" v-for="(image, index) in data.wximglist"  v-if="isWx" style="">
                  <div class="row thumb-feed imgs-beset" style="max-height:100px;">
                    <img class="preview-img"  style="height:100%;" :src="image"  @click="photoAlbum(image, data.wximglist)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="panel">
         <div class="panel-heading padder-v">
           <span class="text-lg">全部提问({{num}})</span>
         </div>
         <div class="panel-body padder-v-lg m-t-lg">
           <div class="media" v-for="item in data.question_list.list" @click="replyBtn(item.id, item.nickname)">
             <span class="pull-left thumb-sm thumb-circle" v-if="item.avatar !== ''"><img :src="item.avatar | ossResize('avatar')"></span>
              <span class="pull-left thumb-sm thumb-circle bg-color" v-else><img src="../../assets/avatar_default_menu@3x.png"></span>
             <div class="media-body">
               <div class="text-muted">{{item.nickname}}</div>
               <small class="block">{{item.created_at}} </small>
               <div class="block m-t-sm  text-normal" v-html="item.content">{{item.content}}</div>
               <div class="clear padder-v b-b"></div>
             </div>
           </div>
         </div>
       </div>
    </div>
    <div class="footer-bar bg-white fixed-bottom">
      <div class="col-xs-12 qa-input-group" style="padding:5px;">
        <div class="input-group" style="">
          <span class="input-group-addon" style="border:none;"><i class="glyphicon glyphicon-pencil" style="color:#8D9DB0;"></i></span>
          <div class="input-group-form">
          <form action="" @submit.prevent="onsubmit" v-if="!isreply">
            <input type="text" name="" class="form-controls" v-model="txt" style="color:#8D9DB0;" placeholder="向ta提问">
          </form> 
          <form action="" @submit.prevent="onreply" v-if="isreply">
            <input type="text" name="" class="form-controls" v-model="replytxt" :placeholder="replyhint"  @blur="changeCount()">
          </form>
          </div>
        </div>
        </div>
      </div>
     <popup v-model="replys" class="message" style="height: 56px; bottom: 60%;" :show-mask="false">
       <h2>{{errtxt}}</h2>
     </popup>
     <popup v-model="reply" class="message" style="height: 56px;" :show-mask="false">
       <h2>提问内容不能为空</h2>
     </popup>
  </div>
</template>
<script>
import { Rater, Swiper, Popup } from 'vux'
import NavHeader from '../Common/Navheader'
import api from '@/api'
import formatTime from '@/filters/format-time'
import { ossimage } from '@/config'

export default {
  components: {
    NavHeader,
    Popup,
    Rater,
    Swiper
  },
  filters: {
    formatTime
  },
  data () {
    return {
      comment: {},
      replys: false,
      reply: false,
      errtxt: '',
      show_album: false,
      data: {
        imglist: [],
        question_list: [],
        wximglist: []
      },
      num: 0,
      txt: '',
      replytxt: '',
      comment_id: this.$route.params.id || this.$route.query.id,
      isreply: false,
      replyhint: '',
      replyid: 0,
      replyname: '',
      user: null,
      isWx: null
    }
  },
  methods: {
    photoAlbum (src, list) {
      if (this.isWx) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': list.map(src => {
            return src + '_ytsy'
          }),
          'current': src + '_ytsy'
        })
      }
    },
    replyShow () {
      this.replys ? this.replys = false : this.replys = true
      this.reply ? this.reply = false : this.reply = true
    },
    onsubmit () {
      if (!this.txt) {
        this.reply = true
      } else {
        this.axios.post(api.comment.detail, {comment_id: parseInt(this.comment_id), content: this.txt})
        .then(response => {
          if (response.data.code === 200) {
            this.replys = true
            this.errtxt = '提问成功'
            let time = formatTime(new Date())
            this.data.question_list.list.push({
              'id': response.data.data,
              'avatar': this.user.avatar,
              'content': this.txt,
              'created_at': time,
              'level': '1',
              'nickname': this.user.nickname
            })
            this.txt = ''
          } else {
            this.replys = true
            this.errtxt = '提问失败'
          }
        })
      }
    },
    showAlbum () {
      this.show_album = true
    },
    changeCount () {
      this.isreply = false
    },
    imginfo (imgsrc) {
      var img = new Image()
      var srclist = {
        src: '',
        w: '',
        h: ''
      }
      img.src = imgsrc
      srclist.srcs = img.src + ossimage.small
      srclist.src = img.src + ossimage.large
      img.onload = function () {
        srclist.w = img.width
        srclist.h = img.height
      }
      return srclist
    },
    onreply () {
      if (!this.replytxt) {
        this.replys = true
        this.errtxt = '回复内容不能为空'
      } else {
        this.replytxt = '回复<span class="color-blue">@' + this.replyname + '</span>' + this.replytxt
        this.axios.post(api.user.add, {comment_id: parseInt(this.comment_id), content: this.replytxt, parent_id: parseInt(this.replyid)})
        .then(response => {
          this.replys = true
          if (response.data.code === 200) {
            let time = formatTime(new Date())
            this.data.question_list.list.push({
              'id': response.data.data,
              'avatar': this.user.avatar,
              'content': this.replytxt,
              'created_at': time,
              'level': '1',
              'nickname': this.user.nickname
            })
            this.errtxt = '回复成功'
          } else {
            this.errtxt = '回复失败'
          }
          this.replytxt = ''
        })
      }
    },
    replyBtn (ind, name) {
      this.isreply = true
      this.replyhint = '回复:' + name
      this.replyid = ind
      this.replyname = name
    },
    getUser () {
      this.axios.get(api.user.list)
      .then(response => {
        if (response.data.code === 200) {
          this.user = response.data.data
        }
      })
    },
    isWxs () {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.indexOf('micromessenger') > 0) {
        this.isWx = true
      } else {
        this.isWx = false
      }
    }
  },
  created () {
    this.isWxs()
    this.axios.get(api.rv.find, {params: {id: parseInt(this.$route.params.id)}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          this.data.avatar = response.data.data.avatar
          if (response.data.data.images) {
            this.data.imglist = JSON.parse(response.data.data.images)
            this.data.imgslist = []
            this.data.wximglist = this.data.imglist
            for (var key in this.data.imglist) {
              this.data.imgslist.push(this.imginfo(this.data.imglist[key]))
            }
          }
          this.data.score = parseInt(response.data.data.score)
          this.num = response.data.data.question_list.count || 0
        }
      })
    this.getUser()
  },
  watch: {
    replys (val) {
      if (val) {
        setTimeout(() => {
          this.replys = false
        }, 1000)
      }
    },
    reply (val) {
      if (val) {
        setTimeout(() => {
          this.reply = false
        }, 1000)
      }
    }
  }
}
</script>
<style scoped>
  .rv-comment-detail .app-container {
    padding-top: 44px;
    padding-bottom: 26px;
  }
</style>
