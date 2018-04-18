<template>
  <div class="user-home" v-if="currentUser">
    <div class="panel padder-v" v-if="isLoggedin">
      <div class="panel-body">
        <div class="avatar avatar-circle avatar-xxlg">
          <img v-if="currentUser.avatar === ''" src="../../assets/avatar_default_menu@3x.png" style="background:#FE7C1E;">
          <img v-else :src="currentUser.avatar | ossResize('small')">
        </div>
        <div class="padder-v clear name">
          <div class="text-xxlg" v-if="currentUser.nickname !== ''">
            {{currentUser.nickname}}
            <div class="user-certify-img1">
              <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="">
            </div>
          </div>
          <div class="text-xxlg" v-else>{{currentUser.tel}}</div>
          <div class="padder-v">
            <router-link class="m-r":to="{name: 'user_follow'}">关注 {{currentUser.follow_num || 0}}</router-link>
            <router-link class="m-r" :to="{name: 'user_fans'}">粉丝 {{currentUser.fans_num || 0}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="panel padder-v" v-if="!isLoggedin" @click="gologin">
      <div class="panel-body">
        <div class="avatar avatar-circle avatar-xxlg bg-color">
          <img src="../../assets/avatar_default_menu@3x.png">
        </div>
        <div class="padder-v clear">
          <div class="text-xxxlg">未登录</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <ul class="list-group list-group-underline list-group-lg">
        <router-link class="list-group-item" :to="{ name: 'user_order'}" v-if="isLoggedin">
          <i class="icon icon-order"></i>我的订单
        </router-link>
      </ul>
    </div>
    <div class="panel">
      <ul class="list-group list-group-underline list-group-lg">
        <router-link :to="{name: 'user_message'}" class="list-group-item">
          <i class="icon icon-mail"></i>我的消息<span class="notice-point1" v-show="data>0"></span>
        </router-link>
        <router-link :to="{name: 'user_feed'}" class="list-group-item">
          <i class="icon icon-feed"></i>我的房车圈
        </router-link>
        <router-link :to="{name: 'user_faq'}" class="list-group-item">
          <i class="icon icon-qa"></i>我的问答
        </router-link>
        <router-link :to="{name: 'user_camp'}" class="list-group-item">
          <i class="icon icon-camp-camp"></i>我的营地
        </router-link>
        <!-- <router-link :to="{name: 'user_faq'}" class="list-group-item">
          <i class="icon fd-answer"></i>我的回答
        </router-link> -->
      </ul>
    </div>
    <div class="panel">
      <ul class="list-group list-group-underline list-group-lg">
        <router-link class="list-group-item" :to="{ name: 'user_setting'}" style="border-radius:0;">
          <i class="icon icon-setting"></i>设置
        </router-link>
      </ul>
    </div>
    <tabbar active="user"></tabbar>
  </div>
</template>
<script>
import Tabbar from '../Tabbar'
import { mapGetters, mapActions } from 'vuex'
import api from '@/api'

export default {
  name: 'user',
  components: {
    Tabbar
  },
  data: () => ({
    data: 0
  }),
  methods: {
    ...mapActions([
      'doLogout'
    ]),
    getMessage () {
      this.axios.get(api.user.notifyNum)
      .then(response => {
        if (response.data.code === 1) {
          this.data = response.data.data.comment_num + response.data.data.credit_num + response.data.data.notify_num
        }
      })
    },
    gologin () {
      this.$router.push('/user/login')
    }
  },
  computed: mapGetters({
    currentUser: 'currentUser',
    isLoggedin: 'isLoggedin'
  }),
  created () {
    this.getMessage()
  },
  mounted () {
    // this.getUserInfo()
  }
}
</script>
<style>
  .user-home .icon {
    line-height: 1;
    font-size: 24px;
    color: #8D9DB0;
    margin-right: 10px;
    float: left;
  }
  .user-home .name {
    padding-top: 32px;
    color:  #2E3E4C;
  }
  .user-home .avatar {
    margin-top: 22px;
    margin-right: 16px;
    margin: 22px 16px 0 9px;
  }
  .user-home .text-xxlg {
    font-size: 24px;
    font-weight: 700;
  }
  .user-home .name .m-r {
    margin-right: 17px;
    color:  #2E3E4C;
  }
  .user-home .list-group-item {
    border-bottom: 1px solid #f5f5f5;
    color: #2e3e4c;
    vertical-align: top;
    line-height: 24px;
  }

</style>
