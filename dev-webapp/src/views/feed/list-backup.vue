<template>
  <div class="feed-list-container">
    <div class="nav-top">
      <ul class="nav-inline nav-auto nav-inline-fixed text-center">
        <li class="">
          <router-link :to="{name: 'feed'}">最新</router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'feed', query: {type: 'dynamic_post'}}">关注</router-link>
        </li>
      </ul>
    </div>

  <div class="app-container app-container-top app-container-bottom"
  ref="scrollContainer"
  @scroll="onScroll($event)"
  >
    <div class="app-wrapper inner">

    <div class="middle text-muted text-center"  v-if="!list">
      <loading v-if="isLoading"></loading>
      <div v-if="isError && !isLoading">
        <p class="text-xxlg"><i class="fa  fa-frown-o"></i></p>
        <p>服务器连接失败</p>
      </div>
    </div>

    <div class="feed-list m-t" v-if="list">

      <!-- 新消息提醒 -->
      <new-message></new-message>
      <!-- /新消息提醒 -->

      <div class="middle text-muted text-center"  v-if="!isLoading && list.length < 1">
        <p>没有数据</p>
      </div>

      <feed-list-item v-for="(item, index) in list" :key="index" :data="item"></feed-list-item>
      
      
      <div class="load-more text-center text-muted block clear" v-if="!isLoading && isScrolling">
        <p v-if="!noMoreData">{{infiniteLoading ? '加载中...' : '加载更多...'}}</p>
      </div>
    </div>
    </div>
    </div>

    <div class="feed-add-container">
      <router-link class="feed-add-btn" :to="{name: 'feed_add'}"><i class="fa fa-pencil"></i> 发圈子 </router-link>
    </div>

    <tabbar active="feed"></tabbar>
  </div>
</template>

<script>
import { Loading } from '@/components'
import Tabbar from '../Tabbar'
import api from '@/api'
import NewMessage from './new-message'
import FeedListItem from './list-item'

export default {
  components: {
    Tabbar,
    Loading,
    NewMessage,
    FeedListItem
  },
  data: () => ({
    storage: {}, // 存储不同分类类别的数据
    currentData: {},
    isLoading: false,
    isError: false,
    page: 1,
    list: null,
    adv: null,
    infiniteLoading: false,
    noMoreData: false,
    isScrolling: false
  }),

  methods: {
    initData (val) {
      this.renderData()
      if (!this.list) this.getList() // 获取数据
    },

    // 渲染数据
    renderData () {
      let type = this.$route.query.type || 'default' // 当前分类
      this.currentData = this.storage[type] || {}
      this.list = this.currentData.list ? this.currentData.list : null
    },

    // 暂存数据
    saveData (list = [], type = 'default', page = 1, more = true) {
      if (this.storage[type] && this.storage[type].list) {
        for (let item of list) {
          this.storage[type].list.push(item)
        }
        this.storage[type].page = page
      } else {
        this.storage[type] = {
          list: list,
          page: page,
          more: more
        }
      }
    },

    // 插入新数据到暂存
    insertData (list = [], type = 'default', page = 1, more = true) {
      if (this.storage[type] && this.storage[type].list) {
        for (let item of list) {
          this.storage[type].list.push(item)
        }
        this.storage[type].page = page
      } else {
        this.storage[type] = {
          list: list,
          page: page,
          more: more
        }
      }
    },

    // 刷新数据
    refreshData () {
      let type = this.$route.query.type || 'default' // 当前分类
      this.currentData = this.storage[type] = {}
      this.getList()
    },

    // 从服务端获取数据
    getList () {
      this.isLoading = true
      let params = {
        type: this.$route.query.type || undefined,
        page: this.currentData.page > 0 ? this.currentData.page : undefined
      }
      this.axios.get(api.feed.list, {params: params})
      .then(response => {
        this.isLoading = false
        if (response.status === 200 && response.data.code === 1) {
          this.saveData(response.data.data.list, params.type, params.page)
          this.renderData()
        }
      })
      .catch(error => {
        this.isError = true
        this.isLoading = false
        return Promise.reject(error)
      })
    },

    // 路由跳转
    onRouteChange () {
      this.query = this.$route.query
      this.noMoreData = false
      this.initData()
    },

    // 加载更多
    infinite () {
      this.infiniteLoading = true
      let params = {
        type: this.$route.query.type || undefined,
        page: this.currentData.page + 1
      }
      this.axios.get(api.feed.list, {params: params})
      .then(response => {
        this.infiniteLoading = false
        if (response.status === 200 && response.data.data.list && response.data.data.list.length > 0) {
          this.insertData(response.data.data.list, params.type, params.page)
          this.renderData()
        } else {
          this.noMoreData = true
        }
      })
      .catch(error => {
        this.isError = true
        this.isLoading = false
        this.infiniteLoading = false
        return Promise.reject(error)
      })
    },

    // 滚动监控
    onScroll (e) {
      if (this.isLoading || this.noMoreData || this.infiniteLoading || this.isError) {
        return
      }
      let outerHeight = this.$refs.scrollContainer.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$refs.scrollContainer.scrollTop
      let bottom = innerHeight - outerHeight - scrollTop
      if (innerHeight > outerHeight && bottom <= 0) {
        this.isScrolling = true
        this.infinite()
      } else {
        this.isScrolling = false
      }
    }
  },
  mounted () {
    this.initData()
  },
  watch: {
    '$route.query.type': 'onRouteChange'
  }
}
</script>

<style>
.feed-list::after{
  content:  " ";
  clear: both;
}
</style>

