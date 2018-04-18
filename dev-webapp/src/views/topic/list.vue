<template>
  <div>
    <nav-header>{{topic.title ? '#' + topic.title + '#' : '话题'}}</nav-header>
    <scroll class="app-container app-container-top" v-model="list" ref="scrollComponent" key="feed-list"> 
      <feed-list-item v-model="list"></feed-list-item>
    </scroll>
  </div>
</template>

<script>
import NavHeader from '../Common/Navheader'
import Scroll from '@/template/scroll'
import FeedListItem from '../feed/list-item'

import api from '@/api'

export default {
  components: {
    Scroll,
    NavHeader,
    FeedListItem
  },
  data: () => ({
    list: [],
    topic: {}
  }),
  methods: {
    initData () {
      this.getDetail()
      this.initScroll()
    },

    // 话题详情
    getDetail () {
      this.axios.get(api.topic.detail, {params: {
        id: this.$route.params.id
      }})
      .then(response => {
        if (response.data && response.data.code === 1) {
          this.topic = response.data.data
        }
      })
    },

    initScroll () {
      console.log('init scroll')
      this.$refs.scrollComponent.init({
        api: api.topic.feed,
        params: {
          id: this.$route.params.id
        },
        response: 'data.data.list'
      })
    }
  },

  mounted () {
    this.initData()
  },
  // for keep-alive
  activated () {
    console.log('init topic')
    this.initData()
  }
}
</script>
