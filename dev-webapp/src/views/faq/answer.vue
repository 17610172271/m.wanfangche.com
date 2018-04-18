<template>
  <div class="answer-form block bg-white">
    <div v-if="faqData">
      <div class="block">
        <div class="pull-right">
          <a @click="doReply" class="btn">发送</a>
        </div>
        <a @click="close" class="btn text-muted"><i class="fa fa-times"></i></a>
      </div>
      <div class="wrapper">
        <div class="text-xlg text-muted">回答：{{faqData.title}}</div>
        <div class="m-t">
          <textarea class="form-control unstyled no-padder text-normal text-lg" placeholder="添加您的回答..." rows="5" v-model="formData.content"></textarea>
        </div>
      </div>
       <div class="wrapper">
          <album-upload v-model="images" ref="albumUploadComponent"></album-upload>
        </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import {AlbumUpload} from '@/components'
import {substr} from '@/filters'

export default {
  components: {
    AlbumUpload
  },
  filters: {
    substr: substr
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        content: '',
        credit_num: 0,
        id: 0,
        img: [],
        is_follow: false,
        publish_time: '',
        read_num: 0,
        reply_num: 0,
        title: null
      })
    }
  },
  data: () => ({
    isSubmitting: false,
    faqData: {
      title: '12'
    },
    formData: {
      post_id: undefined,
      reply_id: 0,
      content: '',
      imgpath: []
    },
    images: []
  }),
  methods: {
    // 重置数据
    resetData () {
      this.images = []
      this.formData = {
        post_id: undefined,
        reply_id: 0,
        content: '',
        imgpath: []
      }
      this.$refs.albumUploadComponent.clear()
    },
    // 提交回复
    doReply () {
      if (this.isValidate() && !this.isSubmitting) {
        this.isSubmitting = true
        this.axios.post(api.faq.reply, {
          post_id: this.faqData.id,
          reply_id: 0,
          content: this.formData.content,
          isdrafts: 0,
          imgpath: this.formData.imgpath
        })
        .then(response => {
          this.isSubmitting = false
          this.resetData()
          this.done()
          this.close()
        })
        .catch(error => {
          this.isSubmitting = false
          return Promise.reject(error)
        })
      }
    },
    // 校验数据
    isValidate () {
      return this.faqData.id && this.formData.content.length > 0
    },
    // 关闭上层弹窗
    close () {
      this.$emit('close')
    },

    done () {
      this.$emit('done')
    }
  },
  mounted () {
    this.faqData = this.value
  },
  watch: {
    value (val) {
      this.faqData = val
    },
    images (val) {
      this.formData.imgpath = val.join(',')
    }
  }
}
</script>

<style>
.answer-form {
  min-height: 30rem;
  z-index: 200;
}
</style>
