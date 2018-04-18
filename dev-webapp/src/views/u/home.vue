<template>
  <div class="u-home">
    <div class="u-home-bg">
      <img :src="backgroundImage | ossResize('middle')">
    </div>
     <scroll class="app-container-bottom" v-model="list" ref="scrollComponent" key="feed-list"> 
      <a class="u-home-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back_white.png">
      </a>
      <div class="u-info clear">
        <div class="u-info-bg clear"></div>
        <div class="u-info-container">
          <div class="u-info-avatar"><img :src="user.avatar | ossResize('small')"></div>
          <div class="pull-right u-info-follow-btn" v-if="user.relation">
            <a class="btn btn-follow" @click="doFollow" v-if="user.relation == '未关注'">
              <span class="fa fa-plus"></span>
            关注</a>
            <a class="btn btn-follow btn-followed" @click="doFollow" v-if="user.relation !== '未关注'">{{user.relation}}</a>
          </div>
          <div ><span class="text-xlg">{{user.nickname}}</span> <gender v-model="user.sex"></gender></div>
          <div class="user-car-certify" v-if="user.isrv == 1">
            <div class="pull-left user-certify-img">
              <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="">
            </div>
            <div class="pull-left text-lt text-sm">{{user.brand_name}} {{user.rv_type_name}}</div>
          </div>
          <div class="clear padder-v-10">
          <router-link :to="{name: 'u_follow'}" class="text-normal">
            <span class="text-bolder">{{user.follow_num}}</span> <span class="text-muted m-r">关注</span>
          </router-link>
           <router-link :to="{name: 'u_fans'}" class="text-normal">
             <span class="text-bolder">{{user.fans_num}}</span> <span class="text-muted m-r">粉丝</span>
             </router-link>
          </div>
        </div>

      </div>
      <div class="cut-line"></div>
      <feed-list-item v-model="list" class="bg-light"></feed-list-item>
      <div>
      </div>
    </scroll>
    <tabbar active="feed"></tabbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '@/api'
import Scroll from '@/template/scroll'
import FeedListItem from '../feed/list-item'
import Tabbar from '../Tabbar'
import { Gender } from '@/components'

export default {
  components: {
    Scroll,
    FeedListItem,
    Tabbar,
    Gender
  },
  data: () => ({
    list: [],
    backgroundImage: null,
    user: {
      avatar: null,
      fans_num: null,
      follow_num: null,
      id: null,
      level: null,
      nickname: null,
      relation: null,
      sex: null
    }
  }),
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      isLoggedin: 'isLoggedin'
    }),
    videoHeight () {
      return (this.$el.clientWidth - 30) * 9 / 16 + 2
    }
  },
  methods: {
    initData () {
      this.initUser()
      this.initFeedList()
    },

    // 初始化用的帖子
    initFeedList () {
      this.$refs.scrollComponent.init({
        api: api.feed.userFeed,
        params: {
          id: this.$route.params.u_id
        },
        response: 'data.data.list'
      }).then(response => {
        for (let val of response) {
          if (val.img[0]) {
            this.backgroundImage = val.img[0]
            return
          }
        }

        if (!this.backgroundImage) this.backgroundImage = 'http://img01.wanfangche.com/public/upload/201710/26/1508995567554.jpg'
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
    },

    doFollow () {
      if (this.checkAuth()) {
        this.user.is_follow = (this.user.is_follow !== 1) ? 1 : 0
        this.axios.post(api.feed.follow, {
          uid: this.currentUser.user_id,
          id: this.user.id,
          accesstoken: ''
        })
        .then(response => {
          this.user.relation = response.data.data
          if (response.data.data === '未关注') {
            this.user.fans_num -= 1
          } else if (response.data.data === '相互关注' || response.data.data === '已关注') {
            this.user.fans_num += 1
          }
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    // 初始化用户信息
    initUser () {
      this.axios.get(api.feed.userInfo, {params: {
        id: this.$route.params.u_id
      }})
      .then(response => {
        if (response.data.code === 1) {
          this.user = response.data.data
        }
      })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initData()
    })
  }
}
</script>
<style>
.u-home-back {
  width: 20px;
  height: 28px;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  z-index: 999;
  text-align: center;
}
.u-home .u-home-back img {
  width: 10px;
  height: 18px;
  vertical-align: middle;
}
.u-home-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: 50%;
}
.u-home-bg img {
  width: 100%;
}
.u-home .app-container {
  background: transparent;
}
.u-home .app-container .inner.bg-light {
  background: none;
}
.u-info {
  /*background: #fff;*/
}
.u-info-bg {
  height: 4rem;
  text-align: center;
  overflow: hidden;
  z-index: -1;
}
.u-info-bg img {
  width: 100%;
}
.u-info-container {
  padding: 0 15px;
  position: relative;
  z-index: 1;
  background: #fff;
}
.u-info-avatar {
  display: inline-block;
  margin-top: -40px;
  width: 80px;
  height:80px;
  overflow: hidden;
  border-radius: 50% 50%;
  background: #FFF;
  border: 5px solid #FFF;
}
.u-info-avatar img{
  width: 100%;
}
.u-info-follow-btn {
  margin-top: 50px;
}
.u-info-relation {
  padding: 2px 15px;
  border: 1px solid #8D9DB0;
  color: #8D9DB0;
  border-radius: 4px 4px;
}
</style>
