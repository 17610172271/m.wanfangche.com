<template>
  <div>
    <!-- <top-header>Scroll Refresh</top-header> -->
      <scroll-refresh :on-refresh="onRefresh" :on-infinite="onInfinite">
      <h3>scroll refresh</h3>
        <ul>
          <li v-for="(item,index) in list" >{{item.title}} : {{item.id}}</li>
        </ul>
      </scroll-refresh>

    <!-- <div class="app-body app-container">
      <div class="wrapper">
        <p>Scroll refresh is a simple and useful component for multiple data list of web app.</p>
        <div  v-for="item in list" class="padder-v">
          {{item.title}} : {{item.id}}
        </div>
      </div>
      <div class="wrapper">
        <a @click="getMoreData" class="btn btn-default btn-block" v-show="!isLoading">加载更多</a>
      </div>
      <div class="wrapper text-center"  v-show="isLoading">
      </div>
      <div class="wrapper">
        <div class="text-center">
          <div class="loading">
            <img src="/static/img/logo-loading.png">
          </div>
          <div class="text-muted">
            加载中...
          </div>
        </div>
      </div>

    </div> -->
  </div>
</template>
<script>
import TopHeader from './top-header'
import ScrollRefresh from '@/components/scroll-refresh'

const exampleData = page => {
  let d = []
  let p = parseInt(page) || 1
  let size = 100
  let i = 0
  while (i < size) {
    d.push({id: i + 1 + (p - 1) * size, title: 'Hello Jianbo'})
    i++
  }
  return d
}

export default {
  components: {
    TopHeader,
    ScrollRefresh
  },
  data: () => ({
    list: [],
    page: 1,
    size: 10,
    isLoading: true
  }),
  methods: {
    getList () {
      setTimeout(() => {
        // this.list.push.apply(this.list, exampleData(this.page))
        this.list = exampleData(this.page)
      }, 2000)
    },
    getMoreData () {
      this.getList()
    },
    onRefresh (done) {
      console.log('on refresh')
      setTimeout(() => {
        this.page = 1
        this.list = exampleData(this.page)
        done()
      }, 2000)
    },
    onInfinite (done) {
      console.log('on infinite')
      this.page++
      setTimeout(() => {
        this.list.push.apply(this.list, exampleData(this.page))
        done()
      }, 2000)
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style>

</style>
