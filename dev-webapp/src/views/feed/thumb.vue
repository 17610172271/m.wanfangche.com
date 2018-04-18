<template>
  <div style="height:100%;background-color:#fff">
    <nav-header :to="{name: 'feed_detail', params: {id: $route.params.id}}">赞</nav-header>
    <div class="thumb-list-container">
      <div class="thumb-item" v-for="item in list">
        <div class="pull-left thumb-sm thumb-circle">
          <router-link :to="{name: 'u_home', params:{u_id: item.id}}" class="block">
            <img :src="item.avatar | ossResize('avatar')">
          </router-link>
        </div>
        <div class="thumb-item-name pull-left text-md text-bolder">{{item.nickname}}</div>
        <button class="thumb-focus btn btn-follow pull-right" :class="{'thumb-focused': item.is_follow!=0}" v-if="currentUser.user_id!=item.id" @click="doFollow(item)" style="line-height: 14px;">{{item.is_follow===0 ? '关注' : '正在关注'}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  import NavHeader from '../Common/Navheader'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      NavHeader
    },
    data: () => ({
      list: ''
    }),
    computed: {
      ...mapGetters({
        currentUser: 'currentUser',
        isLoggedin: 'isLoggedin'
      })
    },
    methods: {
      // 点赞列表
      getThumbupList () {
        this.axios.get(api.feed.likeList, {params: {
          id: this.$route.params.id
        }})
        .then(response => {
          if (response.data.data) {
            this.list = response.data.data
          }
        })
      },
      // 加关注
      doFollow (item) {
        if (!this.checkAuth()) return // 需要登录状态
        this.axios.post(api.feed.follow, {
          uid: this.currentUser.user_id,
          id: item.id,
          accesstoken: ''
        })
        .then(response => {
          if (response.data.data === '已关注' || response.data.data === '相互关注') {
            item.is_follow = 1
          } else {
            item.is_follow = 0
          }
        })
      },
      // 登录判断
      checkAuth () {
        if (!this.isLoggedin) {
          this.$router.push({name: 'user_login'})
          return false
        } else {
          return true
        }
      }
    },
    created () {
      this.getThumbupList()
    }
  }
</script>
<style>
  
</style>
