<template>
  <div>
      <navheader>粉丝</navheader>
      <scroll
      class="app-container app-container-top"
      v-model="list"
      ref="scrollComponent"
      > 
        <ul class="list-group list-group-unstyle bg-white">
          <li class="list-group-item" v-for="(item, index) in list" :key="index" v-if="item.id > 0">
          <router-link class="block text-normal" :to="{name: 'u_home', params:{u_id: item.id}}">
          <div class="pull-right text-muted text-sm padder-v">{{item.relation}}</div>

            <div class="relative">
              <div class="is-certify" v-if="item.isrv == 1">
                <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
              </div>
              <div class="pull-left thumb-sm thumb-circle"><img  v-if="item.avatar" :src="item.avatar | ossResize('avatar')"></div>
              <div class="media-body">
                <div class="text-bold padder-v">{{item.nickname || '车友'}}<gender v-model="item.sex"></gender></div> 
              </div>
            </div>
          </router-link>
          </li>
        </ul>
      </scroll>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import { mapGetters } from 'vuex'
import Scroll from '@/template/scroll'
import api from '@/api'
import { Gender } from '@/components'

export default {
  components: {
    Navheader,
    Scroll,
    Gender
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
        api: api.feed.userFans,
        params: {
          id: this.$route.params.u_id,
          size: 20
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
