<template>
  <div class="feed-list-container">
    <scroll class="app-container app-container-top app-container-bottom" v-model="list" ref="scrollComponent" key="feed-list"> 
      <!-- 新消息提醒 -->
      <!-- <new-message></new-message> -->
      <!-- /新消息提醒 -->
      
      <feed-list-item class="m-t" v-model="list"></feed-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/template/scroll'
import NewMessage from './new-message'
import FeedListItem from './list-item'

import api from '@/api'

export default {
  components: {
    Scroll,
    NewMessage,
    FeedListItem
  },

  props: {
    type: {
      type: String
    }
  },

  data: () => ({
    list: []
  }),

  methods: {
    initData () {
      this.$refs.scrollComponent.init({
        api: api.feed.list,
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

