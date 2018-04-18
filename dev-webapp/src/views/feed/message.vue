<template>
  <div>
    <navheader>新消息</navheader>
    <div class="app-container app-container-top bg-white">
      <div>
        <ul class="list-group list-group-unstyle bg-white">
          <li  v-for="(item, index) in list" :key="index" class="text-normal list-group-item">
          <router-link v-if="item.type === 3" class="block text-normal" :to="{name: 'feed_detail', params: {id: item.post.id}, query:{scrollTo: 'comments'}}">
            <div class="block clear">
              <div class="pull-left thumb-sm thumb-circle"><img  v-if="item.user && item.user.avatar" :src="item.user.avatar | ossResize('avatar')"></div>
              <div class="media-body">
                <div class="text-bold">{{item.user ? item.user.nickname : '车友'}}</div> 
                <div class="block m-t-sm  text-normal text-lg text-content">
                  <text-view v-model="item.content" :length="50" type="plain"></text-view>
                </div>
                <div class="text-muted text-small">{{item.publish_time}} 评论了您的帖子</div> 
              </div>
            </div>
          </router-link>
          <router-link v-if="item.type === 6" class="block text-normal" :to="{name: 'faq', query: {id: item.post.id, action: 'detail'}}">
            <div class="block clear">
              <div class="pull-left thumb-sm thumb-circle"><img  v-if="item.user && item.user.avatar" :src="item.user.avatar | ossResize('avatar')"></div>
              <div class="media-body">
                <div class="text-bold">{{item.user ? item.user.nickname : '车友'}}</div> 
                <div class="block m-t-sm  text-normal text-lg text-content">
                  <text-view v-model="item.content" :length="50" type="plain"></text-view>
                </div>
                <div class="text-muted text-small">{{item.publish_time}} 回答了您的问题</div> 
              </div>
            </div>
          </router-link>
           <router-link v-if="item.type === 8" class="block text-normal" :to="{name: 'u_home', params:{u_id: item.user.user_id}}">
            <div class="block clear">
              <div class="pull-left thumb-sm thumb-circle"><img  v-if="item.user && item.user.avatar" :src="item.user.avatar | ossResize('avatar')"></div>
              <div class="media-body">
                <div class="text-bold">{{item.user ? item.user.nickname : '车友'}} 刚刚关注了您</div> 
                <div class="block m-t-sm  text-normal text-lg text-content">
                  <text-view v-model="item.content" :length="50" type="plain"></text-view>
                </div>
                <div class="text-muted text-small">{{item.publish_time}}</div> 
              </div>
            </div>
          </router-link>
          <router-link v-if="item.type === 9" class="block text-normal" :to="{name: 'feed_detail', params: {id: item.post.id}, query:{scrollTo: 'thumbup'}}">
            <div class="block clear">
              <div class="pull-left thumb-sm thumb-circle"><img  v-if="item.user && item.user.avatar" :src="item.user.avatar | ossResize('avatar')"></div>
              <div class="media-body">
                <div class="text-bold">{{item.user ? item.user.nickname : '车友'}}</div> 
                <div class="block m-t-sm  text-normal text-lg text-content">
                  <text-view v-model="item.content" :length="50" type="plain"></text-view>
                </div>
                <div class="text-muted text-small">{{item.publish_time}}</div> 
              </div>
            </div>
          </router-link>
          </li>
        </ul>
      </div>
      <div class="wrapper">
        <router-link class="btn btn-block text-normal" :to="{name: 'user_message'}">更多历史消息</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navheader from '../Common/Navheader'
import { mapGetters } from 'vuex'
import api from '@/api'
import {TextView} from '@/components'

export default {
  components: {
    Navheader,
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
      this.getList()
    },
    getList () {
      this.axios.get(api.feed.myMessage, {params: {
        id: this.currentUser.user_id,
        page: 1,
        size: this.$route.query.number
      }})
      .then(response => {
        this.list = response.data.data.list
      })
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
