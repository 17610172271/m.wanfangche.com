<template>
  <div class="setting-body">
      <navheader class="navheader">修改密码</navheader>
      <div class="app-body app-container app-containers">
        <div class="logo"><img src="../../assets/loading/logo_2_2@3x.png" alt=""></div>
        <div class="login-body">
          <label for="">
            <input type="tel" v-model="phone" placeholder="输入手机号">
          </label>
          <label for="">
            <input type="text" v-model="gaintext" value=" " placeholder="验证码">
            <button class="gain" @click="gain"><countdown v-if="messages" v-model="time" :value="time" :start="messages" style="display:inline-block; padding-left:3px; color:#FE7C1E;"></countdown>{{gaintxt}} </button>
          </label>
          <label for="">
            <input type="password" v-model="password" placeholder="输入新密码">
          </label>
          <label for="">
            <input type="password" v-model="repassword" placeholder="确认密码">
          </label>
        </div>
        <div class="login-btn">
          <button @click="submit" :class="{ 'submitNone': btn }">修改密码</button>
        </div>
      </div>
      <popup v-model="message" class="messages" style="height: 56px;" :show-mask="false">
      <h2>{{messageTit}}</h2>
    </popup>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import { Countdown, Popup } from 'vux'
import api from '@/api'

export default {
  components: {
    Navheader,
    Countdown,
    Popup
  },
  data () {
    return {
      login: false,
      phone: '',
      message: false,
      messageTit: '',
      password: '',
      repassword: '',
      gaintxt: '获取验证码',
      time: 60,
      messages: false,
      gaintext: '',
      btn: true
    }
  },
  methods: {
    submit () {
      if (this.password.length < 6 || this.password.length >= 20) {
        this.message = true
        this.messageTit = '请输入正确的验证码和密码!'
      } else {
        this.axios.post(api.user.updatePwd, {tel: this.phone, pwd: this.password, repwd: this.repassword, tel_code: this.gaintext})
        .then(response => {
          if (response.data.code === 200) {
            this.message = true
            this.messageTit = '密码修改成功！'
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          } else {
            this.message = true
            this.messageTit = response.data.msg
          }
        })
      }
    },
    gain () {
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
    },
    repassword (val) {
      if (this.phone && this.gaintext && this.password && this.repassword) {
        this.btn = false
      } else {
        this.btn = true
      }
    }
  }
}
</script>
<style scoped>
  .app .app-container {
    background-color: #fff;
  }
  .logo {
    width: 56px;
    height: 56px;
    background-color: #fff;
    margin: 24px auto 0px;
  }
  .logo img {
    width: 100%;
  }
  .login-body label {
    margin-bottom: 20px;
  }
  .submitNone {
    opacity: 0.5;
  }
</style>
