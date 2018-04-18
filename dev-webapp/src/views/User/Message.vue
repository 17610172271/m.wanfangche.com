<template>
  <div class="my-message-container">
    <navheader>我的消息</navheader>
    <div class="my-message" v-show="data">
      <router-link :to="{name: 'messages_comments', query: {type: 1}}" class="message-comments message-item clear block">
        <div class="message-item-icon pull-left"><i class="fd-comment text-xxlg text-normal"></i></div>
        <div class="message-item-text text-lg text-normal pull-left">评论</div>
        <div class="message-item-num pull-right"><span class="notice-num" v-show="data.comment_num > 0">{{data.comment_num}}</span><span class="icon-input-expansion"></span></div>
      </router-link>
      <router-link :to="{name: 'messages_thumb', query: {type: 1}}" class="message-thumb message-item clear block">
        <div class="message-item-icon pull-left"><i class="fd-thumb-o-up text-xxlg"></i></div>
        <div class="message-item-text text-lg text-normal pull-left">赞</div>
        <div class="message-item-num pull-right"><span v-show="this.data.credit_num > 0" class="notice-point"></span><span class="icon-input-expansion"></span></div>
      </router-link>
      <router-link :to="{name: 'messages_notice'}" class="message-notice message-item clear block">
        <div class="message-item-icon pull-left"><i class="fd-thumb-o-up text-xxlg"></i></div>
        <div class="message-item-text text-lg text-normal pull-left">通知</div>
        <div class="message-item-num pull-right"><span class="notice-num" v-show="data.notify_num > 0">{{data.notify_num}}</span><span class="icon-input-expansion"></span></div>
      </router-link>
    </div>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
// import { mapGetters } from 'vuex'
import api from '@/api'

export default {
  components: {
    Navheader
  },
  data: () => ({
    data: ''
  }),
  // computed: mapGetters({
  //   currentUser: 'currentUser'
  // }),
  methods: {
    initData () {
      this.axios.get(api.user.notifyNum)
      .then(response => {
        if (response.data.code === 1) {
          this.data = response.data.data
        }
      })
    }
  },
  mounted () {
  },
  created () {
    this.initData()
  }
}
</script>
