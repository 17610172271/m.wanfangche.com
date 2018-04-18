<template>
  <div>
  <nav-header></nav-header>
  <div class="middle">
    <div class="text-center">{{error | toErrorString}}</div>
  </div>
  </div>
</template>
<script>
import api from '@/api'
import NavHeader from '../Common/Navheader'

const toErrorString = id => {
  let lang = {
    0: '',
    1: '未找到数据',
    2: '网络连接错误'
  }
  return lang[id]
}

export default {
  components: {
    NavHeader
  },
  data: () => ({
    error: 0
  }),
  filters: {
    toErrorString
  },
  methods: {
    initData () {
      let key = this.$route.params.key
      this.axios.get(api.topic.detail, {params: {
        title: key
      }})
      .then(response => {
        if (response.data && response.data.data.id) {
          this.$router.replace({name: 'feed_topic',
            params: {
              t_id: response.data.data.id
            }
          })
        } else {
          this.error = 1
        }
      })
      .catch(error => {
        this.error = 2
        return Promise.reject(error)
      })
    }
  },
  created () {
    this.initData()
  }
  // for keep-alive
  // activated () {
  //   this.initData()
  // }
}
</script>
