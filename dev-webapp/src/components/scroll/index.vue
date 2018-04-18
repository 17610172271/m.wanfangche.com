<template>
  <div class="app-container"
  ref="scrollContainer"
  @scroll="onScroll($event)"
  >
      <div class="app-wrapper inner">
        <!-- <div class="text-center refresh-container">加载中</div> -->
        <slot></slot>
        <div class="scroll-more-container">
          <div class="btn btn-block text-center text-muted">
            <span v-if="!status.infiniting && !status.isInfinite">没有更多了</span>
            <span v-if="!status.infiniting && status.isInfinite">加载更多</span>
            <span v-if="status.infiniting">加载中...</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'

export default {
  components: {
    Navheader
  },
  data: () => ({
    options: {
      type: Object,
      default: () => ({
        api: null,
        params: {}
      })
    },
    status: {
      loading: false,
      error: null,
      infiniting: false,
      isInfinite: true
    },
    query: {
      page: 1
    },
    list: []
  }),

  methods: {
    init (options) {
      this.options = options
      this.getList().then(response => {
        this.$emit('on-load', response)
      })
    },

    // 获取列表
    getList () {
      // 上层定义返回数据
      let {api, params, response} = this.options
      let responseObject = response ? response.split('.') : []

      if (!api) return

      return this.axios(api, {params: {
        ...params,
        page: this.query.page && this.query.page > 1 ? this.query.page : 1
      }})
      .then(response => {
        if (response.data) {
          // 结果指针
          let rel = response
          for (let i in responseObject) {
            rel = rel[responseObject[i]] ? rel[responseObject[i]] : []
          }
          // 组合结果
          if (rel && rel.length > 0) {
            for (let i = 0; i < rel.length; i++) {
              this.list.push(rel[i])
            }
          }
          this.$emit('input', this.list)
        }
        return Promise.resolve(response)
      })
      .catch(error => {
        this.error = '服务器错误'
        return Promise.reject(error)
      })
    },

    // 刷新数据
    refresh () {
      if (!this.status.loading) {
        this.status.loading = true
        Object.assign(this.$data, this.$options.data())
        this.getList().then(response => {
          this.status.loading = false
          this.$emit('on-refresh', response)
        }).catch(error => {
          this.status.loading = false
          return Promise.reject(error)
        })
      }
    },

    // 加载更多
    infinite () {
      if (!this.status.infiniting && this.status.isInfinite) {
        this.status.infiniting = true
        this.query.page ++
        this.getList().then(response => {
          if (!response.data.data) {
            this.query.page --
            this.status.isInfinite = false
          }
          this.status.infiniting = false
        }).catch(error => {
          this.query.page --
          this.status.infiniting = false
          return Promise.reject(error)
        })
      }
    },

    onScroll (e) {
      if (this.status.loading || !this.status.isInfinite || this.status.infiniting) {
        return
      }
      let outerHeight = this.$refs.scrollContainer.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$refs.scrollContainer.scrollTop
      let bottom = innerHeight - outerHeight - scrollTop
      if (innerHeight > outerHeight && bottom <= 0) {
        this.infinite()
      }
    },

    onInfinite () {

    }
  }
}
</script>