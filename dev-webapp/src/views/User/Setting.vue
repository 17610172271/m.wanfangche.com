<template>
  <div class="setting-body">
    <div class="car-certify-header1">
      账户设置
      <a class="car-brand-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png">
      </a>
    </div>
    <div class="app-body">
      <ul class="setting-list" style="padding-top: 44px;">

        <li class="avatar1">
          <label class="avatar-label">
            <file-upload
            :post-action="postAction"
            :extensions="extensions"
            :accept="accept"
            :multiple="multiple"
            :drop="drop"
            :drop-directory="dropDirectory"
            :size="size"
            :thread="thread"
            :headers="headers"
            :data="data1"
            :max-length="maxLength"
            :preload="preload"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload"
            v-show="false"></file-upload>
            头像
            <div class="avatar2">
              <img :src="data.avatar | ossResize('avatar')" alt="">
              <div class="j-album-process" v-if="!files[0].success">
              </div>
            </div>
            <span class="icon icon-input-expansion"></span>
          </label>
        </li>
        
        <li @click="modifycname">昵称<span class="cname">{{ data.nickname }}</span><span class="icon icon-input-expansion"></span></li>
        <li>性别<span class="cname">{{ data.sex | switchSex }}</span><span class="icon icon-input-expansion"></span>
          <popupPicker :data="sex" v-model="gender" @on-change="changegender"></popupPicker>
        </li>
        <li class="birth">出生日期<span class="cname">{{ data.birthday }}</span><span class="icon icon-input-expansion"></span>
          <datetime :title="birth" :min-year="minyear" :max-year="maxyear" @on-change="changeBirth" v-model="birthday"></datetime>
        </li>
        <li class="password"><router-link :to="{ name: 'setting_password' }">修改密码<span class="icon icon-input-expansion"></span></router-link></li>
        <li class="bind-tel">绑定手机<router-link :to="{ name: 'bind_tel' }" v-if="!data.tel" class="pull-right btn btn-follow m-t-21">绑定</router-link><router-link :to="{name: 'edit_tel'}" href="javascript:;" v-if="data.tel" class="pull-right btn btn-follow m-t-21">修改手机</router-link></li>
        <li class="bind-wechat">绑定微信<a href="javascript:;" class="pull-right btn btn-follow btn-followed m-t-13">已绑定</a></li>
        <li class="password certify-car" @click="getStatus()"><a href="javascript:;">爱车认证<span class="icon icon-input-expansion"></span></a></li>
        <li class="exit" @click="exit">退出登录</li>
      </ul>
    </div>
    <popup v-model="popupshow" :is-transparent="true">
      <div class="confirm">
        <h3>请输入新昵称</h3>
        <input type="text" ref="nickname" autofocus="autofocus" id="cname" v-model="nickname"><br>
        <a href="javascript:;" @click="cancel">取消</a>
        <a href="javascript:;" class="ensure" @click="changecname">确认</a>
      </div>
    </popup>
    <popup v-model="message" class="messages" style="height: 56px;" :show-mask="false">
      <h2>{{messageTit}}</h2>
    </popup>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import { mapActions, mapGetters } from 'vuex'
import { Popup, PopupPicker, Datetime } from 'vux'
import FileUpload from '@/components/upload'
// import store from '@/store'
import api from '@/api'
const switchSex = (str) => {
  return parseInt(str) === 2 ? '女' : (parseInt(str) === 1 ? '男' : '保密')
}

