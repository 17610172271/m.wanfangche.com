<template>
  <div>
    <div class="nav-header" style="position:fixed;">
      <div class="nav-header-left menu" style="top:1px;font-size:18px;">
        <a class="nav-header-back" href="javascript:" @click="show_menu=true">
          <i class="icon-menu"></i></a>
      </div>
      <h1 class="nav-header-title" >
        <slot></slot>
      </h1>
      <div class="nav-header-right">
        <a class="nav-header-more"></a>
      </div>
    </div>
    
    <popup v-model="show_menu" height="100%" width="80%" position="left" class="bg-white top-nav-popup" @on-show="onPopupShow()" @on-hide="onPopupHide()">
      <div class="panel padder padder-v m-t" style="padding-left:0;">
        <div class="panel-body">
          <router-link :to="{ name: 'user_login'}" v-if="!isLoggedin">
          <div class="avatar avatar-circle avatar-xlg bg-color">
            <img src="../../assets/avatar_default_menu@3x.png">
          </div>
          <div class="h3 text-bolder" style="color:#2E3E4C;">欢迎登录</div>
          </router-link>
          <div v-else @click="userlist">
          <div class="avatar avatar-circle avatar-xlg bg-color">
            <img v-if="userdata.avatar !== ''" :src="userdata.avatar | ossResize('small')" alt="">
            <img v-else src="../../assets/avatar_default_menu@3x.png">
          </div>
          <div class="m-t-sm clear">
            <div class="h3 text-normal text-bolder" v-if="userdata.nickname !== ''">{{userdata.nickname}}</div>
            <div class="h3 text-normal text-bolder" v-if="userdata.nickname === ''">{{userdata.tel}}</div>
            <!-- <div><span class="tag">V{{userdata.level || 0}}老司机</span></div>
 -->          </div>
          </div>
        </div>
      </div>
      <div class="panel padder">
        <div class="panel-body" style="padding-bottom:0px;">
          <ul class="list-group list-group-unstyle list-group-lg">
            <router-link :to="{name: 'feed'}" class="list-group-item">
              <i class="icon-feed thumb"></i><span>房车圈</span>
            </router-link>
            <router-link :to="{name: 'faq'}" class="list-group-item">
              <i class="icon-qa thumb"></i><span>问答</span>
            </router-link>
            <router-link class="list-group-item" :to="{ name: 'home'}">
              <i class="icon-rental thumb"></i><span>租车</span>
            </router-link>
            <router-link class="list-group-item" :to="{ name: 'open_order'}">
              <i class="icon-order-inquiry thumb"></i><span>订单查询</span>
            </router-link>
          </ul>
        </div>
        <div class="panel-body" v-if="isLoggedin" style="padding-top:0px;">
          <ul class="list-group list-group-unstyle list-group-lg">
            <router-link class="list-group-item" :to="{ name: 'user_order'}">
              <i class="icon-order thumb"></i><span>我的订单</span>
            </router-link>
            <router-link class="list-group-item" :to="{ name: 'user_message'}">
              <i class="icon-mail thumb"></i><span>我的消息</span>
            </router-link>
            <router-link class="list-group-item" :to="{ name: 'user_setting'}">
              <i class="icon-setting thumb"></i><span>设置</span>
            </router-link>
          </ul>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import { Popup } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import api from '@/api'

export default {
  components: {
    Popup
  },
  data () {
    return {
      show_menu: false,
      userdata: {}
    }
  },
  methods: {
    onPopupShow () {
    },
    onPopupHide () {
    },
    ...mapActions([
      'doLogout'
    ]),
    logout () {
      this.doLogout().then(() => {
        this.$router.replace('/login')
      })
    },
    userlist () {
      this.$router.push('/user')
    }
  },
  computed: mapGetters({
    currentUser: 'currentUser',
    isLoggedin: 'isLoggedin'
  }),
  created () {
    this.axios.get(api.user.list)
    .then(response => {
      if (response.data.code === 200) {
        this.userdata = response.data.data
      }
    })
  }
}
</script>
<style scoped>
  .top-nav-popup{
    z-index: 510;
  }
  .list-group-item .thumb{
    font-size: 20px;
  }
  a.list-group-item{
    position: relative;
  }
  a.list-group-item span{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #2E3E4C;
    letter-spacing: 0;
    position: absolute;
    top:12px;
  }
</style>
