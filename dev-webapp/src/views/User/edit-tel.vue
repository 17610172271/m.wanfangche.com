<template>
  <div class="edit-tel">
    <navheader class="navheader">修改手机</navheader>
    <div class="app-body app-container app-containers">
      <!-- 验证手机号 -->
      <div class="login-body" v-if="proccess=='checkCode'">
        <div class="text-thin warn-text text-md">为了保证你的账号安全，需先验证你的身份，验证成功后可以进行下一步操作</div>
        <div class="tel-binded text-xxlg text-bold m-b-lg">{{tel}}</div>
        <label for="" class="check-code">
          <input type="text" v-model="gaintext" value=" " placeholder="验证码">
          <button class="gain" @click="gain"><countdown v-if="messages" v-model="time" :value="time" :start="messages" style="display:inline-block; color:#FE7C1E;"></countdown>{{gaintxt}} </button>
        </label>
        <div class="login-btn">
            <button @click="submit('checkCode')" :class="{ 'submitNone': !gaintext }">下一步</button>
        </div>
      </div>
      <!-- 更改手机号 -->
      <div class="login-body" v-if="proccess=='edit-tel'">
        <label for="">
          <input type="tel" v-model="phone" placeholder="输入手机号">
        </label>
        <label for="" class="check-code">
          <input type="text" v-model="gaintext" value=" " placeholder="验证码">
          <button class="gain" @click="gain"><countdown v-if="messages" v-model="time" :value="time" :start="messages" style="display:inline-block; color:#FE7C1E;"></countdown>{{gaintxt}} </button>
        </label>
        <div class="login-btn">
            <button @click="submit('edit-tel')" :class="{ 'submitNone': !phone || !gaintext }">确认修改</button>
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
        data: '',
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
        btn: true,
        proccess: 'checkCode',
        tel: ''
      }
    },
    methods: {
      getInfoList () {
        this.axios.get(api.user.list)
        .then(response => {
          if (response.data.code === 200) {
            this.data = response.data.data
            this.tel = this.data.tel.substr(0, 3) + '****' + this.data.tel.substr(-4, 4)
          }
        })
      },
      submit (proccess) {
        if (proccess === 'checkCode' && this.gaintext) {
          this.axios.post(api.feed.checkMsg, {
            tel: parseInt(this.data.tel),
            msgvalicode: parseInt(this.gaintext)
          })
          .then(response => {
            if (response.data.code === 1) {
              this.gaintext = ''
              this.time = 0
              this.proccess = 'edit-tel'
            } else {
              this.message = true
              this.messageTit = response.data.msg
            }
          })
        } else if (proccess === 'edit-tel') {
          this.axios.post(api.feed.checkMsg, {
            tel: parseInt(this.phone),
            msgvalicode: parseInt(this.gaintext)
          })
          .then(response => {
            if (response.data.code === 1) {
              this.axios.post(api.user.update, {
                tel: parseInt(this.phone)
              })
              .then(response => {
                if (response.data.code === 1) {
                  this.gaintext = ''
                  this.phone = ''
                  this.message = true
                  this.time = 0
                  this.messageTit = '修改成功！'
                  setTimeout(() => {
                    this.$router.go(-1)
                  }, 1000)
                } else {
                  this.message = true
                  this.messageTit = response.data.msg
                }
              })
            } else {
              this.message = true
              this.messageTit = response.data.msg
            }
          })
        }
      },
      gain () {
        if (this.time === 60) {
          this.axios.post(api.feed.sendmsg, {tel: this.phone || this.data.tel})
          .then(response => {
            if (response.data.code === 1) {
              this.gaintxt = 's'
              this.message = true
              this.messages = true
              this.messageTit = '发送成功'
            } else {
              this.message = true
              this.messageTit = response.data.msg
            }
          })
        }
      },
      onRouteChange () {
        this.proccess = 'checkCode'
        this.getInfoList()
      }
    },
    created () {
      this.getInfoList()
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
      '$route': 'onRouteChange'
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
  .login-body .check-code input {
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
  .login-btn {
    padding: 20px 0 0 0;
  }
  .login-btn button {
    background-color: #FE9815;
    margin: 0;
  }  
  .warn-text {
    color: #8A95A0;
    text-align: center;
    margin-bottom: 24px;
  }
  .edit-tel button:focus {
    outline: none;
  }
</style>
