<template>
  <div class="user-feed">
      <navheader>我的房车圈</navheader>
      <scroll
      class="app-container app-container-top"
      v-model="list"
      ref="scrollComponent"
      > 
      <div class="app-wrapper bg-white">
        <router-link :to="{name: 'feed_detail', params: {id: item.id}}" class="clear block panel wrapper text-normal" v-for="(item, index) in list" :key="index">
          <div class="media">
            <div class="pull-left text-center">
              <span class="text-slg">{{item.publish_date | format('DD')}}</span>
              <span>{{item.publish_date | format('MM月')}}</span>
            </div>
            <div class="img-sm pull-left" v-if="item.img[0]"><img :src="item.img[0] | ossResize('small')"></div>
            <div class="media-body">
              <div class="" v-html="item.content"></div>
              <!-- 分享 -->
              <router-link :to="{name: 'camp_detail', params: {id: item.camp_detail.cid}}" class="feed-share" v-if="item.type==2">
                <div class="pull-left share-info-img m-r"><img :src="item.camp_detail.imgpath | ossResize('small')" width="100%"></div>
                  <div class="camp-list-item">
                   <div class="text-md text-bolder share-info-name">{{item.camp_detail.name}}</div>
                   <div class="text-muted m-b-sm share-info-others">
                    <p class="camp-xing">
                      <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.camp_detail.score}"></i>
                    </p>
                    <span v-if="item.camp_detail.price === -2">不详</span>
                    <span v-else-if="item.camp_detail.price === -1">免费</span>
                    <span v-else>{{item.camp_detail.price}}<span v-if="item.camp_detail.price !== -1 && item.camp_detail.price !== -2"><span v-if="item.camp_detail.type === 3">元/人</span><span v-else>元/起</span></span></span>
                  </div>
                  <div>
                    <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.camp_detail.type==1, 'color-park2': item.camp_detail.type==0, 'color-scenic2': item.camp_detail.type==2, 'color-food2': item.camp_detail.type==3, 'color-fix2': item.camp_detail.type==4, 'color-refuel2': item.camp_detail.type==5}"><span :class="{'icon-camp-camp': item.camp_detail.type==1, 'icon-camp-park': item.camp_detail.type==0, 'icon-camp-scenic': item.camp_detail.type==2, 'icon-camp-food': item.camp_detail.type==3, 'icon-camp-service': item.camp_detail.type==4, 'icon-camp-station': item.camp_detail.type==5}"></span></div>
                    <div class="camp-level-txts camp-norm" :class="{'color-camp1': item.camp_detail.type==1, 'color-park1': item.camp_detail.type==0, 'color-scenic1': item.camp_detail.type==2, 'color-food1': item.camp_detail.type==3, 'color-fix1': item.camp_detail.type==4, 'color-refuel1': item.camp_detail.type==5}">
                      {{item.camp_detail.type | camptype}}
                    </div>
                  </div>
                </div>
              </router-link>
              <!-- /分享 -->
            </div>
          </div>
        </router-link>
      </div>
      </scroll>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import FeedListItem from '../feed/list-item'
import { mapGetters } from 'vuex'
import Scroll from '@/template/scroll'
import api from '@/api'
import format from '@/tools/date/format'

export default {
  components: {
    Navheader,
    Scroll,
    FeedListItem
  },
  filters: {
    format: format
  },
  data: () => ({
    list: [],
    xing: [1, 2, 3, 4, 5]
  }),
  computed: mapGetters({
    currentUser: 'currentUser'
  }),
  methods: {
    initData () {
      this.$refs.scrollComponent.init({
        api: api.feed.myFeed,
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
