<template>
  <div>
     <scroll class="app-container" v-model="list" ref="scrollComponent" key="feed-list"> 
      <feed-list-item v-model="list"></feed-list-item>
    </scroll>
  </div>
</template>

<script>
import api from '@/api'
import Scroll from '@/template/scroll'
import FeedListItem from '../feed/list-item'

export default {
  components: {
    Scroll,
    FeedListItem
  },
  data: () => ({
    list: []
  }),
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
      })
    },

    // 初始化用户信息
    initUser () {

    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initData()
    })
  }
}
</script>
