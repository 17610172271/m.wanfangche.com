<template>
  <div>
    <div class="nav-header">
      <div class="nav-header-left">
        <a :to="{name: 'faq'}" class="nav-header-back text-lg" @click="goBack">
          <i class="fa fa-times"></i>
        </a>
      </div>
      <h1 class="nav-header-title">
        提问
      </h1>
      <div class="nav-header-right">
        <a class="nav-header-more text-normal text-lg" @click="doSubmit">发布</a>
      </div>
    </div>
    <div class="app-body feed-form bg-white">
      <div class="panel wrapper bg-white">
        <div>
          <input class="form-control style-none faq-title-input" placeholder="这里输入问题" v-model="formData.title">
        </div>
        <div class="form-group padder-v-10">
          <textarea class="form-control style-none resize-none" rows="6" placeholder="描述的越详细越容易获得有效答案" v-model="formData.content"></textarea>
        </div>
        <div class="form-group table">
          <album-upload v-model="images"></album-upload>
        </div>
      </div>
      
      <div class="wrapper bg-white m-t faq-tag">
        <div class="text-muted">添加标签：</div>
        <div>
          <div class="tag-container"  v-for="(tag, index) in currentTags">
            <a class="tag tag-default" @click="removeTag(index)">{{tag}}</a>
          </div>
          <div class="tag-container tag-add-container">
            <div class="input-group">
              <input type="text" class="form-control w-sm" v-model="tagInput" maxlength="10">
              <span class="input-group-btn">
                <button type="button" class="btn btn-default" @click="addTag"><i class="fa fa-plus"></i></button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper bg-white m-t">
        <div class="text-muted">推荐标签：</div>
        <div>
          <a @click="insertTag(tag.title)" class="tag tag-default" v-for="tag in tags">{{tag.title}}</a>
        </div>
      </div>
    </div>
    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false" style="width:80%;left:10%;">
      {{tipTxt}}
    </popup>
  </div>
</template>

<script>
import NavHeader from '../Common/Navheader'
import {AlbumUpload} from '@/components'
import { Popup } from 'vux'
import api from '@/api'

export default {
  components: {
    AlbumUpload,
    NavHeader,
    Popup
  },
  data: () => ({
    tipTxt: '请输入问题描述和标题',
    images: null,
    formData: {
      title: null,
      content: '',
      isdrafts: 0,
      tags: undefined,
      imgpath: undefined
    },
    tags: null,
    tagInput: null,
    currentTags: [],
    isSubmiting: false,
    tagList: [
      {title: '房车'},
      {title: '旅行'},
      {title: '露营地'},
      {title: '停车'},
      {title: '住宿'},
      {title: '北京'},
      {title: '新西兰'},
      {title: '澳大利亚'},
      {title: '美国'},
      {title: '日本'},
      {title: '维修'},
      {title: '租车'},
      {title: '保险'},
      {title: '购车'}
    ],
    isAlert: false
  }),
  methods: {
    initData () {
      this.getTags()
    },

    resetData () {
      this.images = []
      this.formData = {
        title: null,
        content: '',
        isdrafts: 0,
        tags: undefined,
        imgpath: undefined
      }
    },

    doSubmit () {
      if (this.validate() && !this.isSubmiting) {
        this.isSubmiting = true
        this.formData.tags = this.currentTags.join(',')
        this.axios.post(api.faq.add, this.formData)
        .then(response => {
          this.isSubmiting = false
          if (response.data.code === 1) {
            this.resetData()
            this.$router.replace({name: 'faq', query: {id: response.data.data.post_id, action: 'detail'}})
          }
        })
        .catch(error => {
          this.isSubmiting = false
          this.tipTxt = '服务器异常'
          this.isAlert = true
          return Promise.reject(error)
        })
      }
    },

    validate () {
      if (!this.formData.title) {
        this.tipTxt = '请输入问题和描述'
        this.isAlert = true
      }
      return this.formData.title && this.formData.title.length > 0
    },

    insertTag (tag) {
      this.currentTags.push(tag)
    },

    addTag () {
      this.tagInput = this.tagInput.replace(/\s+/g, '')
      if (this.tagInput) {
        this.insertTag(this.tagInput)
        this.tagInput = null
      }
    },

    removeTag (index) {
      this.currentTags.splice(index, 1)
    },

    getTags () {
      this.axios.get(api.faq.tags)
      .then(response => {
        if (response.status === 200 && response.data.data) {
          this.tags = response.data.data.list
        } else {
          this.tags = this.tagList
        }
      })
    },

    goBack: function () {
      this.$router.replace({name: 'faq'})
    }
  },
  created () {
    this.initData()
  },
  watch: {
    images (val) {
      this.formData.imgpath = val.join(',')
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
.feed-form textarea,
.feed-form .preview{
  padding: 0 0;
}
.form-control.faq-title-input {
  height: auto;
  font-size: 16px;
  line-height: 16px;
  padding: 10px 0;
  border-bottom:1px solid #edf1f2;
}

.tag-add-container .form-control{
  padding: 8px 0;
}
.faq-tag .tag-container{
  display: inline-block;
  vertical-align: middle;
}
.faq-tag .tag-container .tag {
  vertical-align: middle;
}

.tag-add-container {
  width: 100px;
  margin-top: 10px;
  display: inline-block;  
}
</style>
