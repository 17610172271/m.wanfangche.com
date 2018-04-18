<template>
  <div>
      <navheader>我关注的</navheader>
    <scroll
      class="app-container app-container-top  bg-light"
      v-model="list"
      ref="scrollComponent"
      > 
        <!-- 导航 -->
        <div class="block">
          <faq-nav></faq-nav>
        </div>
        <!-- /导航 -->

        <!-- 我关注的 -->
        <div class="" id="my-question">
          <div class="panel wrapper block clear" v-for="item in list">
            <router-link :to="{name: 'faq', query: {id: item.id, action: 'detail'}}" class="block text-normal">
              <div class="text-lg "><i class="fd-question text-info"></i><span class="m-l-sm">{{item.title}}</span></div>
              <div class="text-muted-lt padder-v">
                <text-view v-model="item.content" type="plain" :length="140">{{item.content}}</text-view>
              </div>
            </router-link>
            <div class="text-muted">
              <span class="pull-right">{{item.publish_time}}</span>
              <div class="">
                <span>阅读 {{item.read_num}}</span>
                <span> · </span>
                <span>回答 {{item.reply_num}}</span>
                <span> · </span>
                <span>关注 {{item.digg_num}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- /我关注的 -->
      </scroll>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import { mapGetters } from 'vuex'
import Scroll from '@/template/scroll'
import api from '@/api'
import FaqNav from './faq-nav'
import { TextView } from '@/components'

export default {
  components: {
    Navheader,
    Scroll,
    FaqNav,
    TextView
  },
  data: () => ({
    list: []
  }),
  computed: mapGetters({
    currentUser: 'currentUser'
  }),
  methods: {
    initData () {
      this.$refs.scrollComponent.init({
        api: api.feed.myFaq,
        params: {
          id: this.currentUser.user_id
        },
        response: 'data.data.list'
      })
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
