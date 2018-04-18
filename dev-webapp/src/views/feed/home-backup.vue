<template>
  <div>
    <!-- 列表 -->
    <feed-list v-show="action==='list'"></feed-list>
    <!-- /列表 -->

    <feed-recent v-show="action === 'recent'"></feed-recent>

    <!-- 详情 -->
    <feed-detail v-show="action==='detail'"></feed-detail>
    <!-- /详情 -->

    <!-- 发布 -->
    <!-- <feed-add v-show="action==='add'"></feed-add> -->
    <!-- /发布 -->

  </div>
</template>

<script>
import FeedList from './list'
import FeedDetail from './detail'
import FeedAdd from './add'
import store from '@/store'
import FeedRecent from './recent'

export default {
  // 路由更新时判断登录状态
  beforeRouteUpdate (to, from, next) {
    if (to.query.action === 'add' && !store.getters.isLoggedin) {
      next({
        path: '/login', // 未登录时跳转到该页面
        query: { from: to.fullPath }
      })
    } else {
      next()
    }
  },
  components: {
    FeedList,
    FeedDetail,
    FeedAdd,
    FeedRecent
  },
  data: () => ({
    action: 'list'
  }),
  methods: {
    onRouteChange () {
      this.action = this.$route.query.action ? this.$route.query.action : 'list'
    }
  },
  created () {
    this.action = this.$route.query.action || 'list'
  },
  watch: {
    '$route': 'onRouteChange'
  }
}
</script>
<style>
</style>
