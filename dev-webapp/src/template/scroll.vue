<template>
  <div class="app-container"
  ref="scrollContainer"
  @scroll="onScroll($event)"
  >
      <div class="app-wrapper inner bg-light">
        <slot></slot>
        <div class="scroll-more-container">
          <div class="btn btn-block text-center text-muted">
            <span v-if="!status.infiniting && !status.isInfinite">没有更多了</span>
            <span v-if="!status.infiniting && status.isInfinite && !status.loading"><!-- 加载更多 --></span>
            <span v-if="status.infiniting">加载中...</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
const status = {
  top: 0,
  loading: false,
  error: null,
  infiniting: false,
  isInfinite: true
}
export default {
  data: () => ({
    options: {
      type: Object,
      default: () => ({
        api: null,
        params: {}
      })
    },
    status: status,
    page: 1,
    list: [],
    newList: []
  }),

  methods: {
    init (options) {
      this.resetData()
      this.options = options
      return this.getList().then(response => {
        this.$emit('on-load', response)
        return Promise.resolve(this.list)
      })
      .catch(error => {
        return Promise.reject(error)
      })
    },

    resetData () {
      this.status = {
        top: 0,
        loading: false,
        error: null,
        infiniting: false,
        isInfinite: true
      }
      this.page = 1
      this.list = []
    },

    // 获取列表
    getList () {
      // 上层定义返回数据
      let {api, params, response} = this.options
      let responseObject = response ? response.split('.') : []

      if (!api) return

      return this.axios(api, {params: {
        ...params,
        page: this.page && this.page > 1 ? this.page : 1
      }})
      .then(response => {
        if (response.data) {
          // 结果指针
          this.newList = response
          for (let i in responseObject) {
            this.newList = this.newList[responseObject[i]] ? this.newList[responseObject[i]] : []
          }
          // 组合结果
          if (this.newList && this.newList.length > 0) {
            for (let i = 0; i < this.newList.length; i++) {
              this.list.push(this.newList[i])
            }
          }
          this.$emit('change', this.list)
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
        this.page ++
        this.getList()
        .then(response => {
          if (!this.newList || this.newList.length < 1) {
            this.page --
            this.status.isInfinite = false
          }
          this.status.infiniting = false
        }).catch(error => {
          this.page --
          this.status.infiniting = false
          return Promise.reject(error)
        })
      }
    },

    onScroll (e) {
      this.status.top = this.$refs.scrollContainer.scrollTop
      if (this.status.loading || !this.status.isInfinite || this.status.infiniting) {
        return
      }
      let outerHeight = this.$refs.scrollContainer.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$refs.scrollContainer.scrollTop
      let bottom = innerHeight - outerHeight - scrollTop
      if (innerHeight > outerHeight && bottom <= 10) {
        this.infinite()
      }
    },

    onInfinite () {

    }
  },

  // Called when a kept-alive component is activated.
  // This hook is not called during server-side rendering.
  activated () {
    this.$refs.scrollContainer.scrollTop = this.status.top
  }
}
</script>