export default {
  components: {
    Navheader,
    Popup,
    PopupPicker,
    Datetime,
    FileUpload
  },
  filters: {
    switchSex
  },
  data () {
    return {
      status: '',
      birthday: null,
      popupshow: false,
      sex: [['男', '女', '保密']],
      birth: '出生日期',
      gender: [],
      data: {},
      minyear: 1900,
      maxyear: 2017,
      messageTit: '',
      message: false,
      files: [{success: true, progress: '100'}],
      headers: {},
      data1: {},
      upload: true,
      postAction: '/server/community/public/common/upload',
      extensions: 'gif,jpg,jpeg,png,webp',
      accept: 'image/*',
      multiple: false,
      drop: false,
      dropDirectory: false,
      size: 1024 * 1024 * 10,
      thread: 9,
      automatic: true,
      maxLength: 2,
      preload: true,
      nickname: ''
    }
  },
  computed: mapGetters({
    isLoggedin: 'isLoggedin',
    isAgency: 'isAgency'
  }),
  created () {
    this.getInfoList()
    this.gender = [this.switchGender(this.data.sex)]
    this.getYear()
  },
  methods: {
    ...mapActions([
      'doLogout'
    ]),
    // 爱车认证
    getStatus () {
      this.axios.get(api.user.detailCertify)
      .then(response => {
        if (response.data.code === 1) {
          this.status = response.data
          // this.status.data.status = 2
          if (!this.status.data) {
            this.$router.push({name: 'car_certify', query: {process: 0}})
          } else if (this.status.data.status === 0) {
            this.$router.push({name: 'car_certify', query: {process: 5}})
          } else if (this.status.data.status === 1) {
            this.$router.push({
              name: 'car_certify',
              query: {
                process: 7,
                brand_id: this.status.data.brand_id,
                brand_name: this.status.data.brand_name,
                drivers_license: this.status.data.drivers_license,
                driving_license: this.status.data.driving_license,
                failure_reason: this.status.data.failure_reason,
                id: this.status.data.id,
                rv_id: this.status.data.rv_id,
                rv_type_name: this.status.data.rv_type_name,
                logo: this.status.data.logo
              }
            })
          } else if (this.status.data.status === 2) {
            this.$router.push({
              name: 'car_certify',
              query: {
                process: 6,
                brand_id: this.status.data.brand_id,
                brand_name: this.status.data.brand_name,
                drivers_license: this.status.data.drivers_license,
                driving_license: this.status.data.driving_license,
                failure_reason: this.status.data.failure_reason,
                id: this.status.data.id,
                rv_id: this.status.data.rv_id,
                rv_type_name: this.status.data.rv_type_name,
                logo: this.status.data.logo
              }
            })
          } else {
            this.$router.push({name: 'car_certify', query: {process: 0}})
          }
        } else {
          this.$router.push({name: 'car_certify', query: {process: 0}})
        }
      })
    },
    getInfoList () {
      this.axios.get(api.user.list)
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          this.birthday = this.data.birthday || '2000-01-01'
          this.nickname = this.data.nickname
        }
      })
    },
    getYear () {
      var date = new Date()
      this.maxyear = date.getFullYear()
    },
    goBack () {
      this.$router.push({name: 'user'})
    },
    exit () {
      this.doLogout()
      this.$router.go('-1')
    },
    cancel () {
      this.popupshow = false
    },
    modifycname () {
      this.popupshow = true
      document.getElementById('cname').focus()
    },
    changeAvatar (file) {
      // file = this.$refs.input.files[0]
      // const axiosConfig = {
      //   headers: {
      //     'Content-type': 'application/x-www-form-urlencoded',
      //     'Authorization': `${store.getters.token}`
      //   }
      // }
      // const formdata = new window.FormData()
      // formdata.append('file', file)
      // this.axios.post(api.user.updAvatar, formdata, axiosConfig)
      // .then(response => {
      //   if (response.data.code === 200) {
      //     this.data.avatar = response.data.data.data.filename
      //     this.message = true
      //     this.messageTit = '修改成功！'
      //   }
      // })
      this.axios.post(api.user.update, {
        avatar: this.files[0].response.data[0].filename
      })
      .then(response => {
        if (response.data.code === 1) {
          this.data.avatar = this.files[0].response.data[0].filename
          this.saveAuth()
          this.message = true
          this.messageTit = '修改成功！'
        } else {
          this.message = true
          this.messageTit = '服务器错误'
        }
      })
    },
    saveAuth () {
      this.axios.get(api.feed.auth)
      .then(response => {
        if (response.data.code === 200 && response.headers.authorization) {
          this.saveToken({token: response.headers.authorization})
        }
      })
    },
    changecname () {
      this.popupshow = false
      this.axios.post(api.user.update, {nickname: this.nickname})
      .then(response => {
        if (response.data.code === 1) {
          this.data.nickname = this.nickname
          this.saveAuth()
          this.message = true
          this.messageTit = '修改成功！'
        } else {
          this.message = true
          this.messageTit = response.data.msg
        }
      })
    },
    switchGender (str) {
      return parseInt(str) === 2 ? '女' : (parseInt(str) === 1 ? '男' : '保密')
    },
    changegender () {
      this.axios.post(api.user.update, {sex: this.gender[0] === '女' ? 2 : (this.gender[0] === '男' ? 1 : 0)})
      .then(response => {
        if (response.data.code === 1) {
          this.data.sex = (this.gender[0] === '女' ? 2 : (this.gender[0] === '男' ? 1 : 0))
          this.message = true
          this.messageTit = '修改成功！'
        }
      })
    },
    changeBirth (value) {
      this.axios.post(api.user.update, {birthday: this.birthday})
      .then(response => {
        if (response.data.code === 1) {
          this.data.birthday = this.birthday
          this.message = true
          this.messageTit = '修改成功！'
        }
      })
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
      // Before adding a file
      // 添加文件前
      // Filter system files or hide files
      // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }

        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }

        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },

    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        // console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        // console.log('update', newFile)
        this.emitInput()
        if (newFile.active && !oldFile.active) {
          // beforeSend

          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }

        if (newFile.progress !== oldFile.progress) {
          // progress
        }

        if (newFile.error && !oldFile.error) {
          // error
        }

        if (newFile.success && !oldFile.success) {
          // success
          this.changeAvatar()
          this.emitInput()
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
        }
      }

      if (!newFile && oldFile) {
        // remove
        this.emitInput()
      }

      // Automatic upload
      if (this.automatic) {
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      }
    },
    emitInput () {
      let rel = []
      rel = this.files.map(file => {
        return file.response.data ? file.response.data[0].filename : undefined
      })
      this.$emit('input', rel)
    },
    ...mapActions({
      saveToken: 'saveToken'
    })
  },
  watch: {
    message (val) {
      if (val) {
        setTimeout(() => {
          this.message = false
        }, 1000)
      }
    }
  }
}
</script>
<style>
  .setting-body .app-body {
    /*height: 100%;*/
    position: relative;
    background-color: #fff;
  } 
