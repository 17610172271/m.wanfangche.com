<template>
  <div class="comments-container">
    <div class="message-header">
      <navheader>
        <span @click="selectShow=!selectShow">{{$route.query.type==1 ? '收到的评论' : '发出的评论'}}</span>
        <span class="icon-arrow-down text-xs text-blue" v-show="!selectShow" @click="selectShow=!selectShow"></span>
        <span class="icon-arrow-up text-xs text-blue" v-show="selectShow" @click="selectShow=!selectShow"></span>
      </navheader>
      <transition name="slide">
        <ul class="comments-selection" v-show="selectShow">
          <li class="text-md" :class="{'bg-yellow': $route.query.type==1, 'text-bold': $route.query.type==1}"  @click="selectShow=false">
            <a @click="typeSwitch(1)" class="text-normal">收到的评论</a>
          </li>
          <li class="text-md" :class="{'bg-yellow': $route.query.type==2, 'text-bold': $route.query.type==2}" @click="selectShow=false">
            <a @click="typeSwitch(2)" class=" text-normal">发出的评论</a>
          </li>
        </ul>
      </transition>
    </div>
    <scroll v-model="list" ref="scrollComponent">
      <div class="message-content">
        <div class="no-comment-list text-md text-muted" v-if="list.length == 0">暂时没有评论</div>
        <div v-if="list.length > 0">
          <div class="message-content-item" v-for="item in list">
            <!-- 评论圈子 -->
            <div class="message-send-type1" v-if="item.type==1">
              <div class="author-infos clear" @click="userLink(item)">
                <div class="author-infos-avatar pull-left" v-if="item.author"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
                <div class="author-infos-info pull-left">
                  <div class="author-infos-name text-md text-bold over-omit" v-if="item.author">
                    {{item.author.nickname}}
                    <gender v-model="item.author.sex"></gender>
                  </div>
                  <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
                </div>
                <!-- <button class="author-infos-reply btn pull-right text-lt text-md">回复</button> -->
              </div>
              <div class="message-comment-content text-lg" @click="goLink(item, 1)">{{item.content}}</div>
              <div class="message-comment-info" @click="goLink(item, 1)">
                <div class="message-comment-img pull-left">
                  <img :src="item.post.imgpath | ossResize('small')" width="100%" alt="">
                </div>
                <div class="message-item-info">
                  <div class="text-md m-b-6 text-bold" v-if="item.post.author">{{item.post.author.nickname}}</div>
                  <div class="tag-color text-sm message-item-content">{{item.post.content}}</div>
                </div>
              </div>
              <div class="message-item-deleted text-muted m-t-8" v-if="item.is_del==1">此圈子已被删除</div>
            </div>

            <!-- 回复圈子 -->
            <div v-if="item.type==2">
              <div class="author-infos clear message-send-type1" @click="userLink(item)">
                <div class="author-infos-avatar pull-left" v-if="item.author"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
                <div class="author-infos-info pull-left">
                  <div class="author-infos-name text-md text-bold over-omit" v-if="item.author">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                  <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
                </div>
                <!-- <button class="author-infos-reply btn pull-right text-lt text-md">回复</button> -->
              </div>
              <div class="message-comment-content text-lg message-send-type1" @click="goLink(item, 1)">{{item.content}}</div>
              <div class="message-comment-info1" @click="goLink(item, 1)">
                <div class="message-comment-content1 text-lg m-b-8"><span class="text-muted">{{item.comment.author.nickname}}</span>: {{item.comment.content}}</div>
                <div class="wrapper-md bg-white" style="height: 84px;">
                  <div class="message-comment-img pull-left">
                    <img :src="item.post.imgpath | ossResize('small')" width="100%" alt="">
                  </div>
                  <div class="message-item-info">
                    <div class="text-md m-b-6 text-bold" v-if="item.post.author">{{item.post.author.nickname}}</div>
                    <div class="tag-color text-sm message-item-content">{{item.post.content}}</div>
                  </div>
                </div>
              </div>
              <div class="message-item-deleted text-muted m-t-8" v-if="item.is_del==1">此评论已被删除</div>
            </div>
            
            <!-- 回复回答 -->
            <div class="message-send-type1" v-if="item.type==3">
              <div class="author-infos clear"  @click="userLink(item)">
                <div class="author-infos-avatar pull-left" v-if="item.author"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
                <div class="author-infos-info pull-left">
                  <div class="author-infos-name text-md text-bold over-omit" v-if="item.author">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                  <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
                </div>
                <!-- <button class="author-infos-reply btn pull-right text-lt text-md">回复</button> -->
              </div>
              <div class="message-comment-content text-lg" @click="goLink(item, 3)">{{item.content}}</div>
              <div class="message-comment-container" @click="goLink(item, 3)">
                <div class="message-qa text-md m-b">
                  <div class="text-info text-xxlg pos-ab0">
                    <i class="fd-answer"></i>
                  </div>
                  {{item.comment.content}}
                </div>
                <div class="message-qa text-md">
                  <div class="text-danger text-xxlg pos-ab0">
                    <i class="fd-question"></i>
                  </div>
                  {{item.post.content}}
                </div>
              </div>
              <div class="message-item-deleted text-muted m-t-8" v-if="item.is_del==1">此回答已被删除</div>
            </div>

            <!-- 营地评论 -->
            <div class="message-send-type1" v-if="item.type==4">
              <div class="author-infos clear" @click="userLink(item)">
                <div class="author-infos-avatar pull-left" v-if="item.author"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
                <div class="author-infos-info pull-left">
                  <div class="author-infos-name text-md text-bold over-omit" v-if="item.author">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                  <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
                </div>
                <!-- <button class="author-infos-reply btn pull-right text-lt text-md">回复</button> -->
              </div>

              <div class="message-comment-content text-lg" @click="goLink(item, 2)">{{item.content}}</div>

              <div class="message-comment-container" @click="goLink(item, 2)">
                <div class="pull-left share-info-img m-r feed-item-camp"><img :src="item.post.imgpath | ossResize('small')" width="100%"></div>
                <div class="camp-list-item">
                 <div class="text-md text-bolder share-info-name over-omit">{{item.post.name}}</div>
                   <div class="text-muted share-info-others m-b-3" style="overflow:hidden;">
                    <p class="camp-xing">
                      <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.post.score}"></i>
                    </p>
                    <span v-if="item.post.price === -2">不详</span>
                    <span v-else-if="item.post.price === -1">免费</span>
                    <span v-else>{{item.post.price}}<span v-if="item.post.price !== -1 && item.post.price !== -2"><span v-if="item.post.type === 3">元/人</span><span v-else>元/起</span></span></span>
                  </div>
                  <div style="overflow:hidden;">
                    <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.post.type==1, 'color-park2': item.post.type==0, 'color-scenic2': item.post.type==2, 'color-food2': item.post.type==3, 'color-fix2': item.post.type==4, 'color-refuel2': item.post.type==5}"><span :class="{'icon-camp-camp': item.post.type==1, 'icon-camp-park': item.post.type==0, 'icon-camp-scenic': item.post.type==2, 'icon-camp-food': item.post.type==3, 'icon-camp-service': item.post.type==4, 'icon-camp-station': item.post.type==5}"></span></div>
                    <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': item.post.type==1, 'color-park1': item.post.type==0, 'color-scenic1': item.post.type==2, 'color-food1': item.post.type==3, 'color-fix1': item.post.type==4, 'color-refuel1': item.post.type==5}">
                      {{item.post.type | camptype}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="message-item-deleted text-muted m-t-8" v-if="item.is_del==1">此回答已被删除</div>
            </div>
              
            <!-- 营地回复 -->
            <div class="" v-if="item.type==5">
              <div class="author-infos clear message-send-type1" @click="userLink(item)">
                <div class="author-infos-avatar pull-left" v-if="item.author"><img :src="item.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
                <div class="author-infos-info pull-left">
                  <div class="author-infos-name text-md text-bold over-omit" v-if="item.author">{{item.author.nickname}} <gender v-model="item.author.sex"></gender></div>
                  <div class="author-infos-time m-t-3 text-sm text-muted">{{item.public_date}}</div>
                </div>
                <!-- <button class="author-infos-reply btn pull-right text-lt text-md">回复</button> -->
              </div>

              <div class="message-comment-content text-lg message-send-type1" @click="goLink(item, 2)">{{item.content}}</div>

              <div class="message-comment-info1" @click="goLink(item, 2)">
                <div v-if="item.comment.author" class="message-comment-content1 text-lg m-b-8"><span class="text-muted">{{item.comment.author.nickname}}</span>: {{item.comment.content}}</div>
                <div class="wrapper-md bg-white" style="height: 84px;">
                  <div class="pull-left share-info-img m-r feed-item-camp"><img :src="item.post.imgpath | ossResize('small')" width="100%"></div>
                  <div class="camp-list-item">
                   <div class="text-md text-bolder share-info-name over-omit">{{item.post.name}}</div>
                     <div class="text-muted share-info-others m-b-3" style="overflow:hidden;">
                      <p class="camp-xing">
                        <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.post.score}"></i>
                      </p>
                      <span v-if="item.post.price === -2">不详</span>
                      <span v-else-if="item.post.price === -1">免费</span>
                      <span v-else>{{item.post.price}}<span v-if="item.post.price !== -1 && item.post.price !== -2"><span v-if="item.post.type === 3">元/人</span><span v-else>元/起</span></span></span>
                    </div>
                    <div style="overflow:hidden;">
                      <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.post.type==1, 'color-park2': item.post.type==0, 'color-scenic2': item.post.type==2, 'color-food2': item.post.type==3, 'color-fix2': item.post.type==4, 'color-refuel2': item.post.type==5}"><span :class="{'icon-camp-camp': item.post.type==1, 'icon-camp-park': item.post.type==0, 'icon-camp-scenic': item.post.type==2, 'icon-camp-food': item.post.type==3, 'icon-camp-service': item.post.type==4, 'icon-camp-station': item.post.type==5}"></span></div>
                      <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': item.post.type==1, 'color-park1': item.post.type==0, 'color-scenic1': item.post.type==2, 'color-food1': item.post.type==3, 'color-fix1': item.post.type==4, 'color-refuel1': item.post.type==5}">
                        {{item.post.type | camptype}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="message-item-deleted text-muted m-t-8" v-if="item.is_del==1">此营地已被删除</div>
            </div>

          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import Gender from '@/components/gender'
import Scroll from '@/template/scroll'
import api from '@/api'

export default {
  components: {
    Navheader,
    Scroll,
    Gender
  },
  data: () => ({
    list: [],
    selectShow: false,
    page: 1,
    size: 20,
    xing: [1, 2, 3, 4, 5]
  }),
  methods: {
    initData () {
      if (this.$route.query.type === 2) {
        this.getData(1)
      } else {
        this.getData(3)
      }
    },
    getData (type) {
      if (this.$refs.scrollComponent) {
        this.$refs.scrollComponent.init({
          api: api.user.notifyList,
          params: {
            type: type || 1,
            page: this.page,
            size: this.size
          },
          response: 'data.data.list'
        })
      }
    },
    goLink (item, type) {
      if (type === 1) {
        this.$router.push({name: 'feed_detail', params: {id: item.post.id}})
      } else if (type === 2) {
        this.$router.push({name: 'camp_detail', params: {id: item.post.uuid}, query: {type: item.post.type}})
      } else if (type === 3) {
        this.$router.push({name: 'faq', query: {id: item.post.id, action: 'detail'}})
      }
    },
    userLink (item) {
      this.$router.push({name: 'u_home', params: {u_id: item.author.id}})
    },
    typeSwitch (type) {
      this.$router.replace({name: 'messages_comments', query: {type: type}})
    },
    onRouterChange () {
      let container = document.getElementsByClassName('app-container')[0]
      if (container) {
        container.scrollTo(0, 0)
      }
      this.initData()
    }
  },
  mounted () {
    this.initData()
  },
  created () {
    this.initData()
  },
  watch: {
    '$route': 'onRouterChange'
  }
}
</script>
