<template>
  <div>

    <!-- <nav-header>问答</nav-header> -->

    <div class="nav-top">
      <ul class="nav-inline nav-auto nav-inline-fixed">
        <li class="">
          <router-link :to="{name: 'faq'}" class="text-bold">最新<span class="feed-line"></span></router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'faq', query: {type: 'waiting_post'}}" class="text-bold">待回答<span class="feed-line"></span></router-link>
        </li>
        <li class="nav-search">
          <router-link :to="{name: 'faq_search'}"><i class="fd-search text-xxlg text-lt"></i></router-link>
        </li>
      </ul>
    </div>

    <div class="app-container app-container-top app-container-bottom app-container1"
    ref="scrollContainer"
    @scroll="onScroll($event)"
    >
      <div class="app-wrapper inner">

      <div class="middle text-muted text-center"  v-if="!list">
        <loading v-if="isLoading"></loading>
        <div v-if="isError && !isLoading">
          <p class="text-xxlg"><i class="fa  fa-frown-o"></i></p>
          <p>服务器连接失败</p>
        </div>
      </div>

      <!-- <ul class="nav-inline bg-white b-b  m-b-sm">
        <li class="">
          <router-link :to="{name: 'faq'}">
            <span class=" text-xlg"><i class="fa fa-question-circle text-info"></i></span> 
            <span class="text-normal">最新</span>
          </router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'faq', query: {type: 'waiting_post'}}">
            <span class=" text-xlg"><i class="fa fa-comment text-default"></i></span>
            <span class="text-normal">待回答</span>
          </router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'faq_add'}">
            <span class=" text-xlg"><i class="fa fa-edit text-success"></i></span>
            <span class="text-normal">提问</span>
          </router-link>
        </li>
      </ul> -->

      <div class="faq-list m-t" v-if="list">

        <div class="middle text-muted text-center"  v-if="!isLoading && list.length < 1">
          <p>没有数据</p>
        </div>

        <div class="faq-item" v-for="item in list">
          <router-link :to="{name: 'faq', query: {id: item.id, action: 'detail'}}" class="block text-normal clear">
            <div class="block">
              <div class="pull-left text-danger text-xxlg m-r">
                <span class="fd-question"></span>
              </div>
              <div class="media-body">
                <div class="faq-title text-bold">{{item.title | substr(50)}}</div>
              </div>
            </div>
             <div class="block text-lg m-t text-lt" v-if="item.answer && item.answer.content">
              <div class="pull-left text-info text-xxlg m-r">
                <span class="fd-answer"></span>
              </div>
              <div class="media-body">
                <div class="text-content text-md qa-content-text">{{item.answer.content | substr(140) | removeHtmlTab}}</div>
              </div>
            </div>
          </router-link>
          <div class="m-t-16 tag-color clear" v-if="item.reply_num">
            <div class="pull-right">
              {{item.reply_num}} 回答
            </div>
            <div class="pull-left avatar-circle avatar-xs" v-if="item.answer">
              <img :src="item.answer.avatar | avatarResize">
            </div>
            <span class="m-l-sm" v-if="item.answer"><span class="text-lt text-bold">{{item.answer.nickname || '车友'}}</span> 回答了问题</span>
          </div>

          <div class="m-t-lg tag-color" v-if="!item.reply_num">
            <div class="pull-right">
              等待回答
            </div>
            <div class="pull-left avatar-circle avatar-xs" :class="{'bg-color': !item.author.avatar}">
              <img :src="item.author.avatar | avatarResize">
            </div>
            <span class="m-l-sm"><span class="text-lt text-bold">{{item.author.nickname || '车友'}}</span> 提了一个问题</span>
          </div>
        </div>
      </div>

      <div class="load-more text-center text-muted block clear" v-if="!isLoading && isScrolling">
        <p v-if="!noMoreData">{{infiniteLoading ? '加载中...' : '加载更多...'}}</p>
      </div>

    </div>
  </div>
  <transition name="fadet">
    <div class="feed-add-container" v-show="addShow">
      <router-link class="feed-add-btn" :to="{name: 'faq_add'}">
        <i class="fd-ask text-lg"></i>
        <span class="text-md text-bold">提问题</span> 
      </router-link>
    </div>
  </transition>
    <tabbar active="feed"></tabbar>

  </div>
