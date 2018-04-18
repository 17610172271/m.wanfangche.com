<template>
  <div class="qa-search">
    <form class="search-ipt" action="">
      <input type="search" v-model="searchTxt" placeholder="房车类型" @keyup="doSearch($event)">
      <input type="text" style="display:none;">
      <router-link :to="{name: 'faq'}" class="search-cancel">取消</router-link>
      <i class="fd-search"></i>
    </form>

    <div class="app-container app-container-top app-container-bottom"
    ref="scrollContainer"
    @scroll="onScroll($event)"
    >
      <ul class="search-history text-md" v-show="!list">
        <li v-for="item in history" @click="search(item)"><i class="fd-clock"></i>{{item}}</li>
        <li @click="clearHistory"><i class="fd-trash text-lg"></i>清空历史</li>
      </ul>
      <div class="app-wrapper inner bg-white">

        <div class="faq-list m-t" v-if="list">

          <div class="middle text-muted text-center"  v-if="!isLoading && list.length < 1">
            <p>没有数据</p>
          </div>

          <div class="faq-item" v-for="item in list">
            <router-link :to="{name: 'faq', query: {id: item.id, action: 'detail'}}" class="block text-normal clear">
              <div class="block">
                <div class="pull-left text-info text-xxlg m-r">
                  <span class="fd-question"></span>
                </div>
                <div class="media-body">
                  <div class="faq-title text-bold">{{item.title | substr(50)}}</div>
                </div>
              </div>
               <div class="block text-lg m-t text-lt" v-if="item.answer && item.answer.content">
                <div class="pull-left text-danger text-xxlg m-r">
                  <span class="fd-answer"></span>
                </div>
                <div class="media-body">
                  <div class="text-content">{{item.answer.content | substr(140) | removeHtmlTab}}</div>
                </div>
              </div>
            </router-link>
            <div class="m-t-lg text-muted" v-if="item.answer && item.answer.content">
              <div class="pull-right" v-if="item.reply_num">
                {{item.reply_num}} 回答
              </div>
              <div class="pull-left avatar-circle avatar-xs">
                <img :src="item.answer.avatar | avatarResize">
              </div>
              <span class="m-l-sm">{{item.answer.nickname || '车友'}} 回答了问题</span>
            </div>
            <div class="m-t-lg text-muted" v-if="!item.answer">
              <div class="pull-right">
                等待回答
              </div>
              <div class="pull-left avatar-circle avatar-xs" :class="{'bg-color': !item.author.avatar}">
                <img :src="item.author.avatar | avatarResize">
              </div>
              <span class="m-l-sm">{{item.author.nickname || '车友'}} 提了一个问题</span>
            </div>
          </div>
        </div>

        <div class="load-more text-center text-muted block clear" v-if="!isLoading && isScrolling">
          <p v-if="!noMoreData">{{infiniteLoading ? '加载中...' : '加载更多...'}}</p>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  import {avatarResize, removeHtmlTab, substr} from '@/filters'
  import store from '@/tools/localStorage/todo_list'
  export default {
    filters: {
      avatarResize,
      removeHtmlTab,
      substr
    },
    data: () => ({
      searchTxt: '',
      list: null,
      isLoading: false,
      isError: false,
      page: 1,
      noMoreData: false,
      isScrolling: false,
      infiniteLoading: false,
      history: store.fetch('qa-history')
    }),
    methods: {
      doSearch (e) {
        if (e.keyCode === 13) {
          this.history.push(this.searchTxt)
          store.save('qa-history', this.history)
          this.search()
        }
      },
      search (item) {
        if (item) {
          this.searchTxt = item
        }
        this.page = 1
        this.axios.get(api.faq.search, {
          params: {
            page: this.page,
            keyword: this.$route.query.search || this.searchTxt
          }
        })
        .then(response => {
          if (response.data.code === 1) {
            this.$router.replace({name: 'faq_search', query: {search: this.searchTxt}})
            this.list = response.data.data.list || []
          }
        })
      },
      clearHistory () {
        store.clear('qa-history')
        this.history = []
      },
      infinite () {
        this.infiniteLoading = true
        this.page += 1
        let params = {
          page: this.page > 1 ? this.page : 1,
          keyword: this.searchTxt
        }
        this.axios.get(api.faq.search, {params: params})
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
        // console.log(this.isLoading, this.noMoreData, this.infiniteLoading)
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
      }
    },
    created () {
      this.page = 1
      if (this.$route.query.search) {
        this.searchTxt = this.$route.query.search
      }
      this.axios.get(api.faq.search, {
        params: {
          page: this.page,
          keyword: this.$route.query.search
        }
      })
      .then(response => {
        if (response.data.code === 1) {
          this.list = response.data.data.list || []
        }
      })
    }
  }
</script>
<style>
  
</style>
