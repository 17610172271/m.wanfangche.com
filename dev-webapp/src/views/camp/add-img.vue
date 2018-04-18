<template>
  <div class="recovery-body">
    <div class="recovery-head">
      <span @click="goBack()">取消</span>
      <p>上传图片</p>
    </div>
    <p class="line" style="height:44px;"></p>
    <div class="recovery-add">
      <album-upload v-model="images"></album-upload>
    </div>
    <div class="recovery-btn recovery-btns" :class="{'active': isStyle}">
      <button @click="recoverySub()">提交</button>
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
      list: []
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    relBtn (ind) {
      this.recind = ind
    },
    recoverySub () {
      if (this.isStyle) {
        let imgstr = []
        for (var key of this.images) {
          if (key !== undefined) {
            imgstr.push(key)
            this.list.push(key)
          }
        }
        this.axios.post(api.camp.reply, {c_id: parseInt(this.$route.params.id), imgpath: imgstr.join(',')})
        .then(response => {
          if (response.data.code === 1) {
            this.isAlert = true
            this.dealTxt = '上传成功'
            let _this = this
            setTimeout(function () {
              _this.goBack()
            }, 1000)
          } else {
            this.isAlert = true
            this.dealTxt = '上传失败'
          }
        })
      }
    }
  },
  watch: {
    images (val) {
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
<style>
  .recovery-btns{
    position: fixed;
    bottom: 30px;
  }
</style>