</template>
<script>
import api from '@/api'
import { Loading } from '@/components'
import Tabbar from '../Tabbar'
import NavHeader from '../Common/Navheader'

import {avatarResize, removeHtmlTab, substr} from '@/filters'

export default {
  components: {
    NavHeader,
    Tabbar,
    Loading
  },
  filters: {
    avatarResize,
    removeHtmlTab,
    substr
  },
  data: () => ({
    isLoading: true,
    isError: false,
    page: 1,
    list: null,
    adv: null,
    query: null,
    infiniteLoading: false,
    noMoreData: false,
    isScrolling: false,
    scrollVal: 0,
    addShow: true,
    time: null
  }),
  methods: {
    initData () {
      this.getList()
    },

    getList () {
      this.isLoading = true
      this.list = null
      let params = {
        type: this.$route.query.type || undefined,
        page: this.page > 1 ? this.page : 1
      }
      this.axios.get(api.faq.list, {params: params})
      .then(response => {
        this.isLoading = false
        if (response.status === 200 && response.data) {
          this.list = response.data.data.list
        }
      })
      .catch(error => {
        this.isLoading = false
        this.isError = true
        return Promise.reject(error)
      })
    },

    onRouteChange () {
      if (!this.$route.query.action || this.$route.query.action === 'list') {
        this.page = 1
        this.noMoreData = false
        this.getList()
      }
    },

    infinite () {
      this.infiniteLoading = true
      this.page += 1
      let params = {
        type: this.$route.query.type || undefined,
        page: this.page > 1 ? this.page : 1
      }
      this.axios.get(api.faq.list, {params: params})
      .then(response => {
        this.infiniteLoading = false
        if (response.status === 200 && response.data.data.list && response.data.data.list.length > 0) {
          for (let item of response.data.data.list) {
            this.list.push(item)
          }
        } else {
          this.noMoreData = true
        }
      })
      .catch(error => {
        this.infiniteLoading = false
        return Promise.reject(error)
      })
    },
    onScroll (e) {
      if (this.isLoading || this.noMoreData || this.infiniteLoading) {
        return
      }
      let outerHeight = this.$refs.scrollContainer.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$refs.scrollContainer.scrollTop
      let bottom = innerHeight - outerHeight - scrollTop
      if (innerHeight > outerHeight && bottom <= 0) {
        this.isScrolling = true
        this.infinite()
      } else {
        this.isScrolling = false
      }
    },
    doScroll () {
      clearTimeout(this.time)
      let scrollValue = document.getElementsByClassName('app-container1')[0].scrollTop
      if (scrollValue > 0) {
        if (this.scrollVal < scrollValue) {
          this.addShow = false
        } else if (this.scrollVal > scrollValue) {
          this.addShow = true
        }
      } else {
        this.addShow = true
      }
      this.scrollVal = scrollValue
    }
  },

  mounted () {
    this.initData()
    if (document.getElementsByClassName('app-container1').length > 0) {
      document.getElementsByClassName('app-container1')[0].addEventListener('scroll', this.doScroll)
    }
  },
  beforeDestroy () {
    if (document.getElementsByClassName('app-container1').length > 0) {
      document.getElementsByClassName('app-container1')[0].removeEventListener('scroll', this.doScroll)
    }
  },
  watch: {
    '$route.query.type': 'onRouteChange'
  }
}
</script>
<style>
.faq-item {
  background: #fff;
  padding: 16px 15px 10px;
  margin-bottom: 10px;
  font-size: 14px;
  display: block;
}
.faq-heading {
  margin-bottom: 10px;
}
.faq-title {
  font-size: 16px;
  /*font-weight: 600;*/
}
.faq-content {
  padding:  10px 0;
}
.qa-content-text {
  line-height: 28px;
}
.faq-item-footer {
  margin-top: 5px;
}
</style>
