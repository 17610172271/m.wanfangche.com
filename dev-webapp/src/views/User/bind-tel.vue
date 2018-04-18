<template>
  <div class="bind-tel">
    <navheader class="navheader">绑定手机</navheader>
    <div class="app-body app-container app-containers">
      <div class="login-body">
        <label for="">
          <input type="tel" v-model="phone" placeholder="输入手机号">
        </label>
        <label for="">
          <input type="text" v-model="gaintext" value=" " placeholder="验证码">
          <button class="gain" @click="gain"><countdown v-if="messages" v-model="time" :value="time" :start="messages" style="display:inline-block; color:#FE7C1E;"></countdown>{{gaintxt}} </button>
        </label>
        <div class="login-btn">
            <button @click="submit" :class="{ 'submitNone': !phone || !gaintext }">确定</button>
        </div>
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
        if (this.gaintext && this.phone) {
          this.axios.post(api.user.bindTel, {tel: this.phone, msgvalicode: this.gaintext})
          .then(response => {
            if (response.data.code === 200) {
              this.message = true
              this.messageTit = '手机号绑定成功！'
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
      }
    }
  }
</script>
<style scoped>
  .app .app-container {
    background-color: #fff;
    padding-top: 50px;
  }
  .login-body label {
    margin-bottom: 20px;
  }
  .submitNone {
    opacity: 0.5;
  }
  .login-body label:nth-child(2) input {
    width: 191px;
  }
  .login-body label .gain {
    background-color: rgba(254,152,21,.1);
    height: 44px;
    line-height: 44px;
    bottom: 0px;
    border-radius: 4px;
  }
  .login-body label span {
    padding: 0 0 0 3px;
  }
  .login-btn button {
    background-color: #FE9815;
  }
</style>
