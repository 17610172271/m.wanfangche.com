<template>
  <div class="cost-body">
    <nav-header>注册11</nav-header>
    <div class="app-body app-container app-containers">
      <div class="login-body">
        <label for="">
          <span>手机号</span>
          <input type="number" v-model="phone">
        </label>
        <label for="">
          <span>密码</span>
          <input type="password" v-model="passwd" value=" ">
        </label>
        <label for="">
          <span>昵称</span>
          <input type="text" v-model="name" value=" ">
        </label>
        <label for="">
          <span>验证码</span>
          <input type="text" v-model="gaintext" value=" ">
          <button class="gain" @click="gain"><countdown v-if="messages" v-model="time" :value="time" :start="messages" style="display:inline-block; padding-left:3px; color:#FFFFFF;"></countdown>{{gaintxt}} </button>
        </label>
      </div>
      <div class="login-btn">
        <button @click="btnRegister">注册</button>
      </div>
      <div class="login-foot">
          <p></p>
          <p>已有账号？快去 <span @click="tologin">登录</span></p>
      </div>
    </div>
    
    <popup v-model="message" class="messages" style="height: 56px;" :show-mask="false">
      <h2>{{messageTit}}</h2>
    </popup>
  </div>
</template>
<script>
import { Alert, Popup, Countdown } from 'vux'
import NavHeader from '../Common/Navheader.vue'
import api from '@/api'
import formatTime from '@/filters/format-time'
export default {
  components: {
    Alert,
    NavHeader,
    Popup,
    Countdown
  },
  filters: {
    parseInt (value) {
      return parseInt(value)
    },
    date (value) {
      var arr = formatTime(value, 'MM-DD').split('-')
      return arr[0] + '月' + arr[1] + '日'
    }
  },
  data () {
    return {
      login: false,
      phone: '',
      message: false,
      messageTit: '',
      passwd: '',
      gaintxt: '获取验证码',
      time: 60,
      messages: false,
      gaintext: '',
      name: ''
    }
  },
  created () {
  },
  methods: {
    btnRegister () {
      if (this.passwd.length < 6 || this.passwd.length >= 20) {
        this.message = true
        this.messageTit = '请输入6位以上20位以下的密码'
      } else {
        this.axios.post(api.user.useradd, {tel: this.phone, passwd: this.passwd, tel_code: this.gaintext, nickname: this.name})
        .then(response => {
          if (response.data.code === 200) {
            this.$router.go(-1)
          } else {
            this.message = true
            this.messageTit = response.data.msg
          }
        })
      }
    },
    gain () {
      console.log(1)
      this.axios.post(api.user.detection, {tel: this.phone, type: 2})
      .then(response => {
        if (response.data.code === 200) {
          if (this.time === 60) {
            this.axios.post(api.user.register, {tel: this.phone})
            .then(response => {
              if (response.data.code === 200) {
                this.gaintxt = 's'
                this.messages = true
              } else {
                this.message = true
                this.messageTit = response.data.msg
              }
            })
          }
        } else {
          this.message = true
          this.messageTit = response.data.msg
        }
      })
    },
    tologin () {
      this.$router.replace({
        name: 'user_login'
      })
    }
  },
  watch: {
    message (val) {
      if (val) {
        setTimeout(() => {
          this.message = false
        }, 1000)
      }
    },
    time (val) {
      if (val === 0) {
        this.time = 60
        this.gaintxt = '获取验证码'
        this.messages = false
      }
    }
  }
}
</script>

