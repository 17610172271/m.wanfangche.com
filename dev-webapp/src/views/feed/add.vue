<template>
  <div>
    <location v-if="action === 'location'" @click="setLocation"></location>
    <video-form v-if="action === 'video-form'" @done="addVideoLink"></video-form>
  <div class="form-add" v-show="!action">
    <div class="nav-header">
      <div class="nav-header-left">
        <a @click="goBack" class="nav-header-back text-muted">
          <img src="../../assets/icon_back.png">
          &nbsp;
        </a>
      </div>
      <h1 class="nav-header-title">
        <!-- 房车圈 -->
      </h1>
      <div class="nav-header-right">
        <a class="submit-btn text-default text-lg text-bold" :disabled="onSubmitting" @click="doSubmit" >发布</a>
      </div>
    </div>
    <div class="app-container app-container-top feed-form">
      <div class="app-wrapper">
        <div v-if="!action && formData.video" class="m-b-sm">
          <video-view :src="formData.video" ref="videoComponent" allowfullscreen></video-view>
        </div>
      <div class="wrapper bg-white">
        <div class="form-group">
          <textarea id="txt-addfeed" class="form-control style-none resize-none text-lg" rows="4" placeholder="分享旅行故事..." v-model="formData.content" @keyup.8="txtChange"></textarea>
        </div>
        <div class="block padder-v m-b b-b-light">
            <a class="btn btn-add-icon text-lt" @click="popupShow = !popupShow">
              <i class="fd-emoji"></i>
            </a>
            <router-link class="btn btn-add-icon text-lt m-l" :to="{name: 'feed_add', query: {action: 'video-form'}}">
              <i class="fd-video"></i>
            </router-link>
        </div>
        <div class="form-group table">
          <album-upload v-model="images"></album-upload>
        </div>
        <div class="form-group">
          <router-link :to="{name: 'feed_add', query: {action: 'location'}}" :class="{'text-light': !formData.address}">
            <i class="fd-address"></i> {{formData.address ? formData.address : '所在位置'}}
          </router-link>
        </div>
      </div>
     
      <div class="wrapper bg-white m-t">
        <div class="from-group">
          <div class="">热门话题：</div>
          <div>
            <a @click="insertTag(item)" class="tag tag-default" v-for="item in topics">#{{item}}#</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Modal ref="submitModal" class="text-center">
      <loading-dot-move></loading-dot-move>
    </Modal>
    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false" style="width:80%;left:10%;">
      请输入内容
    </popup>
    <div class="popup-modal" v-if="popupShow">
      <div class="popup-modal-mask" @click="popupShow = !popupShow"></div>
      <div class="popup-container" :class="{'emoji-top': formData.video}">
        <div class="emoji-container">
          <ul class="emoji-list block clear">
            <li v-for="item in emoji" v-html="item" @click="insertEmoji">{{item}}</li>
            <li @click="delEmoji"><img src="http://img01.wanfangche.com/public/upload/201803/08/5aa0fdf3f2026.png?x-oss-process=style/large" alt="" width="32px" height="24px"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import NavHeader from '../Common/Navheader'
import {Modal, LoadingDotMove, VideoView, AlbumUpload} from '@/components'
import api from '@/api'
import Location from './location'
import VideoForm from './video-form'
import {Popup} from 'vux'
import {parseVideo} from '@/filters'
import {topics} from '@/config'

const emoji = ['&#x1f44a;', '&#x1f44c;', '&#x1f44d;', '&#x1f44e;', '&#x1f44f;', '&#x270a;', '&#x270c;', '&#x1f60d;', '&#x1f60f;', '&#x1f61d;', '&#x1f62d;', '&#x1f602;', '&#x1f603;', '&#x1f609;', '&#x1f612;', '&#x1f618;', '&#x1f621;', '&#x1f624;', '&#x1f630;', '&#x1f631;', '&#x1f633;', '&#x1f637;', '&#x2764;']

