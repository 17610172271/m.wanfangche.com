<template>
  <div class="recovery-body comment-body">
    <div class="recovery-head">
      <span @click="goBack()">取消</span>
      <p>评论</p>
      <i class="sub" @click="recoverySub()">发布</i>
    </div>
    <p class="line" style="height:44px;"></p>
    <div class="recovery-txt comment-add">
      <textarea class="comment-input" rows="6" v-model="txt" placeholder="营地环境怎么样，服务满意吗？"></textarea>
    </div>
    <div class="recovery-add comment-add" style="margin-top:16px;">
      <album-upload v-model="images"></album-upload>
    </div>

    <div class="comment-xing">
      <p>评分：</p><i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= xingInd}" @click="xingBtn(items)"></i>
    </div>

    

    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">
      {{dealTxt}}
    </popup>
  </div>
</template>
<script>
import { AlbumUpload } from '@/components'
import { Popup } from 'vux'
import api from '@/api'
export default {
  components: {
    AlbumUpload,
    Popup
  },
  data () {
    return {
      images: [],
      txt: '',
      isStyle: false,
      isAlert: false,
      dealTxt: '',
      xing: [1, 2, 3, 4, 5],
      xingInd: 0
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    recoverySub () {
      if (this.isStyle) {
        let imgstr = []
        for (var key of this.images) {
          if (key !== undefined) {
            imgstr.push(key)
          }
        }
        this.axios.post(api.camp.reply, {c_id: this.$route.params.id, score: this.xingInd, content: this.txt, imgpath: imgstr.join(',')})
        .then(response => {
          if (response.data.code === 1) {
            this.isAlert = true
            this.dealTxt = '提交成功'
            let _this = this
            setTimeout(function () {
              _this.goBack()
            }, 1000)
          } else {
            this.isAlert = true
            this.dealTxt = '提交失败'
          }
        })
      } else {
        this.isAlert = true
        this.dealTxt = '内容不能为空'
      }
    },
    xingBtn (ind) {
      this.xingInd = ind
    }
  },
  watch: {
    txt (val) {
      val.length > 0 ? this.isStyle = true : this.isStyle = false
    },
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
