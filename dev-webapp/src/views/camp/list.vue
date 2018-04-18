<template>
  <div class="com-list">
    <navheader>评论</navheader>
    <scroll-refresh :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="com-list com-lists" style="padding-bottom:20px;">
        <div class="camp-comments-item" v-for="item in commentList">
          <div class="camp-comments-avatar">
            <img :src="item.author.avatar | ossResize('avatar')" alt="">
          </div>
          <div class="camp-comments-infos">
            <div class="camp-comments-info text-md text-bold"><span class="camp-comments-name">{{item.author.nickname}}</span>
                <span class="pull-right camp-detail-thumb" :class="{'lileactive': item.is_credit}" @click="likeBtn(item)">
                  <span class="fd-thumb-o-up" :class="{'active': item.is_credit}"></span> 
                  <span class="text-center camp-detail-thumbnum text-light" v-show="item.credit_num > 0">{{item.credit_num}}</span>
                  <span class="text-center camp-detail-thumbnum camp-detail-thumbnum1 text-sm text-light" v-show="item.credit_num == 0">赞</span>
                </span>
            </div>
            <router-link :to="{name: 'comment-info', params: {id: item.id}, query: {camp_id: camp_id}}">
            <div class="camp-comments-content text-md">{{item.content}}</div>
             <div class="camp-comments-img text-md" v-show="item.imgpath.length > 0">
              <div v-for="src in item.imgpath" class="m-t-8">
                <img :src="src | ossResize('small')" alt="">
              </div>
            </div>
            <div class="camp-comments-others text-sm">
              <span class="camp-xing" v-show="item.score > 0">
                <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.score}"></i>
              </span> <span>{{item.publish_time}} · </span><span>回复TA</span>
            </div>
            <div class="camp-comments-reply" v-if="item.reply">
              <div class="camp-reply-item text-md" v-for="items in item.reply">
                <span class="text-bolder">{{items.author.nickname}}:</span>
                <span>{{items.content}}</span>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </scroll-refresh>
    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">
      {{dealTxt}}
    </popup>
  </div>
</template>

<script>
import api from '@/api'
import { Popup } from 'vux'
import Navheader from '../Common/Navheader'
import ScrollRefresh from '@/components/Refresh'
export default {
  components: {
    Navheader,
    Popup,
    ScrollRefresh
  },
  data () {
    return {
      commentList: [],
      commentSize: 0,
      xing: [1, 2, 3, 4, 5],
      isAlert: false,
      dealTxt: '',
      listPage: 1,
      camp_id: 0
    }
  },
  methods: {
    getComment () {
      this.camp_id = this.$route.params.id
      this.axios.get(api.camp.replyList, {params: {id: this.$route.params.id, page: 1, size: 10}})
      .then(response => {
        if (response.data.code === 1) {
          this.commentList = response.data.data.list
          this.commentSize = response.data.data.count
          for (var key of this.commentList) {
            if (key.reply && key.reply.length > 3) {
              key.reply = key.reply.slice(0, 3)
            }
            if (key.imgpath) {
              console.log(key.imgpath)
              key.imgpath = key.imgpath.split(',')
            }
          }
        }
      })
    },
    init () {
      this.getComment()
    },
    onRefresh () {
      this.$router.go('')
    },
    onInfinite (done) {
      this.listPage++
      this.axios.get(api.camp.replyList, {params: {size: 10, page: this.listPage}})
      .then(response => {
        if (response.data.code === 1) {
          if (response.data.data.list) {
            let list = response.data.data.list
            for (var key of list) {
              if (key.reply && key.reply.length > 3) {
                key.reply = key.reply.slice(0, 3)
              }
            }
            this.commentList.push.apply(this.list, list)
            done()
          } else {
            done(true)
          }
        }
      })
    },
    likeBtn (item) {
      if (item.is_credit) {
        this.axios.post(api.camp.replyCredit, {id: item.id})
        .then(response => {
          if (response.data.code === 1) {
            item.is_credit = false
            this.isAlert = true
            item.credit_num--
            this.dealTxt = '点赞已取消'
          }
        })
      } else {
        this.axios.post(api.camp.replyCredit, {id: item.id})
        .then(response => {
          if (response.data.code === 1) {
            item.is_credit = true
            this.isAlert = true
            item.credit_num++
            this.dealTxt = '点赞成功'
          }
        })
      }
    }
  },
  created () {
    this.init()
  },
  watch: {
    isAlert (val) {
      if (val) {
        setTimeout(() => {
          this.isAlert = false
        }, 1000)
      }
    }
  }
}
</script>
