<template>
  <div class="feed-lists">
  <div class="feed-list-item no-radius" v-for="(item, index) in list" v-if="item" @click="onItemClick($event, item)">

    <!-- feed heading -->
    <div class="media" v-if="item.author">
      <div class="text-normal relative" @click.stop="userLink(item)">
        <div class="pull-left avatar m-r avatar-lg avatar-circle" :class="{'bg-color': !item.author.avatar}">
          <img :src="item.author.avatar | ossResize('avatar')">
        </div>
        <div class="is-certify" v-if="item.author.isrv == 1">
          <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
        </div>
      </div>
      <div class="media-body">
        <div class="pull-right text-center text-muted" v-if="currentUser.user_id && currentUser.user_id != item.author.id">
          <a class="btn btn-follow" :class="{'feed-followed': item.author.is_follow==1}" v-if="item.author.is_follow == 0" @click.stop="doFollow(item)">
            <!-- <i class="fa fa-plus"></i> -->
          关注</a>
          <a class="btn btn-follow" :class="{'feed-followed': item.author.is_follow==2}" v-if="item.author.is_follow == 2" @click.stop="doFollow(item)">
            <!-- <i class="fa fa-plus"></i> -->
          已关注</a>
        </div>
        <div class="text-normal feed-list-name1" @click.stop="userLink(item)">
          <div class="text-bolder text-md">{{item.author.nickname || '车友'}}<gender v-model="item.author.sex"></gender></div>
          <div class="text-muted text-small m-t-3">{{item.publish_time || item.publish_date}}</div>
        </div>
      </div>
    </div>
    <!-- /feed heading -->

    
    <!-- feed body -->
    <div class="feed-content block" v-if="item.content" @click="onItemClick($event, item)">
      <feed-content class="text-lg m-t-sm text-normal" type="plain" :length="140" v-model="item.content"></feed-content>
      <!-- <span class="text-lg m-t-sm text-normal" v-html="parseContent(item.content)"></span> -->
      <a v-if="item.content.length >= 103">全文</a>
    </div>
    
    <!-- 分享 -->
    <div class="feed-share-container" v-if="item.type == 2 || item.type == 1">
      <div class="feed-share no-radius" @click.stop="campLink(item)">
        <div class="pull-left share-info-img m-r feed-item-camp"><img :src="item.camp_detail.imgpath | ossResize('small')" width="100%"></div>
          <div class="camp-list-item">
           <div class="text-md text-bolder share-info-name over-omit">{{item.camp_detail.name}}</div>
           <div class="text-muted share-info-others m-b-3" style="overflow:hidden;">
            <p class="camp-xing">
              <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.camp_detail.score}"></i>
            </p>
            <span v-if="item.camp_detail.price === -2">不详</span>
            <span v-else-if="item.camp_detail.price === -1">免费</span>
            <span v-else>{{item.camp_detail.price}}<span v-if="item.camp_detail.price !== -1 && item.camp_detail.price !== -2"><span v-if="item.camp_detail.type === 3">元/人</span><span v-else>元/起</span></span></span>
          </div>
          <div style="overflow:hidden;">
            <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.camp_detail.type==1, 'color-park2': item.camp_detail.type==0, 'color-scenic2': item.camp_detail.type==2, 'color-food2': item.camp_detail.type==3, 'color-fix2': item.camp_detail.type==4, 'color-refuel2': item.camp_detail.type==5}"><span :class="{'icon-camp-camp': item.camp_detail.type==1, 'icon-camp-park': item.camp_detail.type==0, 'icon-camp-scenic': item.camp_detail.type==2, 'icon-camp-food': item.camp_detail.type==3, 'icon-camp-service': item.camp_detail.type==4, 'icon-camp-station': item.camp_detail.type==5}"></span></div>
            <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': item.camp_detail.type==1, 'color-park1': item.camp_detail.type==0, 'color-scenic1': item.camp_detail.type==2, 'color-food1': item.camp_detail.type==3, 'color-fix1': item.camp_detail.type==4, 'color-refuel1': item.camp_detail.type==5}">
              {{item.camp_detail.scale}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /分享 -->

    <!-- Video -->
    <div class="text-center video-padder" v-if="item.video">
      <video-view :src="item.video" allowfullscreen></video-view>
    </div>
    <!-- /Video -->


    <router-link :to="{name: 'feed_detail', params: {id: item.id}}" class="block" :class="{'p-t-4':item.video,'p-b-4':item.video}" v-if="item.img.length > 0">
      <div v-if="item.video">
        <div class="img-full img-cover" v-if="item.img && item.img.length < 2 && item.img[0]">
          <img :src="item.img[0] | ossResize('middle')">
        </div>
        <div class="clear feed-item-imgs" v-if="item.img.length > 1 && item.img.length < 4">
          <a class="col-xs-4" v-for="(image, index) in item.img" style="overflow:hidden;">
            <div class="row thumb-feed-img" v-if="image">
              <img class="preview-img" style="height:auto;" :src="image | ossResize('small')" alt="">
            </div>
          </a>
        </div>
        <div class="clear feed-item-imgs" v-if="item.img.length > 3">
          <a class="col-xs-4" v-for="(image, index) in item.imgs" style="overflow:hidden;">
            <div class="row thumb-feed-img" v-if="image">
              <img class="preview-img" style="height:auto;" :src="image | ossResize('small')" alt="">
            </div>
          </a>
          <a class="col-xs-4 feed-item-img" style="overflow:hidden;">
            <div class="row thumb-feed-img feed-img-text">
              <div class="feed-img-modal">+{{item.img.length-3}}</div>
            </div>
          </a>
        </div>
      </div>
      <div v-if="!item.video" :class="{'p-t-4': item.img.length==1, 'p-b-4': item.img.length==1}">
        <div class="img-full img-cover" v-if="item.img && item.img.length < 2 && item.img[0]">
          <img :src="item.img[0] | ossResize('middle')">
        </div>
        <div class="clear feed-item-imgs" v-if="item.img.length > 1">
          <a class="col-xs-4" v-for="(image, index) in item.img" style="overflow:hidden;">
            <div class="row thumb-feed-img1" v-if="image">
              <img class="preview-img" style="height:auto;" :src="image | ossResize('small')" alt="">
            </div>
          </a>
        </div>
      </div>
      <!-- <image-group :list="item.img" :col="3"></image-group> -->
    </router-link>
    <!-- /feed-body -->

    <div class="block p-t-4 p-b-4" v-if="item.address">
      <a href="javascript:;" @click.stop="locationLink(item)" class="location-show font-12 over-omit">
        <i class="fa icon-camp-address m-r"></i>{{item.address}}
      </a>
    </div>
    
    <!-- feed footer -->
     <div class="clear block feed-item-candle m-t-8">
      <div class="btn-group pull-right m-t-8 text-muted m-r--12">
        <router-link :to="{name: 'feed_detail', params: {id: item.id}}" class="table-box text-xlg btn text-muted text-top p-r-0">
          <i class="text-xlg fd-comment table-cell "></i>
          <span class="text-md table-cell padder-xs no-line-height p-r-0 comment-width">{{item.reply_num || ''}}</span>
        </router-link>
        <a @click.stop="thumbUp(item)" class="btn  no-hover table-box"  :class="item.is_follow === 1 ? 'text-default' : 'text-muted'">
          <i class="text-xlg table-cell" :class="item.is_follow ? 'fd-thumb-up' : 'fd-thumb-o-up'"></i>
          <span class="text-md table-cell padder-xs no-line-height" v-show="item.credit_num!=0">{{(item.credit_num && item.credit_num > 0) ? item.credit_num : ''}}</span>
        </a>
       </div>
       <div class="m-t-12 text-muted">
        <span class="m-r text-md">{{item.read_num}}次浏览</span>
       </div>
     </div>
     <!-- /feed footer -->

     <!-- 评论 -->
     <div class="feed-comment-list m-t-sm" v-if="item.post_content && item.post_content.length > 0">
       <router-link :to="{name: 'feed_detail', params: {id: item.id}}" class="block text-normal">
         <div v-for="(comment,index) in item.post_content" class="feed-comment-item" :class="{'p-b-0': index==(item.post_content.length-1)}">
          <div v-if="comment.author" class="pull-left avatar-circle avatar-xs">
            <img :src="comment.author.avatar | ossResize('avatar')"> 
          </div>
          <div class="media-body">
            <span class="text-lt text-bold">{{comment.author.nickname}}</span>:
            <text-view v-model="comment.content" :length="100"></text-view>
          </div>
         </div>
         <div class="padder-v-sm p-t-7" :class="{'p-t-4':item.reply_num < 4,'p-b-4':item.reply_num < 4}">
           <router-link v-if="item.reply_num > 3" :to="{name: 'feed_detail', params: {id: item.id}}" class="block tag-color">查看所有{{item.reply_num}}条评论</router-link>
         </div>
       </router-link>
     </div>
     <!-- /评论 -->
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import parseContent from '@/tools/parse-content'
import { VideoView, ImageGroup, TextView, Gender } from '@/components'
import FeedContent from './feed-content'

import config from '@/config'
import api from '@/api'

export default {
  components: {
    VideoView,
    ImageGroup,
    TextView,
    Gender,
    FeedContent
  },
  props: {
    value: {}
  },
  data: () => ({
    list: [],
    follow: '关注',
    xing: [1, 2, 3, 4, 5],
    query: {
      type: undefined
    }
  }),
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      isLoggedin: 'isLoggedin'
    }),
    videoHeight () {
      return (this.$el.clientWidth - 30) * 9 / 16 + 2
    }
  },
  methods: {
    parseContent: parseContent, // 内容转换，如标签，连接等

    // 登录判断
    checkAuth () {
      if (!this.isLoggedin) {
        this.$router.push({name: 'user_login'})
        return false
      } else {
        return true
      }
    },

    onItemClick (e, item) {
      let tag = e.target.getAttribute('tag')
      if (tag) {
        this.$router.push({name: 'feed_topic_redirect', params: {key: tag}})
      } else {
        this.$router.push({name: 'feed_detail', params: {id: item.id}})
      }
    },
    userLink (item) {
      this.$router.push({name: 'u_home', params: {u_id: item.author.id}})
    },
    campLink (item) {
      this.$router.push({name: 'camp_detail', params: {id: item.camp_detail.uuid}, query: {type: item.camp_detail.type}})
    },
    locationLink (item) {
      window.location.href = 'http://map.wanfangche.com/?lat=' + item.lat + '&lng=' + item.lon
    },
    // 点赞
    thumbUp (item) {
      if (this.checkAuth()) {
        item.is_follow = item.is_follow ? 0 : 1
        this.axios.post(api.feed.like, {
          id: item.id
        })
        .then(response => {
          if (response.status === 200 && response.data.code === 1) {
            response.data.data === '点赞已取消' ? item.credit_num -= 1 : item.credit_num += 1
          }
        })
      }
    },

    // 关注用户
    doFollow (item) {
      if (this.checkAuth()) {
        // item.author.is_follow = (item.author.is_follow !== 1) ? 1 : 0
        if (item.author.is_follow === 0) {
          item.author.is_follow = 2
          for (let i = 0; i < this.list.length; i++) {
            if (item.author.id === this.list[i].author.id) {
              this.list[i].author.is_follow = 2
            }
          }
        } else {
          item.author.is_follow = 0
          for (let i = 0; i < this.list.length; i++) {
            if (item.author.id === this.list[i].author.id) {
              this.list[i].author.is_follow = 0
            }
          }
        }
        this.axios.post(api.feed.follow, {
          uid: this.currentUser.user_id,
          id: item.author.id,
          accesstoken: ''
        })
        .then(response => {
        })
      }
    },

    doDelete (item, index) {
      let r = confirm('确定删除？')
      if (r) {
        this.list.splice(index, 1)
        if (item.author && parseInt(item.author.id) === parseInt(this.currentUser.user_id)) {
          this.axios.post(api.feed.delete, {id: item.id})
        }
      }
    },

    // 微信相册
    albumView (src, list) {
      if (window.WeixinJSBridge) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': list.map(src => {
            return src + config.ossimage.xlarge
          }),
          'current': src + config.ossimage.xlarge
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.query = this.$route.query
      this.list = this.value
    })
  },
  watch: {
    value (val) {
      this.list = val
      this.list.map((val) => {
        if (val.img.length > 3) {
          val.imgs = val.img.slice(0, 3)
        }
      })
    }
  }
}
</script>