/*  .setting-body .setting-list {
    height: 100%;
  }*/
  .setting-body .setting-list li {
    text-align: left;
    padding: 0px 6px;
    height: 54px;
    line-height: 54px;
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #1A232B;
    letter-spacing: 0;
    border-bottom: 1px solid #f5f5f5;
    font-weight: 500;
  }
  .setting-body .setting-list .avatar1 {
    height: 68px;
    line-height: 68px;
  }
  .setting-body .setting-list .avatar-label {
    width: 100%;
    height: 100%;
  }
  .setting-body .file {
    position: absolute;
    display: inline-block;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    text-decoration: none;
    width: 90%;
    height: 68px;
    z-index: 5;
  }
  .setting-body .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .setting-body .avatar2 {
    position: absolute;
    top: 18px;
    right: 27px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
  }
  .setting-body .avatar2 .j-album-process {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    width: 100%;
    background: rgba(0,0,0, .75);
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
  .setting-body .avatar2 img {
    height: 100%;
    vertical-align: top;
  }
  .setting-body .vux-popup-dialog {
    top: 0;
  }
  .setting-body .confirm {
    width: 80%;
    height: 194px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    margin-top: 100px;
  }
  .setting-body .confirm h3 {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #2E3E4C;
    letter-spacing: 0;
    margin: 0;
    
  }
  .setting-body .confirm input {
    outline: none;
    width: 80%;
    height: 38px;
    margin-top: 42px;
    margin-bottom: 39px;
    font-size: 20px;
    text-align: center;
    border: 0;
    border-bottom: 1px solid #ededed;
    padding-bottom: 8px;
    border-radius: 0;
  }
  .setting-body .confirm a {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #1A232B;
    letter-spacing: -0.43px;
    display: inline-block;
    
  }
  .setting-body .confirm .ensure {
    color: #FE7C1E;
    letter-spacing: -0.43px;
    margin-left: 115px;
  }
  .setting-body .icon {
    position: absolute;
    right: 10px;
    top: 17px;
  }
  .setting-body .avatar1 .icon {
    top: 26px;
  }
  .setting-body .icon:before {
    color: #91a0b3;
    font-size: 10px;
  }
  .setting-body .cname {
    position: absolute;
    right: 25px;
    top: 0px;
    color: #91a0b3;
    font-size: 16px;
    font-weight: 500;
  }
  .setting-body .vux-cell-box {
    position: absolute;
    top: 0;
    right: 5px;
    opacity: 0;
    width: 90%;
    height: 54px;
  }
  .setting-body .birth > a {
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
    height: 54px;
    opacity: 0;
  }

  .setting-body .password a {
    color: #1A232B;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .setting-body .password .icon {
    top: 25px;
  }
  .setting-body .setting-list .exit {
    /*position: absolute;*/
    left: 50%;
    bottom: 20px;
    width: 85%;
    height: 44px;
    background: #FE7C1E;
    border-radius: 4px;
    transform: translateX(-50%);
    text-align: center;
    line-height: 44px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .setting-body .messages {
    position: absolute;
    top: 30%;
  }
  .setting-body .setting-list .password,
  .setting-body .setting-list .bind-tel {
    height: 70px;
    line-height: 70px;
  }
  .setting-body .m-t-21 {
    margin-top: 21px;
  }
  .setting-body .m-t-13 {
    margin-top: 13px;
  }
</style>
