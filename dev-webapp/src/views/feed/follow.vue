<template>
  <div>
    <div class="nav-top">
      <ul class="nav-inline nav-auto nav-inline-fixed">
        <li class="">
          <router-link :to="{name: 'feed'}" class="text-bold">最新<span class="feed-line"></span></router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'feed_follow'}" class="text-bold">关注<span class="feed-line"></span></router-link>
        </li>
      </ul>
    </div>
    
    <scroll class="app-container app-container-top app-container-bottom" v-model="list" ref="scrollComponent" key="feed-list"> 
      <!-- 新消息提醒 -->
      <new-message></new-message>
      <!-- /新消息提醒 -->

      <feed-list-item class="m-t" v-model="list"></feed-list-item>
    </scroll>

    <div class="feed-add-container">
      <router-link class="feed-add-btn" :to="{name: 'feed_add'}"><i class="fa fa-pencil"></i> 发圈子 </router-link>
    </div>

    <tabbar active="feed"></tabbar>

  </div>
</template>

<script>
import Tabbar from '../Tabbar'
import Scroll from '@/template/scroll'
import NewMessage from './new-message'
import FeedListItem from './list-item'

import api from '@/api'

export default {
  components: {
    Tabbar,
    Scroll,
    NewMessage,
    FeedListItem
  },
  data: () => ({
    list: []
  }),
  methods: {
    initData () {
      this.initFeed()
    },
    initFeed () {
      this.$refs.scrollComponent.init({
        api: api.feed.list,
        params: {
          type: 'dynamic_post'
        },
        response: 'data.data.list'
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
