<template>
  <div>
    <!-- 列表 -->
    <faq-list v-show="action==='list'"></faq-list>
    <!-- /列表 -->

    <!-- 详情 -->
    <faq-detail v-if="action==='detail'"></faq-detail>
    <!-- /详情 -->

    <!-- 发布 -->
    <faq-add v-show="action==='add'"></faq-add>
    <!-- /发布 -->

  </div>
</template>

<script>
import FaqList from './list'
import FaqDetail from './detail'
import FaqAdd from './add'
import store from '@/store'

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
    FaqList,
    FaqDetail,
    FaqAdd
  },
  data: () => ({
    action: 'list',
    scrollVal: 0,
    addShow: true,
    time: null
  }),
  methods: {
    onRouteChange () {
      this.action = this.$route.query.action ? this.$route.query.action : 'list'
    },
    doScroll () {
      let self = this
      clearTimeout(this.time)
      let scrollValue = document.getElementsByClassName('app-container')[0].scrollTop
      if (this.scrollVal < scrollValue) {
        this.addShow = false
      } else if (this.scrollVal > scrollValue) {
        this.addShow = false
      }
      this.scrollVal = scrollValue
      this.time = setTimeout(function () {
        self.addShow = true
      }, 300)
    }
  },
  mounted () {
    document.getElementsByClassName('app-container')[0].addEventListener('scroll', this.doScroll)
  },
  created () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.action = this.$route.query.action || 'list'
    } else {
      window.location.href = 'https://www.wanfangche.com/qa'
    }
  },
  watch: {
    '$route': 'onRouteChange'
  }
}
</script>
