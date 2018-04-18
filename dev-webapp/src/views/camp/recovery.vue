<template>
  <div class="recovery-body">
    <div class="recovery-head">
      <span @click="goBack()">取消</span>
      <p>纠错</p>
    </div>
    <div class="recovery-list">
      <div v-for="item in list" class="rl-one" :class="{'active': item.value === recind}" @click="relBtn(item.value)">
        <span class="ck"><i class="icon-camp-confirm"></i></span>
        <p>{{item.title}}<span v-if="item.txt !== ''">{{item.txt}}</span></p>
      </div>
    </div>
    <p class="line"></p>
    <div class="recovery-txt">
      <textarea class="comment-input" rows="6" v-model="txt" placeholder="营地名称不对？您知道准确的营地电话？或者其他意见或建议"></textarea>
    </div>
    <p class="line"></p>
    <div class="recovery-add">
      <album-upload v-model="images"></album-upload>
    </div>
    <div class="recovery-btn" :class="{'active': isStyle}">
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
      list: [
        {title: '地图位置错误', value: 0, txt: '坐标不准确'},
        {title: '基本信息错误', value: 1, txt: '名称、类型、费用错误等'},
        {title: '此地已停业', value: 2, txt: ''},
        {title: '存在安全问题', value: 3, txt: '驻车过夜不安全等'},
        {title: '违法信息', value: 4, txt: '淫秽色情、违法有害信息'},
        {title: '图文内容重复', value: 5, txt: ''}
      ],
      recind: 0,
      images: [],
      txt: '',
      isStyle: false,
      isAlert: false,
      dealTxt: ''
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
          }
        }
        this.axios.post(api.camp.putError, {c_id: this.$route.params.id, describe: this.txt, imgs: imgstr.join(','), type: this.recind})
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
      }
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
