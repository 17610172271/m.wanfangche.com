<template>
  <div class="text-center clear m-t" v-show="number > 0">
    <router-link :to="{name: 'user_message'}" class="btn btn-sm btn-border text-normal btn-rounded">{{number}}条新消息</router-link>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data: () => ({
    number: 0
  }),
  methods: {
    initData () {
      this.axios.get(api.user.notifyNum)
      .then(response => {
        if (response.data.data) {
          console.log()
          this.number = response.data.data.comment_num + response.data.data.credit_num + response.data.data.notify_num
        }
      })
    }
  },
  created () {
    this.initData()
  }
}
</script>