export default {
  components: {
    AlbumUpload,
    NavHeader,
    Modal,
    LoadingDotMove,
    Location,
    VideoForm,
    Popup,
    VideoView
  },
  data: () => ({
    topics: topics,
    popupShow: false,
    emojiShow: false,
    emoji: emoji,
    onSubmitting: false,
    images: [],
    formData: {
      uid: 0,
      title: undefined,
      content: '',
      imgpath: undefined,
      address: undefined,
      geom: undefined,
      isdrafts: 0,
      accesstoken: '',
      video: ''
    },
    action: null,
    emojiLength: [],
    contentLength: 0,
    isAlert: false
  }),
  computed: {
    videoHeight () {
      return this.$el.clientWidth * 9 / 16 + 2
    }
  },
  methods: {

    // 清空数据
    emptyData () {
      this.images = []
      this.formData = {
        uid: 0,
        title: undefined,
        content: '',
        imgpath: undefined,
        address: undefined,
        geom: undefined,
        isdrafts: 0,
        accesstoken: '',
        video: ''
      }
    },

    // 检查内容是否合法
    validate () {
      return this.formData.content.length > 0 || this.images.length > 0
    },

    // 发布成功后直接跳会房车圈首页
    doSubmit () {
      if (this.formData.content === '') {
        this.isAlert = true
      } else {
        if (!this.onSubmitting && this.validate()) {
          this.onSubmitting = true
          if (this.formData.imgpath === '[]') this.formData.imgpath = ''
          this.axios.post(api.feed.add, this.formData)
          .then(response => {
            if (response.status === 200) {
              this.onSubmitting = false
              this.emptyData()
              this.$router.replace({name: 'feed'})
            }
          })
          .catch(error => {
            this.onSubmitting = false
            return Promise.reject(error)
          })
        } else {
        }
      }
    },

    // 插入话题
    insertTag (item) {
      this.formData.content = this.formData.content + '#' + item + '#'
    },

    // 插入表情符
    insertEmoji (e) {
      let self = this
      let start = this.formData.content.length
      let currentPositon = this.getCursorPosition()
      this.formData.content = this.formData.content.substr(0, currentPositon) + e.target.innerHTML + this.formData.content.substr(currentPositon)
      let end = this.formData.content.length
      let length = end - start
      this.emojiLength.push([currentPositon, length])
      setTimeout(function () {
        self.setCursorPosition(document.getElementById('txt-addfeed'), currentPositon + length)
      }, 0)
    },
    delEmoji () {
      let self = this
      let flag = true
      for (let i = 0; i < this.emojiLength.length; i++) {
        if (this.getCursorPosition() === this.emojiLength[i][0] + this.emojiLength[i][1]) {
          let currentPositon = this.emojiLength[i][0]
          this.formData.content = this.formData.content.substr(0, this.emojiLength[i][0]) + this.formData.content.substr(this.getCursorPosition())
          this.emojiLength.splice(i, 1)
          setTimeout(function () {
            self.setCursorPosition(document.getElementById('txt-addfeed'), currentPositon)
          }, 0)
          flag = false
          break
        }
      }
      if (flag) {
        let currentPositon = this.getCursorPosition()
        this.formData.content = this.formData.content.substr(0, this.getCursorPosition() - 1) + this.formData.content.substr(this.getCursorPosition())
        setTimeout(function () {
          self.setCursorPosition(document.getElementById('txt-addfeed'), currentPositon - 1)
        }, 0)
      }
    },
    txtChange () {
      for (let i = 0; i < this.emojiLength.length; i++) {
        if (this.getCursorPosition() === this.emojiLength[i][0] + this.emojiLength[i][1]) {
          this.emojiLength.splice(i + 1, 1)
          break
        }
      }
    },
    // 判断光标位置
    getCursorPosition () {
      var oTxt1 = document.getElementById('txt-addfeed')
      var cursurPosition = -1
      if (oTxt1.selectionStart) { // 非IE浏览器
        cursurPosition = oTxt1.selectionStart
      } else {
        // IE
        var range
        if (document.selection) {
          range = document.selection.createRange()
          range.moveStart('character', -oTxt1.value.length)
          cursurPosition = range.text.length
        } else {
          return 0
        }
      }
      return cursurPosition
    },
    // 设置光标位置
    setCursorPosition (textDom, pos) {
      // 设置光标位置函数
      if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus()
        textDom.setSelectionRange(pos, pos)
      } else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    },
    // 已选定当前位置
    setLocation (item) {
      this.formData.address = item.city ? item.city + ' · ' + item.title : item.title // 地址
      function baiduToGCJ (lng, lat) {
        var PI = 3.1415926535897932384626
        var v = PI * 3000.0 / 180.0
        var x = lng - 0.0065
        var y = lat - 0.006
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * v)
        var t = Math.atan2(y, x) - 0.000003 * Math.cos(x * v)
        // @retrun [lng, lat]
        return [z * Math.cos(t), z * Math.sin(t)]
      }
      let str = baiduToGCJ(item.point.lng, item.point.lat)
      this.formData.geom = str.join(',') // 坐标
    },

    parseVideo: parseVideo,

    addVideoLink (link) {
      this.formData.video = link
    },

    // 直接返回列表页，不执行后退
    goBack () {
      this.$router.replace({name: 'feed'})
    },

    // 显示地理位置选择页
    onRouteChange () {
      this.action = this.$route.query.action
    }
  },
  watch: {
    images (val) {
      this.formData.imgpath = val.join(',')
    },
    onSubmitting (val) {
      this.$refs.submitModal[val ? 'open' : 'close']()
    },
    '$route': 'onRouteChange',
    isAlert (val) {
      if (val) {
        setTimeout(() => {
          this.isAlert = false
        }, 1000)
      }
    }
  },
  mounted () {
    this.action = this.$route.query.action
  }
}
</script>

<style>
.feed-form textarea,
.feed-form .preview{
  padding: 0 0;
}
.btn-add-icon {
  padding: 5px 5px;

  line-height: 18px;
  font-size: 24px;
}
.popup-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  z-index: 200;
}
.popup-modal-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  background: rgba(0,0,0, 0);
  z-index: 0;
}
.popup-container {
  position: absolute;
  left: 0;
  top: 210px;
  width: 100%;
  z-index: 1;
}
.emoji-container {
  position: relative;
  background: #fff;
}
.emoji-list {
  list-style: none;
  display: table;
  padding: 15px 3.5%;
  height: 200px;
  background-color: #f8f8f8;
}
.emoji-list li {
  display: inline-block;
  width: 16.66%;
  text-align: center;
  padding:0;
  font-size: 30px;
  height: 45px;
  line-height: 45px;
}
</style>
