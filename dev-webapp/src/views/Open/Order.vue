<template>
  <div class="appbody">
    <navheader>查询订单</navheader>
    <div class="app-body">
      <p class="app-search">通过订单号查询</p>
      <input type="text" class="number" placeholder="订单号" v-model="data.code"/>
      <input type="text" class="phone-n" placeholder="下单时填写的联系人手机号码" maxlength="11" v-model="data.telephone"/>
	    
			<button class="search" @click="onSubmit">查询</button>
    </div>
    <popup v-model="message" class="message" style="height: 56px;" :show-mask="false">
      <h2>{{messageTit}}</h2>
    </popup>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import { Popup } from 'vux'
import api from '@/api'

export default {
  components: {
    Navheader,
    Popup
  },
  data () {
    return {
      data: {
        telephone: '',
        code: ''
      },
      message: false,
      messageTit: '',
      image: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.data.code === '') {
        this.message = true
        this.messageTit = '请输入订单号'
      } else if (this.data.telephone === '') {
        this.message = true
        this.messageTit = '请输入手机号'
      } else if (!(/^1[34578]\d{9}$/.test(this.data.telephone))) {
        this.message = true
        this.messageTit = '请输入正确手机号'
      } else {
        this.axios.post(api.order.detail, this.data)
        .then(response => {
          if (response.data.code === 200) {
            this.$router.push({
              path: '/order/' + response.data.data[0].id,
              params: {id: response.data.data[0].id}
            })
          } else {
            this.message = true
            this.messageTit = '您查询的订单不存在'
            this.data.telephone = ''
            this.data.code = ''
          }
        })
      }
    },
    refresh () {
      this.axios.get(api.order.cancel)
      .then(response => {
        this.image = '/server/public/common/valicode/' + new Date().getTime()
      })
    }
  },
  created () {
    this.image = '/server/public/common/valicode/' + new Date().getTime()
    this.axios.get(api.order.cancel)
    .then(response => {
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
