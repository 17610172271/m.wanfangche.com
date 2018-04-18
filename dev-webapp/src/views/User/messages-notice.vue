<template>
  <div class="notice-container">
    <div class="message-header">
      <navheader>通知</navheader>
    </div>
    <scroll v-model="list" ref="scrollComponent">
      <div class="message-content">
        <div class="message-content-item" v-for="item in list">

          <!-- 关注问题 -->
          <div class="message-send-type1"  v-if="item.type==1">
            <div class="author-infos clear" @click="userLink(item)">
              <div class="author-infos-avatar pull-left"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
              <div class="author-infos-info pull-left">
                <div class="author-infos-name text-md text-bold over-omit">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
              </div>
            </div>
            <div class="message-comment-content text-lg" @click="goLink(item)">{{item.content}}</div>
            <div class="message-notice-content" @click="goLink(item)">
              <div class="text-danger text-xxlg pos-ab10">
                <i class="fd-question"></i>
              </div>
              <div class="message-notice-text tag-color">{{item.post.content | sub}}</div>
            </div>
          </div>

          <!-- 关注用户 -->
          <div class="message-send-type1"  v-if="item.type==2" @click="userLink(item)">
            <div class="author-infos clear">
              <div class="author-infos-avatar pull-left"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
              <div class="author-infos-info pull-left">
                <div class="author-infos-name text-md text-bold over-omit">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
              </div>
            </div>
            <div class="message-comment-content text-lg">{{item.content}}</div>
          </div>

          <!-- 回答问题 -->
          <div class="message-send-type1"  v-if="item.type==3">
            <div class="author-infos clear" @click="userLink(item)">
              <div class="author-infos-avatar pull-left"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
              <div class="author-infos-info pull-left">
                <div class="author-infos-name text-md text-bold over-omit">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
              </div>
            </div>
            <div class="message-comment-content text-lg" @click="goLink(item)">{{item.content}}</div>
            <div class="message-notice-content" @click="goLink(item)">
              <div class="text-danger text-xxlg pos-ab10">
                <i class="fd-question"></i>
              </div>
              <div class="message-notice-text tag-color">{{item.post.content | sub}}</div>
            </div>
          </div>

          <!-- 官方圈子通知 -->
          <div class="message-send-type1"  v-if="item.type==4">
            <div class="author-infos clear" @click="userLink(item)">
              <div class="author-infos-avatar pull-left"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
              <div class="author-infos-info pull-left">
                <div class="author-infos-name text-md text-bold over-omit">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
              </div>
            </div>
            <div class="message-comment-content text-lg" @click="goLink(item, 1)">{{item.content}}</div>
            <div class="message-comment-info" @click="goLink(item, 1)">
              <div class="message-comment-img pull-left">
                <img :src="item.post.imgpath | ossResize('small')" width="100%" alt="">
              </div>
              <div class="message-item-info">
                <div class="text-md m-b-6 text-bold" v-if="item.post.author">{{item.post.author.nickname}}</div>
                <div class="tag-color text-sm message-item-content">{{item.post.content | sub}}</div>
              </div>
            </div>
          </div>

          <!-- 系统关闭通知 -->
          <div class="message-send-type1"  v-if="item.type==5">
            <div class="author-infos clear" @click="userLink(item)">
              <div class="author-infos-avatar pull-left"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
              <div class="author-infos-info pull-left">
                <div class="author-infos-name text-md text-bold over-omit">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
              </div>
            </div>
            <div class="message-comment-content text-lg">{{item.content}}</div>
          </div>

        </div>
      </div>
    </scroll>
    </div>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import api from '@/api'
import Scroll from '@/template/scroll'
import Gender from '@/components/gender'

export default {
  components: {
    Navheader,
    Scroll,
    Gender
  },
  data: () => ({
    list: [],
    page: 1,
    size: 20
  }),
  filters: {
    sub: str => {
      return str.length > 40 ? str.substr(0, 40) + '...' : str
    }
  },
  methods: {
    initData () {
      this.getData(5)
    },
    getData (type) {
      if (this.$refs.scrollComponent) {
        this.$refs.scrollComponent.init({
          api: api.user.notifyList,
          params: {
            type: type,
            page: this.page,
            size: this.size
          },
          response: 'data.data.list'
        })
      }
      // this.axios.get(api.user.notifyList, {
      //   params: {
      //     type: type,
      //     page: this.page,
      //     size: this.size
      //   }
      // })
      // .then(response => {
      //   if (response.data.code === 1) {
      //     this.list = response.data.data.list
      //     this.list.map(val => {
      //       if (val.post && val.post.content.length > 40) {
      //         val.post.content = val.post.content.substr(0, 40) + '...'
      //       }
      //     })
      //   } else {
      //     this.list = []
      //   }
      // })
    },
    goLink (item, type) {
      if (type === 1) {
        this.$router.push({name: 'feed_detail', params: {id: item.post.id}})
      } else if (!type) {
        this.$router.push({name: 'faq', query: {id: item.post.id, action: 'detail'}})
      }
    },
    userLink (item) {
      this.$router.push({name: 'u_home', params: {u_id: item.author.id}})
    }
  },
  mounted () {
    this.initData()
  },
  created () {
    this.initData()
  }
}
</script>
