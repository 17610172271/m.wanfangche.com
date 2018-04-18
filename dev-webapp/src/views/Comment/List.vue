<template>
  <div>
    <div class="media" v-for="comment in list" :key="comment.id">
      <span class="pull-left thumb-sm thumb-circle" v-if="comment.avatar !== ''"><img :src="comment.avatar | ossResize('avatar')"></span>
      <span class="pull-left thumb-sm thumb-circle bg-color" v-else><img src="../../assets/avatar_default_menu@3x.png"></span>
      <div class="media-body">
        <a @click="goComment(comment.id)">
        <div class="pull-right text-center text-muted" style="padding:0;">
          <rater :max="5" v-model="comment.score" active-color="#FE7C1E" :font-size="12"></rater>
        </div>
        <div class="text-muted" v-if="comment.nickname !== ''" style="font-family: PingFangSC-Semibold;">{{comment.nickname}}</div>
        <div class="text-muted" v-if="comment.nickname === ''" style="font-family: PingFangSC-Semibold;">未命名车友 </div>
        <small class="block">{{comment.created_at}} </small>
        <div class="block m-t-sm  text-normal">{{comment.content}}</div>
        </a>
         <div class="clear padder-v">
          <div class="col-xs-4" v-for="(image, index) in comment.imglist"  v-if="!isWx">

            <div class="row thumb-feed imgs-beset" style="max-height:100px;">
              <img class="preview-img" style="height:auto;" :src="image.srcs | ossResize('small')"   @click="$preview.open(index, comment.imglist)">
            </div>

          </div>

          <div class="col-xs-4" v-for="(image, index) in comment.wximglist" v-if="isWx">

            <div class="row thumb-feed imgs-beset" style="max-height:100px;">
              <img class="preview-img" style="height:auto;" :src="image"   @click="photoAlbum(image, comment.wximglist)">
            </div>
          </div>

                 </div>
        <div class="clear padder-v text-right">
          <a class="btn btn-sm btn-qa" ><router-link :to="{name: 'comment', params: {id: comment.id}}"><i class="glyphicon glyphicon-question-sign" style="top:1px;"></i> 提问</router-link></a>
        </div>

      </div>
      <p class="b-b"></p>
    </div>
    <popup v-model="reply" class="message" style="height: 56px;" :show-mask="false">
      <h2>信息填写不完整</h2>
    </popup>
  </div>
</template>
<script>
import { Rater, Popup } from 'vux'
import { isJson } from '@/tools/util'
import { ossimage } from '@/config'

export default {
  components: {
    Rater,
    Popup,
    isJson
  },
  props: {
    list: {}
  },
  data () {
    return {
      reply: false,
      ind: 0,
      images: [],
      isWx: null,
      ossimage: ossimage
    }
  },
  methods: {
    photoAlbum (src, list) {
      if (this.isWx && src) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': list.map(src => {
            return src + '_ytsy'
          }),
          'current': src + '_ytsy'
        })
      }
    },
    replyShow () {
      this.reply = true
    },
    goComment (ind) {
      this.$router.push({
        name: 'comment',
        params: {
          id: ind
        }
      })
    },
    imginfo (imgsrc, key) {
      var img = new Image()
      var srclist = {
        src: '',
        w: '',
        h: ''
      }
      img.src = imgsrc
      srclist.srcs = img.src
      srclist.src = img.src + ossimage.large
      img.onload = function () {
        srclist.w = img.width
        srclist.h = img.height
      }
      return srclist
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
  },
  watch: {
    list (val) {
      for (var key in val) {
        val[key].score = parseInt(val[key].score)
        if (isJson(val[key].images)) {
          val[key].images = JSON.parse(val[key].images)
          val[key].imglist = []
          val[key].wximglist = val[key].images
          for (var ind in val[key].images) {
            val[key].imglist.push(this.imginfo(val[key].images[ind], ind))
          }
        } else {
          val[key].images = []
        }
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
<style>
  .thumb-feed{
    padding: 2px 2px;
  }
  .thumb-feed img{
    width: 100%;
  }
</style>
