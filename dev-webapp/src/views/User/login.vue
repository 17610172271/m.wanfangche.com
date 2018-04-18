<template>
  <div class="cost-body app-bodys">
    <nav-header>登录</nav-header>
    <div class="app-body app-container app-containers" >
      <div class="cost-tab">
        <p :class="{active: isshow}" @click="btnShow(1)">登录</p>
        <p :class="{active: !isshow}" @click="btnShow(2)">验证码登录</p>
      </div>
      <div v-if="isshow">
        <div class="login-body">
          <label for="">
            <span>手机号</span>
            <input type="number" v-model="phone">
          </label>
          <label for="">
            <span>密码</span>
            <input type="password" v-model="password">
          </label>
        </div>
        <div class="login-btn">
          <button @click="btnLogin">登录</button>
        </div>
        <div class="login-foot">
          <p></p>
          <p>还没有账号？ 快来<span @click="btnRegister">加入</span></p>
        </div>
      </div>
      
      <div v-if="!isshow">
        <div class="login-body">
          <label for="">
            <span>手机号</span>
            <input type="number" v-model="phone">
          </label>
          <label for="">
            <span>验证码</span>
            <input type="text" v-model="gaintext" value=" ">
            <button class="gain" @click="gain"><countdown v-if="messages" v-model="time" :value="time" :start="messages" style="display:inline-block; padding-left:3px; color:#FFFFFF;"></countdown>{{gaintxt}} </button>
          </label>
        </div>
        <div class="login-btn">
          <button @click="btnRegisters">登录</button>
        </div>
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
import { mapActions, mapGetters } from 'vuex'
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
      title: '登录',
      login: false,
      phone: '',
      message: false,
      messageTit: '',
      password: '',
      gaintext: '',
      isshow: true,
      gaintxt: '获取验证码',
      time: 60,
      messages: false
    }
  },
  created () {
    this.axios.get(api.rv.info, {params: {id: this.$route.query.id, s_date: this.$route.query.s_date, e_date: this.$route.query.e_date}})
   .then(response => {
   })
  },
  computed: mapGetters({
    isLoggedin: 'isLoggedin',
    isAgency: 'isAgency'
  }),
  methods: {
    btnRegister () {
      this.$router.replace('/register')
    },
    ...mapActions([
      'saveToken'
    ]),
    btnLogin () {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.message = true
        this.messageTit = '您填写的手机号格式不正确'
      } else {
        this.axios.post(api.order.submit, {tel: this.phone, passwd: this.password})
        .then(response => {
          if (response.data.code === 200) {
            this.saveToken({ token: response.headers.authorization })
            this.$router.go(-1)
          } else {
            this.message = true
            this.messageTit = response.data.msg
          }
        })
      }
    },
    btnShow (ind) {
      ind === 1 ? this.isshow = true : this.isshow = false
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
    },
    btnRegisters () {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.message = true
        this.messageTit = '您填写的手机号格式不正确'
      } else if (this.gaintext === '') {
        this.message = true
        this.messageTit = '请输入验证码'
      } else {
        this.axios.post(api.user.fastlogin, {tel: this.phone, tel_code: this.gaintext})
        .then(response => {
          if (response.data.code === 200) {
            this.saveToken({ token: response.headers.authorization })
            this.$router.go(-1)
          } else {
            this.message = true
            this.messageTit = '验证码不正确'
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

